const {
  uniqueNamesGenerator,
  animals,
  colors,
  NumberDictionary,
} = require("unique-names-generator");

const numberDictionary = NumberDictionary.generate({ length: 3 });
exports.getUniqueName = () => {
  const shortName = uniqueNamesGenerator({
    dictionaries: [colors, animals, numberDictionary],
    length: 3,
  });
  return shortName;
};
