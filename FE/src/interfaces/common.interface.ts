export interface FilterProps {
  search?: string;
  genre?: string[];
  platform?: string[];
  watch?: string[];
  rating?: number[];
  date?: (number | null)[];
  sort?: string;
}
