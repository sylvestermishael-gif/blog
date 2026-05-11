export interface Post {
  id: string;
  title: string;
  summary: string;
  content: string;
  category: "Inspiration" | "Interviews" | "Career" | "Tutorials" | "News" | "Entertainment" | "Sports" | "Tech";
  author: string;
  authorId: string;
  date: string;
  imageUrl: string;
  readTime: string;
  likes: number;
}

export type Category = Post["category"];
