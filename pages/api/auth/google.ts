import { client, fauna } from "../../../utils/db/Fauna";
import type { NextApiRequest, NextApiResponse } from 'next';
import axios from "axios";
import { withInitMiddleWare } from "../../../utils/withInitMiddleware";
import { GoogleRedirectOAuth2 } from "../../../utils/google/GoogleRedirectOAuth2";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await withInitMiddleWare(req, res);

    // Parse the incoming URL and search for a hash. Otherwise, return false
    // If there is a hash, parse the URL to separate all params
    const accessTokenResponse = req.body.access_token;
    console.log(req.body);

    // Request the access token from Google
    if (!accessTokenResponse) {
        return GoogleRedirectOAuth2(req, res);
    }
    
    // I have an access token
    // Send a request to Google to retrieve the user's profile
    if (accessTokenResponse) {
        
        // const getValue = (key: string) => accessTokenResponse
        //     .filter(url => url.includes(key))[0]
        //     .split("=")[1];

        // const token = getValue("access_token");

        const data = await axios.get(process.env.GOOGLE_OAUTH_ENDPOINT, {
            headers: {
                "Bearer": accessTokenResponse
            }
        });

        console.log(data);
        return res.send(JSON.stringify({ connected: true, user: { ...data.data }}));
    }
}