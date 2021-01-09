import { client, fauna } from "../../../utils/db/Fauna";
import type { NextApiRequest, NextApiResponse } from 'next';
import { withInitMiddleWare } from "../../../utils/withInitMiddleware";
import { dbResponse } from "../../../next-env";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await withInitMiddleWare(req, res);

    const { user, name, picture } = req.body;

    const {
        Get,
        Match,
        Index,
        Create,
        Collection,
        Replace
    } = fauna.query;

    // Try to get the user
    const dbUser: dbResponse = await client.query(
        Get(
            Match(
                Index("users_username"),
                user
            )
        )
    )

    // If no user were found, create it
    if (!dbUser) {
        const dbUser: dbResponse = await client.query(
            Create(
                Collection("users"),
                {
                    data: {
                        user,
                        name,
                        picture
                    }
                }
            )
        );

        return res.send(JSON.stringify({ connected: true, user: dbUser }));
    }

    // If there was a user, but it was created via email + hash, add the information from Google
    if (dbUser && !dbUser.data.hasOwnProperty("picture")) {
        const updatedUser: dbResponse = await client.query(
            Replace(
                dbUser.ref,
                {
                    data: {
                        username: user,
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