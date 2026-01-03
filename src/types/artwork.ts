export interface Artwork {
  id: string;
  title: string;
  description: string | null;
  price: number;
  dimensions: string | null;
  medium: string;
  year_created: number | null;
  category: string;
  image_url: string;
  is_available: boolean;
  is_featured: boolean;
  is_sold: boolean;
  display_order: number;
  created_at: string;
  updated_at: string;
}

export interface Commission {
  id: string;
  title: string;
  description: string | null;
  category: string;
  image_url: string;
  client_type: string | null;
  created_at: string;
}

export type ArtworkCategory = 'All' | 'Landscapes' | 'Abstract' | 'Portraits' | 'Wildlife';

export interface ArtworkFormData {
  title: string;
  description: string;
  price: number;
  dimensions: string;
  medium: string;
  year_created: number;
  category: string;
  image_url: string;
  is_available: boolean;
  is_featured: boolean;
  is_sold: boolean;
}
