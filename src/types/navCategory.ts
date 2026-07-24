export interface Category {
  id: string;
  title: string;
  children: {
    title: string;
    items: string[];
  }[];
}