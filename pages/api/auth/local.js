import { matchPassword } from "../../../utils/managePassword";
import { client, fauna } from "../../../utils/db/Fauna";
import { withIronSession } from "next-iron-session";
require("dotenv").config();

export default withIronSession(

    async (req, res) => {
        if (req.body.api_key === process.env.API_KEY) {
                const { body: { username, password } } = req;
        
                const {
                    Get,
                    Match,
                    Index
                } = fauna.query;
        
                const user = await client.query(
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
                    return res.send(JSON.stringify({ connected: true, user: user.data.username }));
                }
            }
        },
        {
            cookieName: "session",
            cookieOptions: {
                secure: process.env.NODE_ENV === "production" ? true : false
            },
            password: process.env.APPLICATION_SECRET
        }
)