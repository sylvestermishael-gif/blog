import { Heart, MessageCircle, Share2 } from "lucide-react";
import { motion } from "motion/react";
import { Post } from "../types";

interface BlogCardProps {
  post: Post;
  onClick: (post: Post) => void;
  key?: string;
}

export default function BlogCard({ post, onClick }: BlogCardProps) {
  return (
    <motion.article 
      layout
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ duration: 0.4, ease: "easeOut" }}
      className="group cursor-pointer flex flex-col space-y-4 pt-10"
      onClick={() => onClick(post)}
    >
      <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-slate-100 dark:bg-slate-900">
        <img
          src={post.imageUrl}
          alt={post.title}
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          referrerPolicy="no-referrer"
        />
        <div className="absolute top-4 left-4">
          <span className="px-3 py-1 text-xs font-semibold bg-slate-950/80 backdrop-blur-sm text-white rounded-full border border-slate-800">
            {post.category}
          </span>
        </div>
      </div>

      <div className="space-y-3">
        <div className="flex items-center space-x-2 text-xs font-medium text-slate-500 uppercase tracking-widest">
          <span>{post.author}</span>
          <span>•</span>
          <span>{post.date}</span>
        </div>
        
        <h3 className="text-2xl font-bold leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-2 text-slate-900 dark:text-white">
          {post.title}
        </h3>
        
        <p className="text-slate-500 line-clamp-2 text-sm leading-relaxed">
          {post.summary}
        </p>

        <div className="flex items-center justify-between pt-2 border-t border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-4">
            <button className="flex items-center space-x-1.5 text-slate-500 hover:text-red-500 transition-colors">
              <Heart className="w-4 h-4" />
              <span className="text-xs font-medium">{post.likes}</span>
            </button>
            <button className="flex items-center space-x-1.5 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <MessageCircle className="w-4 h-4" />
              <span className="text-xs font-medium">12</span>
            </button>
          </div>
          <button className="text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
            <Share2 className="w-4 h-4" />
          </button>
        </div>
      </div>
    </motion.article>
  );
}
