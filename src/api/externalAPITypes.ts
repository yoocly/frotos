export type imageAPIResult = {
  total?: number;
  total_pages?: number;
  results?: unsplashImage[];
  page?: number;
  per_page?: number;
  photos?: pexelsImage[];
  total_results?: number;
  next_page?: string;
  totalHits?: number;
  hits?: pixabayImage[];
};

export type imageAPIImage = unsplashImage | pexelsImage | pixabayImage;

export type pixabayImage = {
  id?: number;
  pageURL?: string;
  type?: HitType;
  tags?: string;
  previewURL?: string;
  previewWidth?: number;
  previewHeight?: number;
  webformatURL?: string;
  webformatWidth?: number;
  webformatHeight?: number;
  largeImageURL?: string;
  imageWidth?: number;
  imageHeight?: number;
  imageSize?: number;
  views?: number;
  downloads?: number;
  collections?: number;
  likes?: number;
  comments?: number;
  user_id?: number;
  user?: string;
  userImageURL?: string;
};

export enum HitType {
  Photo = 'photo',
  VectorSVG = 'vector/svg',
}

export type pexelsImage = {
  id?: number;
  width?: number;
  height?: number;
  url?: string;
  photographer?: string;
  photographer_url?: string;
  photographer_id?: number;
  avg_color?: string;
  src?: Src;
  liked?: boolean;
};

export type Src = {
  original?: string;
  large2x?: string;
  large?: string;
  medium?: string;
  small?: string;
  portrait?: string;
  landscape?: string;
  tiny?: string;
};

export type unsplashImage = {
  id?: string;
  created_at?: string;
  updated_at?: Date;
  promoted_at?: Date | null;
  width?: number;
  height?: number;
  color?: string;
  blur_hash?: string;
  description?: null | string;
  alt_description?: null | string;
  urls?: Urls;
  links?: ResultLinks;
  likes?: number;
  liked_by_user?: boolean;
  sponsorship?: null;
  topic_submissions?: ResultTopicSubmissions;
  user?: User;
  tags?: Tag[];
};

export type ResultLinks = {
  self?: string;
  html?: string;
  download?: string;
  download_location?: string;
};

export type Tag = {
  type?: TagType;
  title?: string;
  source?: Source;
};

export type Source = {
  ancestry?: Ancestry;
  title?: string;
  subtitle?: string;
  description?: string;
  meta_title?: string;
  meta_description?: string;
  cover_photo?: CoverPhoto;
};

export type Ancestry = {
  type?: Category;
  category?: Category;
  subcategory?: Category;
};

export type Category = {
  slug?: string;
  pretty_slug?: string;
};

export type CoverPhoto = {
  id?: string;
  created_at?: Date;
  updated_at?: Date;
  promoted_at?: Date | null;
  width?: number;
  height?: number;
  color?: string;
  blur_hash?: string;
  description?: null | string;
  alt_description?: null | string;
  urls?: Urls;
  links?: ResultLinks;
  likes?: number;
  liked_by_user?: boolean;
  sponsorship?: null;
  topic_submissions?: CoverPhotoTopicSubmissions;
  user?: User;
};

export type CoverPhotoTopicSubmissions = {
  'textures-patterns'?: Architecture;
  wallpapers?: Architecture;
  spirituality?: Architecture;
  nature?: Architecture;
};

export type Architecture = {
  status?: Status;
  approved_on?: Date;
};

export enum Status {
  Approved = 'approved',
}

export type Urls = {
  raw?: string;
  full?: string;
  regular?: string;
  small?: string;
  thumb?: string;
};

export type User = {
  id?: string;
  updated_at?: Date;
  username?: string;
  name?: string;
  first_name?: string;
  last_name?: null | string;
  twitter_username?: null | string;
  portfolio_url?: null | string;
  bio?: null | string;
  location?: null | string;
  links?: UserLinks;
  profile_image?: ProfileImage;
  instagram_username?: null | string;
  total_collections?: number;
  total_likes?: number;
  total_photos?: number;
  accepted_tos?: boolean;
  for_hire?: boolean;
  social?: Social;
};

export type UserLinks = {
  self?: string;
  html?: string;
  photos?: string;
  likes?: string;
  portfolio?: string;
  following?: string;
  followers?: string;
};

export type ProfileImage = {
  small?: string;
  medium?: string;
  large?: string;
};

export type Social = {
  instagram_username?: null | string;
  portfolio_url?: null | string;
  twitter_username?: null | string;
  paypal_email?: null;
};

export enum TagType {
  LandingPage = 'landing_page',
  Search = 'search',
}

export type ResultTopicSubmissions = {
  architecture?: Architecture;
  travel?: Travel;
};

export type Travel = {
  status?: string;
};
