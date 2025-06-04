// ? 21 main categories.
// ? 3 subcategories for each category
// ? 21 * 3 = 63

import { BookStoreType, CatBookStore } from "./bookStore";
import { AssetCloudType } from "./images";

export const subcategories = {
  // 📚 Fiction
  "literature & fiction": [
    "literary fiction",
    "classics",
    "short stories",
    "contemporary",
    "satire",
  ],
  "mystery, thriller & suspense": [
    "detective",
    "psychological thriller",
    "cozy mystery",
    "crime noir",
    "legal thriller",
  ],
  "science fiction & fantasy": [
    "space opera",
    "dystopian",
    "epic fantasy",
    "urban fantasy",
    "time travel",
  ],
  romance: [
    "contemporary romance",
    "historical romance",
    "paranormal romance",
    "romantic comedy",
    "LGBTQ+ romance",
  ],
  horror: [
    "gothic horror",
    "paranormal",
    "psychological horror",
    "body horror",
    "occult",
  ],
  "comics & graphic novels": [
    "superhero",
    "manga",
    "anthology",
    "webcomics",
    "slice of life",
  ],
  "historical fiction": [
    "world war fiction",
    "ancient history",
    "victorian era",
    "colonial era",
    "20th century",
  ],
  "children's books": [
    "picture books",
    "fairy tales",
    "early readers",
    "educational",
    "bedtime stories",
  ],
  "young adult": [
    "teen romance",
    "dystopian",
    "coming of age",
    "fantasy",
    "high school drama",
  ],

  // 📘 Nonfiction
  "biographies & memoirs": [
    "historical figures",
    "political leaders",
    "artists & musicians",
    "sports personalities",
    "inspirational stories",
  ],
  history: ["ancient", "medieval", "renaissance", "modern", "world wars"],
  "politics & social sciences": [
    "political theory",
    "elections",
    "geopolitics",
    "sociology",
    "current affairs",
  ],
  philosophy: ["ethics", "existentialism", "metaphysics", "logic", "stoicism"],
  psychology: [
    "cognitive",
    "developmental",
    "behavioral",
    "clinical",
    "social psychology",
  ],
  "religion & spirituality": [
    "comparative religion",
    "spirituality",
    "buddhism",
    "christianity",
    "new age",
  ],
  "self-help": [
    "personal development",
    "habits",
    "productivity",
    "mindfulness",
    "confidence",
  ],
  "health, fitness & dieting": [
    "nutrition",
    "exercise science",
    "mental health",
    "diets",
    "yoga & meditation",
  ],
  travel: [
    "europe",
    "asia",
    "backpacking",
    "cultural guides",
    "travel writing",
  ],
  "cookbooks, food & wine": [
    "baking",
    "vegetarian",
    "world cuisine",
    "quick & easy",
    "desserts",
  ],
  "business & money": [
    "entrepreneurship",
    "investing",
    "economics",
    "leadership",
    "personal finance",
  ],
  "education & teaching": [
    "pedagogy",
    "special education",
    "study skills",
    "testing & exams",
    "educational theory",
  ],
  "computers & technology": [
    "programming",
    "cybersecurity",
    "networking",
    "data science",
    "AI & machine learning",
  ],
  "science & math": [
    "physics",
    "biology",
    "astronomy",
    "mathematics",
    "chemistry",
  ],
  "reference & language": [
    "english grammar",
    "spanish",
    "japanese",
    "dictionaries",
    "language learning",
  ],
};

export const categoriesBooks: string[] = Object.values(subcategories).flat();

export type BookType = {
  id: string;
  bookStoreID: string;
  title: string;
  author: string;
  year: number;
  categories: string[];
  images: AssetCloudType[] | null;
  description: string | null;
  qty: number;
  price: number;

  mainCategories?: CatBookStore[];

  ratingStats: {
    reviewsCount?: string;
    avgRating?: number;
    reviews__0__1?: string;
    reviews__1_1__2?: string;
    reviews__2_1__3?: string;
    reviews__3_1__4?: string;
    reviews__4_1__5?: string;
  };

  store?: BookStoreType;

  createdAt: string;
  updatedAt: string;
  createdBy: string;
  lastUpdatedBy: string;
};
