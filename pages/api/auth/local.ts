import { matchPassword } from "../../../utils/managePassword";
import { client, fauna } from "../../../utils/db/Fauna";
import type { NextApiRequest, NextApiResponse } from 'next';
import { dbResponse } from "../../../next-env";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    const { body: { username, password } } = req;

    const {
        Get,
        Match,
        Index
    } = fauna.query;

    const user: dbResponse = await client.query(
        Get(
            Match(
                Index("users_username"),
                username
            )
        )
    )

    if (!user) return res.send(JSON.stringify({ connected: false, user: {} }));

    if (!await matchPassword(password, user.data.hash)) {
        return res.send(JSON.stringify({ connected: false, user: {} }));
    } else {
        return res.send(JSON.stringify({ connected: true, user: { username: user.data.username, id: user.data.id } }));
    }
}