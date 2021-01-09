import { client, fauna } from "../../../utils/db/Fauna";
import type { NextApiRequest, NextApiResponse } from 'next';
import { withInitMiddleWare } from "../../../utils/withInitMiddleware";
import { dbResponse } from "../../../next-env";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await withInitMiddleWare(req, res);

    const { username, name, picture } = req.body;

    const {
        Get,
        Match,
        Index,
        Create,
        Collection,
        Replace,
        Exists,
        Ref,
        Let,
        If,
        Var
    } = fauna.query;

    // Try to get the user, if the user is not found, create it
    const dbUser: dbResponse = await client.query(
        Let(
            {
                match: Match(
                    Index("users_username"),
                    username
                )
            },
            If(
                Exists(
                    Var("match")
                ),
                Get(
                    Match(
                        Index("users_username"),
                        username
                    )
                ),
                Create(
                    Collection("users"),
                    {
                        data: {
                            username,
                            name,
                            picture
                        }
                    }
                )
            )
        )
    );

    // If there was a user, but it was created via email + hash, add the information from provider
    if (dbUser && !dbUser.data.hasOwnProperty("picture")) {
        const updatedUser: dbResponse = await client.query(
            Replace(
                dbUser.ref,
                {
                    data: {
                        username: username,
                        hash: dbUser.data.hash,
                        name,
                        picture
                    }
                }
            )
        )

        return res.send(JSON.stringify({ connected: true, user: updatedUser.data.username }));
    }


    return res.send(JSON.stringify({ connected: true, user: dbUser.data.username }));
}