import { authConfig } from "../../../utils/authConfig";
import { hashPassword } from "../../../utils/managePassword";
import { client, fauna } from "../../../utils/db/Fauna";

export default async (req, res) => {
    const { body: { username, password } } = req;
    
    const hash = await hashPassword(password);
    console.log(hash);
    
    const {
        Create,
        Collection,
    } = fauna.query;

    const doc = await client.query(
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