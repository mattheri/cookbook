import Cors from "cors";
import type { NextApiRequest, NextApiResponse } from 'next';

function runMiddleware(middleware: any) {
    return (req: NextApiRequest, res: NextApiResponse) =>
      new Promise((resolve, reject) => {
        middleware(req, res, (result) => {
          if (result instanceof Error) {
            return reject(result)
          }
          return resolve(result)
        })
      })
  }

const cors = runMiddleware(Cors());

export const withInitMiddleWare = async (req: NextApiRequest, res: NextApiResponse) => {
    await cors(req, res);
}
