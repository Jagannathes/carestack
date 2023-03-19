// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from 'next';
import {withAuth} from '../../utils/auth';

type Data = {
  name: string;
};

 function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>,
) {
  res.status(200).json(req.user as Data);
}

export default withAuth(handler);