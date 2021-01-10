import { client, fauna } from "../../../utils/db/Fauna";
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbResponse } from "../../../next-env";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { id } = req.query;

    console.log(id);

    const {
        Get,
        Match,
        Index
    } = fauna.query;
    
    const user: dbResponse = await client.query(
        Get(
            Match(
                Index("users_id"),
                id
            )
        )
    )

    res.send(JSON.stringify(user.data));
}