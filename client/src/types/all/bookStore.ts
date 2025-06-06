import { AssetCloudType } from "./images";
import { UserRole } from "./user";

export enum CatBookStore {
  // 📚 Fiction
  LITERATURE_FICTION = "literature & fiction",
  MYSTERY_THRILLER = "mystery, thriller & suspense",
  SCIENCE_FICTION = "science fiction & fantasy",
  ROMANCE = "romance",
  HORROR = "horror",
  COMICS_GRAPHIC_NOVELS = "comics & graphic novels",
  HISTORICAL_FICTION = "historical fiction",
  CHILDRENS_BOOKS = "children's books",
  YOUNG_ADULT = "young adult",

  // 📘 Nonfiction
  BIOGRAPHIES = "biographies & memoirs",
  HISTORY = "history",
  POLITICS_SOCIAL = "politics & social sciences",
  PHILOSOPHY = "philosophy",
  PSYCHOLOGY = "psychology",
  RELIGION_SPIRITUALITY = "religion & spirituality",
  SELF_HELP = "self-help",
  HEALTH = "health, fitness & dieting",
  TRAVEL = "travel",
  COOKING = "cookbooks, food & wine",
  BUSINESS_MONEY = "business & money",
  EDUCATION = "education & teaching",
  COMPUTERS_TECH = "computers & technology",
  SCIENCE = "science & math",
  LANGUAGE = "reference & language",
}

export interface TeamItem {
  userEmail: string;
  role: UserRole;
  userID: string;
  bookStoreID: string;
}

export interface BookStoreType {
  id: string;
  ownerID: string;
  name: string;
  description?: string | null;
  categories: CatBookStore[];
  email: string;
  phone: string;
  website?: string | null;
  country: string;
  state: string;
  city: string;
  street: string;
  zipCode: string;
  deliveryPrice?: number;
  freeDeliveryAmount?: number;
  deliveryTime: number;
  team?: TeamItem[];
  images?: AssetCloudType[];
  video?: AssetCloudType;

  booksStats: { booksCount?: string; avgPrice?: string; avgQty?: string };

  ratingStats: {
    reviewsCount?: string;
    avgRating: string;
    reviews__0__1?: string;
    reviews__1_1__2?: string;
    reviews__2_1__3?: string;
    reviews__3_1__4?: string;
    reviews__4_1__5?: string;
  };

  ordersStats: {
    ordersCount?: string;
    ordersPendingCount?: string;
    ordersPaidCount?: string;
    ordersProcessingCount?: string;
    ordersShippedCount?: string;
    ordersDeliveredCount?: string;
    ordersCompletedCount?: string;
    ordersCancelledCount?: string;
    ordersRefundedCount?: string;
  };

  teamStats: {
    teamCount?: string;
    managersCount?: string;
    employeesCount?: string;
  };

  createdAt: string;
  updatedAt: string;
  lastUpdatedBy: string;

  deletedAt?: string;
}
