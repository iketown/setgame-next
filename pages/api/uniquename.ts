/* eslint-disable @typescript-eslint/explicit-module-boundary-types */
import { uniqueNamesGenerator, animals, colors } from "unique-names-generator";
import { NextApiRequest, NextApiResponse } from "next";

export const getUniqueName = () => {
  const shortName = uniqueNamesGenerator({
    dictionaries: [colors, animals],
    length: 2,
  });
  return shortName;
};

export default (req: NextApiRequest, res: NextApiResponse) => {
  const name = getUniqueName();
  res.json({ name });
};
