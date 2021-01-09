import type { NextApiRequest, NextApiResponse } from 'next';
import { withInitMiddleWare } from "../../../utils/withInitMiddleware";
import { GoogleRedirectOAuth2 } from "../../../utils/google/GoogleRedirectOAuth2";

export default async (req: NextApiRequest, res: NextApiResponse) => {
    await withInitMiddleWare(req, res);

    if (req.body.oAuthRequest === "google") {
        await GoogleRedirectOAuth2(req, res);
    }
}

