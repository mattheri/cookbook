import { hashPassword } from "../../../utils/managePassword";
import { client, fauna } from "../../../utils/db/Fauna";
import { dbResponse } from "../../../next-env";
import { v4 as uuid, v4 } from "uuid";

export default async (req, res) => {
    const { body: { username, password } } = req;
    
    const hash = await hashPassword(password);
    
    const {
        Create,
        Collection,
    } = fauna.query;

    const user: dbResponse = await client.query(
        Create(
            Collection("users"),
            {
                data: {
                    id: uuid().replace(/-+/g, ""),
                    username,
                    hash
                }
            }
        )
    )

    res.send(JSON.stringify({ connected: true, user: { username: user.data.username, id: user.data.id } }));
}