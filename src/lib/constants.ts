export const SITE_NAME = "LearnBooks";
export const SITE_DESCRIPTION =
  "Master modern programming with our comprehensive guide. Instant PDF download after purchase.";

export const THE_BOOK = {
  id: "1",
  title: "The Complete JavaScript & Web Development Guide",
  author: "Alex Johnson",
  description:
    "A comprehensive guide covering JavaScript fundamentals, React, Node.js, databases, and real-world project development. Perfect for beginners and intermediate developers looking to level up their skills.",
  longDescription: `Whether you are a complete beginner or an experienced developer looking to deepen your knowledge, this book has everything you need. Starting from JavaScript basics, you will progress through advanced concepts, modern frameworks, and professional development practices used in the industry today.

Topics covered include: JavaScript ES6+, React fundamentals, Node.js and Express, REST APIs, MongoDB and SQL databases, authentication and security, deployment and DevOps basics, and 10 real-world projects you can add to your portfolio.`,
  price: 29.99,
  originalPrice: 79.99,
  coverImage: "https://picsum.photos/seed/jsbook/400/560",
  pages: 487,
  language: "English",
  publishedAt: "2024",
  format: "PDF",
  fileSize: "12.4 MB",
  category: "Programming",
  rating: 4.8,
  reviewCount: 1247,
  chaptersCount: 24,
  includes: [
    "487 pages of in-depth content",
    "24 chapters with practical examples",
    "10 real-world projects with source code",
    "Lifetime access with free updates",
    "Compatible with all PDF readers",
    "Certificate of completion",
  ],
  tableOfContents: [
    { chapter: 1, title: "JavaScript Fundamentals" },
    { chapter: 2, title: "ES6+ Modern Features" },
    { chapter: 3, title: "DOM Manipulation" },
    { chapter: 4, title: "Async Programming" },
    { chapter: 5, title: "React Basics" },
    { chapter: 6, title: "React Hooks & State" },
    { chapter: 7, title: "Node.js & Express" },
    { chapter: 8, title: "REST API Development" },
    { chapter: 9, title: "Database Design" },
    { chapter: 10, title: "Authentication & Security" },
    { chapter: 11, title: "Deployment & DevOps" },
    { chapter: 12, title: "Real-World Projects" },
  ],
  reviews: [
    {
      id: "r1",
      name: "Sarah Mitchell",
      avatar: "SM",
      rating: 5,
      date: "2024-11-15",
      text: "Best programming book I have ever bought. Clear explanations and great examples.",
    },
    {
      id: "r2",
      name: "James Chen",
      avatar: "JC",
      rating: 5,
      date: "2024-10-28",
      text: "Went from zero to building full-stack apps in 3 months. Worth every penny!",
    },
    {
      id: "r3",
      name: "Emma Rodriguez",
      avatar: "ER",
      rating: 4,
      date: "2024-09-10",
      text: "Very thorough and well-structured. The projects section is especially valuable.",
    },
    {
      id: "r4",
      name: "Michael Brooks",
      avatar: "MB",
      rating: 5,
      date: "2024-08-22",
      text: "I have tried many courses and books. This one stands out for its clarity.",
    },
  ],
};

export const NAV_LINKS = [
  { name: "Home", href: "/" },
  { name: "About", href: "/about" },
  { name: "Contact", href: "/contact" },
];
