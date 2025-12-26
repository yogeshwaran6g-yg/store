// scripts/MocData.js

const buildProducts = (categoryMap) => {
  if (!categoryMap || Object.keys(categoryMap).length === 0) {
    throw new Error("Category map is empty. Seed categories first.");
  }

  return [
    {
      sku: "BOOK-ABC-001",
      title: "Alphabet Learning Book",
      slug: "alphabet-learning-book",
      description: "A fun and interactive alphabet learning book for kids aged 3-5.",
      categoryId: categoryMap["books"],
      tags: ["kids", "alphabet", "learning"],
      prices: { originalPrice: 299, price: 199 },
      stock: 50,
      images: ["alphabet-book.jpg"],
      status: "ACTIVE",
    },

    {
      sku: "BOOK-NUM-002",
      title: "Numbers Practice Book",
      slug: "numbers-practice-book",
      description: "Early math learning with numbers and activities.",
      categoryId: categoryMap["books"],
      tags: ["kids", "numbers", "math"],
      prices: { originalPrice: 249, price: 179 },
      stock: 40,
      images: ["numbers-book.jpg"],
      status: "ACTIVE",
    },

    {
      sku: "CARD-ANI-003",
      title: "Animal Flash Cards",
      slug: "animal-flash-cards",
      description: "Colorful animal flash cards to improve recognition skills.",
      categoryId: categoryMap["flash-cards"],
      tags: ["flashcards", "animals", "kids"],
      prices: { originalPrice: 199, price: 149 },
      stock: 60,
      images: ["animal-flash-cards.jpg"],
      status: "ACTIVE",
    },

    {
      sku: "CARD-FRU-004",
      title: "Fruits Flash Cards",
      slug: "fruits-flash-cards",
      description: "Learn fruits names with attractive flash cards.",
      categoryId: categoryMap["flash-cards"],
      tags: ["flashcards", "fruits", "learning"],
      prices: { originalPrice: 199, price: 149 },
      stock: 35,
      images: ["fruits-flash-cards.jpg"],
      status: "ACTIVE",
    },

    {
      sku: "COLOR-ANI-005",
      title: "Animal Coloring Book",
      slug: "animal-coloring-book",
      description: "Creative animal coloring book for kids.",
      categoryId: categoryMap["coloring"],
      tags: ["coloring", "animals", "kids"],
      prices: { originalPrice: 199, price: 129 },
      stock: 45,
      images: ["animal-coloring.jpg"],
      status: "ACTIVE",
    },

    {
      sku: "COLOR-FRU-006",
      title: "Fruits Coloring Book",
      slug: "fruits-coloring-book",
      description: "Color and learn fruits in a fun way.",
      categoryId: categoryMap["coloring"],
      tags: ["coloring", "fruits", "kids"],
      prices: { originalPrice: 189, price: 119 },
      stock: 30,
      images: ["fruits-coloring.jpg"],
      status: "ACTIVE",
    }
  ];
};

const Categories = [
  {
    name: "Books",
    slug: "books",
    description: "Educational and story books for kids",
  },
  {
    name: "Flash Cards",
    slug: "flash-cards",
    description: "Learning flash cards for kids",
  },
  {
    name: "Coloring",
    slug: "coloring",
    description: "Coloring books and creative materials",
  },
];

module.exports = {
  buildProducts,
  Categories,
};
