/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { useState, useMemo, useEffect } from "react";
import { AnimatePresence, motion } from "motion/react";
import Header from "./components/Header";
import BlogCard from "./components/BlogCard";
import PostDetail from "./components/PostDetail";
import SignIn from "./components/SignIn";
import TrendingNews from "./components/TrendingNews";
import LiveCategoryFeed from "./components/LiveCategoryFeed";
import InterestsPicker from "./components/InterestsPicker";
import Footer from "./components/Footer";
import { mockPosts } from "./data/mockPosts";
import { Category, Post } from "./types";
import { UserProvider, useUser } from "./context/UserContext";
import { ThemeProvider, useTheme } from "./context/ThemeContext";

function MainContent() {
  const { user, interests, loading } = useUser();
  const [activeCategory, setActiveCategory] = useState<Category | "All" | "For You">("All");
  const [selectedPost, setSelectedPost] = useState<Post | null>(null);
  const [showSignIn, setShowSignIn] = useState(false);
  const [showInterestsPicker, setShowInterestsPicker] = useState(false);

  const { theme } = useTheme();

  useEffect(() => {
    if (!loading && user && interests.length === 0 && !showInterestsPicker) {
      setShowInterestsPicker(true);
    }
  }, [user, interests, loading, showInterestsPicker]);

  const filteredPosts = useMemo(() => {
    let posts = mockPosts;
    
    if (activeCategory === "For You" && interests.length > 0) {
      posts = mockPosts.filter(post => interests.includes(post.category));
    } else if (activeCategory !== "All") {
      posts = mockPosts.filter(post => post.category === activeCategory);
    }
    
    return posts;
  }, [activeCategory, interests]);

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950">
        <div className="flex flex-col items-center space-y-4">
          <div className="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
          <p className="text-slate-400 text-xs font-black uppercase tracking-[0.3em] animate-pulse">Syncing Secure Feed</p>
        </div>
      </div>
    );
  }

  const handleCategoryChange = (category: Category | "All" | "For You") => {
    setActiveCategory(category);
    setSelectedPost(null);
    setShowSignIn(false);
    setShowInterestsPicker(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handlePostClick = (post: Post) => {
    setSelectedPost(post);
    setShowSignIn(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBackToFeed = () => {
    setSelectedPost(null);
    setShowSignIn(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleShowSignIn = () => {
    setShowSignIn(true);
    setShowInterestsPicker(false);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleOpenPreferences = () => {
    setShowInterestsPicker(true);
    setShowSignIn(false);
    setSelectedPost(null);
  };

  return (
    <div className="min-h-screen flex flex-col bg-white dark:bg-slate-950 text-slate-900 dark:text-white transition-colors duration-300 overflow-x-hidden">
      <Header 
        activeCategory={activeCategory} 
        onCategoryChange={handleCategoryChange}
        onLogoClick={handleBackToFeed}
        onSignInClick={handleShowSignIn}
        onOpenPreferences={handleOpenPreferences}
      />

      <main className="flex-grow flex flex-col">
        <AnimatePresence mode="wait">
          {!user && !showSignIn ? (
            <motion.div
              key="landing"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex-grow flex flex-col items-center justify-center px-6 py-24 text-center space-y-12 bg-slate-50 dark:bg-slate-900/40 transition-colors"
            >
              <div className="max-w-3xl flex flex-col items-center space-y-8">
                <div className="flex items-center space-x-2 px-4 py-2 bg-slate-900 dark:bg-slate-800 text-white rounded-full scale-110">
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-500"></span>
                  </span>
                  <span className="text-[10px] font-black uppercase tracking-[0.3em]">Global Intelligence Active</span>
                </div>
                
                <h1 className="text-5xl md:text-7xl font-black text-slate-950 dark:text-white tracking-tighter leading-[0.9]">
                  The world doesn't wait. <br /> Neither should you.
                </h1>
                
                <p className="text-xl text-slate-600 dark:text-slate-500 font-medium max-w-xl mx-auto leading-relaxed">
                  Join our exclusive network to access real-time global news, live sports scores, and AI-curated deep dives from around the planet.
                </p>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-4">
                  <button 
                    onClick={handleShowSignIn}
                    className="px-12 py-5 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-2xl font-black text-lg shadow-2xl shadow-blue-500/10 hover:scale-105 active:scale-95 transition-all"
                  >
                    Enter the Pulse
                  </button>
                  <p className="text-xs font-black uppercase tracking-widest text-slate-500 dark:text-slate-400">
                    Secure Google Authentication
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-5xl w-full pt-12 opacity-80">
                <div className="p-8 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] text-left space-y-3">
                  <div className="w-10 h-10 bg-blue-500/10 text-blue-600 dark:text-blue-400 rounded-xl flex items-center justify-center font-black">01</div>
                  <h4 className="font-black text-slate-950 dark:text-white">Live Scores</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Real-time match updates from every major league.</p>
                </div>
                <div className="p-8 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] text-left space-y-3">
                  <div className="w-10 h-10 bg-amber-500/10 text-amber-600 dark:text-amber-400 rounded-xl flex items-center justify-center font-black">02</div>
                  <h4 className="font-black text-slate-950 dark:text-white">World Radar</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">AI-powered tracking of global shifts and tech signals.</p>
                </div>
                <div className="p-8 bg-white dark:bg-slate-900/50 border border-slate-200 dark:border-slate-800 rounded-[2rem] text-left space-y-3">
                  <div className="w-10 h-10 bg-green-500/10 text-green-600 dark:text-green-400 rounded-xl flex items-center justify-center font-black">03</div>
                  <h4 className="font-black text-slate-950 dark:text-white">Personal feed</h4>
                  <p className="text-sm text-slate-600 dark:text-slate-400">Curated intelligence based on your specific passions.</p>
                </div>
              </div>
            </motion.div>
          ) : showInterestsPicker ? (
            <InterestsPicker 
              key="interests"
              onComplete={() => setShowInterestsPicker(false)}
            />
          ) : showSignIn ? (
            <SignIn 
              key="signin"
              onBack={() => setShowSignIn(false)}
              onSuccess={() => setShowSignIn(false)}
            />
          ) : selectedPost ? (
            <PostDetail 
              key="post-detail"
              post={selectedPost} 
              onBack={handleBackToFeed}
              onSignInRequired={handleShowSignIn}
            />
          ) : (
            <motion.div
              key="feed"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16"
            >
              {/* Featured Post (only if All category is active) */}
              {activeCategory === "All" && (
                <section className="mb-20">
                  <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="relative rounded-3xl overflow-hidden bg-slate-100 dark:bg-slate-900 aspect-[21/9] cursor-pointer group shadow-2xl shadow-slate-200 dark:shadow-blue-500/5"
                    onClick={() => handlePostClick(mockPosts[0])}
                  >
                    <img 
                      src={mockPosts[0].imageUrl} 
                      alt={mockPosts[0].title}
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      referrerPolicy="no-referrer"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-slate-900/80 via-slate-900/20 to-transparent" />
                    <div className="absolute bottom-0 left-0 p-8 md:p-12 w-full max-w-3xl">
                      <span className="px-3 py-1 text-xs font-bold bg-white text-slate-900 rounded-full mb-4 inline-block tracking-widest uppercase">
                        Featured
                      </span>
                      <h2 className="text-3xl md:text-5xl font-extrabold text-white mb-4 leading-tight">
                        {mockPosts[0].title}
                      </h2>
                      <p className="text-slate-100/90 text-lg line-clamp-2 md:line-clamp-none">
                        {mockPosts[0].summary}
                      </p>
                    </div>
                  </motion.div>
                </section>
              )}

              {/* Trending Section */}
              {activeCategory === "All" && (
                <div className="mb-24">
                  <TrendingNews />
                </div>
              )}

              {/* Live Category Feed for specific tabs */}
              {["Sports", "Tech", "News", "Entertainment"].includes(activeCategory) && (
                <div className="mb-24">
                  <LiveCategoryFeed category={activeCategory as Category} />
                </div>
              )}

              {/* Feed Grid header */}
              {["Sports", "Tech", "News", "Entertainment"].includes(activeCategory) && (
                <div className="flex items-center space-x-3 mb-12">
                  <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800" />
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Community Stories</span>
                  <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800" />
                </div>
              )}

              {/* Feed Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-12 gap-y-16">
                {filteredPosts.map((post) => (
                  <BlogCard 
                    key={post.id} 
                    post={post} 
                    onClick={handlePostClick}
                  />
                ))}
              </div>

              {filteredPosts.length === 0 && (
                <div className="py-20 text-center">
                  <p className="text-slate-500 dark:text-slate-400 text-lg">No articles found in this category yet.</p>
                  <button 
                    onClick={() => setActiveCategory("All")}
                    className="mt-4 text-slate-950 dark:text-white font-bold underline underline-offset-4"
                  >
                    Clear filters
                  </button>
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </main>

      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <ThemeProvider>
      <UserProvider>
        <MainContent />
      </UserProvider>
    </ThemeProvider>
  );
}

