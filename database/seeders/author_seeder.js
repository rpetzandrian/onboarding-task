module.exports = {
  up: (queryInterface, DataTypes) => {
    const name = [
      "Tressa Hedley",
      "Jacky Vasyushkhin",
      "Junie Crumpe",
      "Bryana Carwithim",
      "Bren Elvish",
      "Cole Loghan",
      "Jasun Allbones",
      "Gard Bariball",
      "Yevette Byway",
      "Raddie Linke",
    ];

    const author = name.map((item) => ({
      name: item,
      created_at: new Date(),
      updated_at: new Date(),
    }));

    return queryInterface.bulkInsert("author", author, {});
  },
};
