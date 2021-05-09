interface Illustration {
  categories: string[];
  title: string;
  _id: string;
  createdAt: string;
  url: string;
  downloadCount: number;
}

interface Category {
  category: string;
  count: number;
}
