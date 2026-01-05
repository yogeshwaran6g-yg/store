// src/data/dummyCart.js
export const dummyCartItems = [
  {
    id: "p1",
    title: "Alphabet Flash Cards",
    price: 299,
    quantity: 2,
    image: "https://via.placeholder.com/40",
  },
  {
    id: "p2",
    title: "Kids Coloring Book",
    price: 199,
    quantity: 1,
    image: "https://via.placeholder.com/40",
  },
];

export const productDummy = {
  _id: "p1",
  slug: "travel-toys-bundle",
  title: "Travel Toys Bundle | Ages 4+",
  sku: "TTB-001",
  description:
    "This is a dummy description for the product. It explains features, usage, and benefits in detail, This is a dummy description for the product. It explains features, usage, and benefits in detail.",
  image: [
    "https://images.unsplash.com/photo-1515488042361-ee00e0ddd4e4?w=600",
    "https://images.unsplash.com/photo-1519681393784-d120267933ba?w=600",
  ],
  stock: 10,
  prices: {
    price: 5118,
    originalPrice: 6397,
  },
  category: {
    _id: "cat1",
    name: "Toys",
  },
  variants: [],
};

/**
 *  id: product._id || product.id,
            title: product.title,
            price: product.prices ? product.prices.price : product.price,
            image: Array.isArray(product.image) ? product.image[0] : product.image,
            quantity
 */

 export const faqData = [
    {
      question: "What is your return policy?",
      answer: "We offer a 30-day return policy for all unused items in their original packaging. Simply contact our customer service team to initiate a return."
    },
    {
      question: "How long does shipping take?",
      answer: "Standard shipping typically takes 5-7 business days. Express shipping options are available at checkout for faster delivery within 2-3 business days."
    },
    {
      question: "Do you ship internationally?",
      answer: "Yes, we ship to most countries worldwide. International shipping times vary by destination, typically ranging from 10-21 business days. Customs fees may apply."
    },
    {
      question: "How can I track my order?",
      answer: "Once your order ships, you'll receive a tracking number via email. You can use this number on our website or the carrier's site to track your package in real-time."
    },
    {
      question: "What payment methods do you accept?",
      answer: "We accept all major credit cards (Visa, MasterCard, American Express), PayPal, Apple Pay, and Google Pay for your convenience."
    }
  ];

export const endPoints = {

  CART :{
    GET :"/cart",
    POST :"/cart",
    DELETE :"/cart",
  },
}

export const  countries  = {
  "countries": [
    { "name": "India" },
  ]
  
}