export interface Product {
  id: string;
  title: string;
  image: string;
  description: string;
  features: string[];
  price: string;
  rating: string;
  affiliate_link: string;
}

export type ImageSize = '1K' | '2K' | '4K';