import { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  const { body } = req;
  res.status(200).json({ hey: "wussup", body });
};
