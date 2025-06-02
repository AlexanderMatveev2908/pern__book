import { AssetCloudType } from "./images";
import { UserRole } from "./user";

export enum CatBookStore {
  CLASSICS = "classics",
  PHILOSOPHY = "philosophy",
  PSYCHOLOGY = "psychology",
  HISTORY = "history",
  COMICS = "comics",
  MANGA = "manga",

  IT = "it",
  POLITICS = "politics",
  ECONOMICS = "economics",
  SCIENCE = "science",
  MATH = "math",
  LANGUAGES = "languages",

  CRIME = "crime",
  SPORT = "sport",
  CHILDREN = "children",
  FANTASY = "fantasy",
  HORROR = "horror",
  BIOGRAPHY = "biography",

  COOKING = "cooking",
  TRAVEL = "travel",
  ROMANCE = "romance",
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
}
