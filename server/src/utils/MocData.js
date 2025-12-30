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

const buildOrders = (userMap, productMap) => {
  if (!userMap || Object.keys(userMap).length === 0) {
    throw new Error("User map is empty. Seed users first.");
  }

  if (!productMap || Object.keys(productMap).length === 0) {
    throw new Error("Product map is empty. Seed products first.");
  }

  // SAFELY pick first available user (no hardcoding)
  const userId = Object.values(userMap)[0];

  if (!userId) {
    throw new Error("No valid user found for orders");
  }

  return [
    {
      user: userId,

      user_info: {
        name: "Test User",
        email: "user@example.com",
        contact: "9876543210",
        address: "123 Test Street",
        city: "Test City",
        country: "India",
        zipCode: "123456",
      },

      cart: [
        {
          product: productMap["BOOK-ABC-001"],
          title: "Alphabet Learning Book",
          quantity: 2,
          price: 199,
          image: "alphabet-book.jpg",
        },
        {
          product: productMap["CARD-ANI-003"],
          title: "Animal Flash Cards",
          quantity: 1,
          price: 149,
          image: "animal-flash-cards.jpg",
        },
      ],

      subTotal: 547,
      shippingCost: 50,
      discount: 0,
      total: 597,
      paymentMethod: "Cashfree",
      status: "Pending",
      paymentStatus: "UNPAID",
    },

    {
      user: userId,

      user_info: {
        name: "Test User",
        email: "user@example.com",
        contact: "9876543210",
        address: "123 Test Street",
        city: "Test City",
        country: "India",
        zipCode: "123456",
      },

      cart: [
        {
          product: productMap["COLOR-ANI-005"],
          title: "Animal Coloring Book",
          quantity: 1,
          price: 129,
          image: "animal-coloring.jpg",
        },
      ],

      subTotal: 129,
      shippingCost: 50,
      discount: 10,
      total: 169,
      paymentMethod: "Cashfree",
      status: "Processing",
      paymentStatus: "PAID",
    },
  ];
};

module.exports = { buildOrders };


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
  buildOrders,
  Categories,
};
