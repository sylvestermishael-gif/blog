import { Menu, Search, X, LogOut, User as UserIcon, Settings, Sun, Moon } from "lucide-react";
import { useState } from "react";
import { motion } from "motion/react";
import { Category } from "../types";
import { useUser } from "../context/UserContext";
import { useTheme } from "../context/ThemeContext";

interface HeaderProps {
  activeCategory: Category | "All" | "For You";
  onCategoryChange: (category: Category | "All" | "For You") => void;
  onLogoClick: () => void;
  onSignInClick: () => void;
  onOpenPreferences: () => void;
}

export default function Header({ activeCategory, onCategoryChange, onLogoClick, onSignInClick, onOpenPreferences }: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { user, logout, interests } = useUser();
  const { theme, toggleTheme } = useTheme();
  
  const displayCategories: (Category | "All" | "For You")[] = ["All"];
  if (user && interests.length > 0) {
    displayCategories.push("For You");
  }
  displayCategories.push("Tech", "News", "Entertainment", "Sports", "Inspiration", "Interviews");

  return (
    <header className="sticky top-0 z-50 w-full bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-100 dark:border-slate-800 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div 
            className="flex-shrink-0 cursor-pointer flex items-center space-x-2"
            onClick={onLogoClick}
          >
            <div className="w-8 h-8 bg-slate-900 dark:bg-blue-600 rounded-sm flex items-center justify-center">
              <span className="text-white font-bold text-xl">N</span>
            </div>
            <span className="text-2xl font-bold tracking-tight text-slate-900 dark:text-white">Nexus</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex space-x-6">
            {displayCategories.map((cat) => (
              <button
                key={cat}
                onClick={() => onCategoryChange(cat)}
                className={`text-[13px] font-bold transition-all relative py-2 ${
                  activeCategory === cat ? "text-slate-900 dark:text-white" : "text-slate-500 hover:text-slate-700 dark:hover:text-slate-300"
                }`}
              >
                <span className="flex items-center space-x-1.5">
                  <span>{cat}</span>
                  {["Sports", "Tech", "News", "Entertainment"].includes(cat) && (
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-red-500"></span>
                    </span>
                  )}
                </span>
                {activeCategory === cat && (
                  <motion.div 
                    layoutId="activeTab"
                    className="absolute -bottom-[25px] left-0 right-0 h-1 bg-blue-600 rounded-full"
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Actions */}
          <div className="flex items-center space-x-4">
            <button 
              onClick={toggleTheme}
              className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              title={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
            >
              {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
            </button>

            <button className="p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors">
              <Search className="w-5 h-5" />
            </button>
            
            {user ? (
              <div className="relative">
                <button 
                  onClick={() => setIsProfileOpen(!isProfileOpen)}
                  className="w-10 h-10 rounded-full bg-slate-900 overflow-hidden border border-slate-800 hover:border-blue-500 transition-colors"
                >
                  {user.photoURL ? (
                    <img src={user.photoURL} alt={user.displayName || "User"} className="w-full h-full object-cover" />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center">
                      <UserIcon className="w-5 h-5 text-slate-400" />
                    </div>
                  )}
                </button>
                
                {isProfileOpen && (
                  <div className="absolute right-0 mt-2 w-48 bg-white dark:bg-slate-900 rounded-xl shadow-2xl border border-slate-100 dark:border-slate-800 py-1 z-50 animate-in fade-in zoom-in-95 duration-100">
                    <div className="px-4 py-2 border-b border-slate-100 dark:border-slate-800">
                      <p className="text-sm font-bold text-slate-900 dark:text-white truncate">{user.displayName}</p>
                      <p className="text-xs text-slate-500 truncate">{user.email}</p>
                    </div>
                    <button 
                      onClick={() => {
                        onOpenPreferences();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white flex items-center space-x-2 transition-colors font-medium border-b border-slate-100 dark:border-slate-800"
                    >
                      <Settings className="w-4 h-4" />
                      <span>Preferences</span>
                    </button>
                    <button 
                      onClick={() => {
                        logout();
                        setIsProfileOpen(false);
                      }}
                      className="w-full text-left px-4 py-2 text-sm text-slate-600 dark:text-slate-400 hover:bg-slate-50 dark:hover:bg-slate-800 hover:text-slate-900 dark:hover:text-white flex items-center space-x-2 transition-colors font-medium"
                    >
                      <LogOut className="w-4 h-4" />
                      <span>Sign Out</span>
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <button 
                onClick={onSignInClick}
                className="hidden md:block px-6 py-2.5 bg-slate-900 dark:bg-blue-600 text-white text-sm font-medium rounded-full hover:bg-slate-800 dark:hover:bg-blue-500 transition-all shadow-lg dark:shadow-blue-500/20"
              >
                Sign In
              </button>
            )}

            <button 
              className="md:hidden p-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMobileMenuOpen && (
        <div className="md:hidden bg-white dark:bg-slate-950 border-t border-slate-100 dark:border-slate-800 py-6 animate-in fade-in slide-in-from-top-4 duration-200 shadow-xl">
          <div className="px-4 space-y-6">
            <div className="flex items-center justify-between px-2">
              <span className="text-xs font-black uppercase tracking-widest text-slate-400">Theme</span>
              <button 
                onClick={toggleTheme}
                className="p-3 bg-slate-100 dark:bg-slate-900 rounded-xl text-slate-900 dark:text-white"
              >
                {theme === 'light' ? <Moon className="w-5 h-5" /> : <Sun className="w-5 h-5" />}
              </button>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {displayCategories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onCategoryChange(cat);
                    setIsMobileMenuOpen(false);
                  }}
                  className={`text-left py-2 text-base font-bold ${
                    activeCategory === cat ? "text-slate-900 dark:text-white underline underline-offset-4" : "text-slate-500"
                  }`}
                >
                  <span className="flex items-center space-x-2">
                    <span>{cat}</span>
                    {["Sports", "Tech", "News", "Entertainment"].includes(cat) && (
                      <span className="flex items-center space-x-1 px-1.5 py-0.5 bg-red-50 dark:bg-red-500/10 rounded-sm border border-red-100 dark:border-red-500/20">
                        <span className="w-1 h-1 bg-red-500 rounded-full animate-pulse"></span>
                        <span className="text-[8px] font-black text-red-500 uppercase tracking-tighter">Live</span>
                      </span>
                    )}
                  </span>
                </button>
              ))}
            </div>
            
            {!user ? (
              <button 
                onClick={() => {
                  onSignInClick();
                  setIsMobileMenuOpen(false);
                }}
                className="w-full px-5 py-4 bg-slate-900 dark:bg-white text-white dark:text-slate-950 text-base font-bold rounded-2xl hover:bg-slate-800 dark:hover:bg-slate-100 transition-all shadow-lg dark:shadow-blue-500/10"
              >
                Sign In With Google
              </button>
            ) : (
              <div className="pt-4 border-t border-slate-100 dark:border-slate-800">
                <div className="flex items-center space-x-4 mb-6">
                  <div className="w-12 h-12 rounded-full overflow-hidden border border-slate-200 dark:border-slate-800">
                    <img src={user.photoURL || ""} alt={user.displayName || ""} className="w-full h-full object-cover" />
                  </div>
                  <div>
                    <p className="font-bold text-slate-900 dark:text-white">{user.displayName}</p>
                    <p className="text-sm text-slate-500">{user.email}</p>
                  </div>
                </div>
                <div className="space-y-3">
                  <button 
                    onClick={() => {
                      onOpenPreferences();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-900 dark:text-white text-base font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
                  >
                    <Settings className="w-5 h-5" />
                    <span>My Feed Preferences</span>
                  </button>
                  <button 
                    onClick={() => {
                      logout();
                      setIsMobileMenuOpen(false);
                    }}
                    className="w-full px-5 py-4 bg-slate-100 dark:bg-slate-900 border border-slate-200 dark:border-slate-800 text-slate-500 text-base font-bold rounded-2xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-all flex items-center justify-center space-x-2"
                  >
                    <LogOut className="w-5 h-5" />
                    <span>Sign Out</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
}
