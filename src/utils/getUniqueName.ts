import {
  uniqueNamesGenerator,
  animals,
  colors,
  NumberDictionary,
} from "unique-names-generator";
import { NextApiRequest, NextApiResponse } from "next";

const numberDictionary = NumberDictionary.generate({ min: 0, max: 9999 });
export const getUniqueName = () => {
  const shortName = uniqueNamesGenerator({
    dictionaries: [colors, animals, numberDictionary],
    length: 3,
  });
  return shortName;
};

export default getUniqueName;
