import { Key } from "react";

//  ######  CustomLink  ######## //
export interface CustomLink {
  label: string;
  href: string;
  targetBlank?: boolean;
}

//  ##########  PostDataType ######## //
export interface TaxonomyType {
  id: string | number;
  name: string;
  href: string;
  count?: number;
  thumbnail?: string;
  desc?: string;
  color?: TwMainColor | string;
  taxonomy: "category" | "tag";
  listingType?: "stay" | "experiences" | "car";
}

export interface AuthorType {
  id: string | number;
  firstName: string;
  lastName: string;
  displayName: string;
  avatar: string;
  bgImage?: string;
  email?: string;
  count: number;
  desc: string;
  jobName: string;
  href: string;
  starRating?: number;
}

export interface PostDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  categories: TaxonomyType[];
  title: string;
  featuredImage: string;
  desc?: string;
  commentCount: number;
  viewdCount: number;
  readingTime: number;
  postType?: "standard" | "video" | "gallery" | "audio";
}

export type TwMainColor =
  | "pink"
  | "green"
  | "yellow"
  | "red"
  | "indigo"
  | "blue"
  | "purple"
  | "gray";

//
export interface StayDataCard {
  type: string;
  title: string;
  country: string;
  street: string;
  room_number: string;
  city: string;
  state: string;
  postal_code: string;
  lattitude: string;
  longitude: string;
  acreage: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  kitchen: number;
  amenities: string[]; 
  pet: boolean;
  party_organizing: boolean;
  cooking: boolean;
  smoking: boolean;
  drinking: boolean;
  additional_rules: string[]; 
  place_descriptions: string;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  night_min: number;
  night_max: number;
  cover_image: string;
  galleryImgs: string[]; 
};
export interface StayDataType {
  _id: (Key | null | undefined) & String;
  type: string;
  title: string;
  country: string;
  street: string;
  room_number: string;
  city: string;
  state: string;
  postal_code: string;
  lattitude: string;
  longitude: string;
  acreage: string;
  guests: number;
  bedrooms: number;
  beds: number;
  bathrooms: number;
  kitchen: number;
  amenities: string[]; 
  pet: boolean;
  party_organizing: boolean;
  cooking: boolean;
  smoking: boolean;
  drinking: boolean;
  additional_rules: string[]; 
  place_descriptions: string;
  monday: number;
  tuesday: number;
  wednesday: number;
  thursday: number;
  friday: number;
  saturday: number;
  sunday: number;
  night_min: number;
  night_max: number;
  cover_image: string;
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface ExperiencesDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  maxGuests: number;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}

//
export interface CarDataType {
  id: string | number;
  author: AuthorType;
  date: string;
  href: string;
  title: string;
  featuredImage: string;
  commentCount: number;
  viewCount: number;
  address: string;
  reviewStart: number;
  reviewCount: number;
  like: boolean;
  galleryImgs: string[];
  price: string;
  listingCategory: TaxonomyType;
  seats: number;
  gearshift: string;
  saleOff?: string | null;
  isAds: boolean | null;
  map: {
    lat: number;
    lng: number;
  };
}
