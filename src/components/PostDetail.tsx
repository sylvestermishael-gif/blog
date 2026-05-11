import { ArrowLeft, Clock, Heart, MessageCircle, Share2, Twitter, Facebook, Linkedin, UserPlus, UserCheck } from "lucide-react";
import { motion } from "motion/react";
import { Post } from "../types";
import { useUser } from "../context/UserContext";

interface PostDetailProps {
  post: Post;
  onBack: () => void;
  onSignInRequired: () => void;
  key?: string;
}

export default function PostDetail({ post, onBack, onSignInRequired }: PostDetailProps) {
  const { user, isFollowing, toggleFollow } = useUser();

  const handleLike = () => {
    if (!user) {
      onSignInRequired();
      return;
    }
    // Logic for liking would go here
    console.log("Liked!");
  };

  const handleFollowToggle = async () => {
    if (!user) {
      onSignInRequired();
      return;
    }
    await toggleFollow(post.authorId);
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="bg-white dark:bg-slate-950 min-h-screen pb-20 transition-colors"
    >
      {/* Article Header */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
        <button 
          onClick={onBack}
          className="flex items-center space-x-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors mb-12 group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-medium">Back to feed</span>
        </button>

        <div className="max-w-3xl mx-auto text-center space-y-6 mb-16">
          <div className="flex justify-center">
            <span className="px-4 py-1 text-xs font-bold uppercase tracking-widest text-slate-500 dark:text-slate-400 border border-slate-200 dark:border-slate-800 rounded-full">
              {post.category}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight text-slate-950 dark:text-white leading-[1.1] text-balance">
            {post.title}
          </h1>
          <p className="text-xl text-slate-600 dark:text-slate-400 leading-relaxed text-balance">
            {post.summary}
          </p>
          <div className="flex items-center justify-center space-x-4 pt-4">
            <div className="flex items-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-10 h-10 rounded-full bg-slate-100 dark:bg-slate-900 flex items-center justify-center font-bold text-slate-400 dark:text-slate-600">
                  {post.author.charAt(0)}
                </div>
                <div className="text-left">
                  <p className="text-sm font-bold text-slate-900 dark:text-white">{post.author}</p>
                  <div className="flex items-center text-xs text-slate-500 space-x-2 mt-0.5">
                    <span>{post.date}</span>
                    <span>•</span>
                    <span className="flex items-center">
                      <Clock className="w-3 h-3 mr-1" />
                      {post.readTime}
                    </span>
                  </div>
                </div>
              </div>
              
              <button 
                onClick={handleFollowToggle}
                className={`flex items-center space-x-1.5 px-4 py-1.5 rounded-full text-xs font-bold transition-all ${
                  isFollowing(post.authorId) 
                    ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" 
                    : "bg-slate-900 dark:bg-blue-600 text-white shadow-lg shadow-blue-500/10 hover:bg-slate-800 dark:hover:bg-blue-500"
                }`}
              >
                {isFollowing(post.authorId) ? (
                  <>
                    <UserCheck className="w-3.5 h-3.5" />
                    <span>Following</span>
                  </>
                ) : (
                  <>
                    <UserPlus className="w-3.5 h-3.5" />
                    <span>Follow</span>
                  </>
                )}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Image */}
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 mb-16">
        <div className="aspect-video w-full rounded-2xl md:rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 shadow-2xl shadow-slate-200 dark:shadow-blue-500/5">
          <img
            src={post.imageUrl}
            alt={post.title}
            className="w-full h-full object-cover"
            referrerPolicy="no-referrer"
          />
        </div>
      </div>

      {/* Content */}
      <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8">
        <div 
          className="prose prose-slate dark:prose-invert prose-lg max-w-none prose-headings:font-bold prose-headings:tracking-tight prose-a:text-blue-600 dark:prose-a:text-blue-400 prose-blockquote:border-l-4 prose-blockquote:border-slate-900 dark:prose-blockquote:border-blue-600 prose-blockquote:italic prose-blockquote:bg-slate-50 dark:prose-blockquote:bg-slate-900/50 prose-blockquote:px-6 prose-blockquote:py-2 prose-blockquote:rounded-r-xl"
          dangerouslySetInnerHTML={{ __html: post.content }}
        />

        {/* Social interactions */}
        <div className="mt-16 pt-10 border-t border-slate-100 dark:border-slate-800 flex flex-col md:flex-row md:items-center md:justify-between space-y-6 md:space-y-0 text-slate-500">
          <div className="flex items-center space-x-8">
            <button 
              onClick={handleLike}
              className="flex items-center space-x-2 hover:text-red-500 transition-colors group"
            >
              <Heart className={`w-6 h-6 group-hover:scale-110 transition-transform ${user ? 'fill-transparent' : ''}`} />
              <span className="text-sm font-bold">{post.likes}</span>
            </button>
            <button className="flex items-center space-x-2 hover:text-slate-900 dark:hover:text-white transition-colors group">
              <MessageCircle className="w-6 h-6 group-hover:scale-110 transition-transform" />
              <span className="text-sm font-bold">12 Comments</span>
            </button>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-sm font-bold uppercase tracking-widest text-slate-400 dark:text-slate-500 mr-2">Share</span>
            <button className="p-2 border border-slate-100 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Twitter className="w-5 h-5" />
            </button>
            <button className="p-2 border border-slate-100 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Facebook className="w-5 h-5" />
            </button>
            <button className="p-2 border border-slate-100 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Linkedin className="w-5 h-5" />
            </button>
            <button className="p-2 border border-slate-100 dark:border-slate-800 rounded-full hover:bg-slate-50 dark:hover:bg-slate-900 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Share2 className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Author bio mini */}
        <div className="mt-20 p-8 bg-slate-50 dark:bg-slate-900/50 rounded-3xl flex items-center justify-between border border-slate-100 dark:border-slate-800">
          <div className="flex items-center space-x-6">
            <div className="w-20 h-20 rounded-full bg-white dark:bg-slate-900 flex items-center justify-center text-3xl font-bold text-slate-300 dark:text-slate-700 shadow-sm border border-slate-100 dark:border-slate-800">
              {post.author.charAt(0)}
            </div>
            <div>
              <h4 className="text-lg font-bold text-slate-900 dark:text-white">About {post.author}</h4>
              <p className="text-slate-500 dark:text-slate-400 mt-2 leading-relaxed">
                Contributing designer and writer at Nexus. Passionate about the intersection of technology, human-centered design, and minimalist aesthetics.
              </p>
            </div>
          </div>
          <div className="hidden md:block">
            <button 
              onClick={handleFollowToggle}
              className={`flex items-center space-x-2 px-6 py-3 rounded-2xl font-bold transition-all ${
                isFollowing(post.authorId) 
                  ? "bg-white dark:bg-slate-900 text-slate-900 dark:text-white border border-slate-200 dark:border-slate-800" 
                  : "bg-slate-900 dark:bg-blue-600 text-white hover:bg-slate-800 dark:hover:bg-blue-500"
              }`}
            >
              {isFollowing(post.authorId) ? (
                <>
                  <UserCheck className="w-5 h-5" />
                  <span>Following</span>
                </>
              ) : (
                <>
                  <UserPlus className="w-5 h-5" />
                  <span>Follow Artist</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
