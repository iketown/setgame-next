import {
  uniqueNamesGenerator,
  animals,
  colors,
  NumberDictionary,
} from "unique-names-generator";

// const numberDictionary = NumberDictionary.generate({ length: 4 });
export const getUniqueName = () => {
  const shortName = uniqueNamesGenerator({
    dictionaries: [colors, animals],
    length: 2,
  });
  return shortName;
};

export default (req, res) => {
  const name = getUniqueName();
  res.json({ name });
};
