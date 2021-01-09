import { hashPassword } from "../../../utils/managePassword";
import { client, fauna } from "../../../utils/db/Fauna";
import { dbResponse } from "../../../next-env";

export default async (req, res) => {
    const { body: { username, password } } = req;
    
    const hash = await hashPassword(password);
    
    const {
        Create,
        Collection,
    } = fauna.query;

    const doc: dbResponse = await client.query(
        Create(
            Collection("users"),
            { data: {
                    username,
                    hash
                }
            }
        )
    )

    res.send(JSON.stringify({ connected: true, user: doc.data.username }));
}