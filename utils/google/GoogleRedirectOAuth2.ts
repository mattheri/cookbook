import type { NextApiRequest, NextApiResponse } from 'next';

export const GoogleRedirectOAuth2 = async (req: NextApiRequest, res: NextApiResponse) => {
    const GOOGLE_SCOPE = "https://www.googleapis.com/auth/userinfo.email https://www.googleapis.com/auth/userinfo.profile";
    const DEV = process.env.NODE_ENV !== "production";

    const googleParams = {
        client_id: process.env.GOOGLE_CLIENT_ID,
        redirect_uri: DEV ? `${process.env.DEV_URL}/api/auth/google` : `${process.env.PROD_URL}/api/auth/google`,
        response_type: "code",
        scope: GOOGLE_SCOPE,
        include_granted_scopes: true
    }

    const oath2Endpoint = () => {
        const endpoint = [process.env.GOOGLE_OAUTH_ENDPOINT];
        const paramsArray = Object.entries(googleParams);

        paramsArray.map(([key, value], index) => {
            if (index < paramsArray.length - 1) {
                return endpoint.push(`${key}=${value}&`)
            }

            return endpoint.push(`${key}=${value}`);
        });
        return endpoint.join("");
    }

    try {
        return res.send({ url: oath2Endpoint() });
    } catch (e) {
        res.send(JSON.stringify({ connected: false, user: { error: "Could not redirect to Google's authentification page." } }));
    }
}