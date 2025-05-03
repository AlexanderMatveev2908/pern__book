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
  ImgBookStores?: AssetCloudType[];
  VideoBookStore?: AssetCloudType;
}
