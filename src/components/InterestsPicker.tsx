import { useState } from "react";
import { motion } from "motion/react";
import { Check, Sparkles, ArrowRight } from "lucide-react";
import { Category } from "../types";
import { useUser } from "../context/UserContext";

interface InterestsPickerProps {
  onComplete: () => void;
  key?: string;
}

const CATEGORIES: { id: Category; label: string; description: string; emoji: string }[] = [
  { id: "Tech", label: "Technology", description: "Future tech, gadgets, and silicon valley shifts.", emoji: "💻" },
  { id: "News", label: "World News", description: "Stay updated with global events and shifts.", emoji: "🌍" },
  { id: "Entertainment", label: "Entertainment", description: "Movies, music, and the digital culture.", emoji: "🎬" },
  { id: "Sports", label: "Sports", description: "Scores, stories, and the heart of competition.", emoji: "🏀" },
  { id: "Inspiration", label: "Inspiration", description: "Design trends, creative sparks, and big ideas.", emoji: "✨" },
  { id: "Interviews", label: "Interviews", description: "Insights from industry leading experts.", emoji: "🎙️" },
  { id: "Career", label: "Career", description: "Guides for growth and professional success.", emoji: "🚀" },
  { id: "Tutorials", label: "Tutorials", description: "Deep dives into tools and technical mastery.", emoji: "📚" },
];

export default function InterestsPicker({ onComplete }: InterestsPickerProps) {
  const { updateInterests, interests: existingInterests, logout: userLogout } = useUser();
  const [selected, setSelected] = useState<Category[]>(existingInterests as Category[]);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const toggleInterest = (category: Category) => {
    setSelected(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category) 
        : [...prev, category]
    );
  };

  const handleSave = async () => {
    if (selected.length === 0) return;
    setSaving(true);
    setError(null);
    try {
      await updateInterests(selected);
      onComplete();
    } catch (err: any) {
      console.error("Failed to save interests:", err);
      if (err.message?.includes("permissions")) {
        setError("Account sync in progress. Please wait 10 seconds and try again.");
      } else {
        setError("Network signal weak. Please check your connection.");
      }
    } finally {
      setSaving(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[110] bg-white dark:bg-slate-950 flex flex-col overflow-y-auto"
    >
      <div className="max-w-5xl mx-auto w-full px-6 py-12 md:py-24 flex-grow flex flex-col">
        <div className="text-center space-y-4 mb-16">
          <motion.div 
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="w-16 h-16 bg-slate-950 dark:bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white"
          >
            <Sparkles className="w-8 h-8" />
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-5xl font-extrabold text-slate-950 dark:text-white tracking-tight"
          >
            Personalize your experience
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-slate-500 dark:text-slate-400 text-lg max-w-xl mx-auto"
          >
            Select the topics you're passionate about. We'll curate your feed with the stories that matter most to you.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 flex-grow">
          {CATEGORIES.map((cat, idx) => (
            <motion.button
              key={cat.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + idx * 0.05 }}
              onClick={() => toggleInterest(cat.id)}
              className={`p-6 rounded-3xl border-2 text-left transition-all relative group ${
                selected.includes(cat.id) 
                  ? "border-slate-950 dark:border-blue-500 bg-slate-50 dark:bg-blue-500/5 ring-4 ring-slate-200 dark:ring-blue-500/10" 
                  : "border-slate-100 dark:border-slate-800 bg-white dark:bg-slate-900/50 hover:border-slate-300 dark:hover:border-slate-700"
              }`}
            >
              <div className="text-3xl mb-4">{cat.emoji}</div>
              <h3 className={`font-bold mb-1 ${selected.includes(cat.id) ? 'text-slate-950 dark:text-white' : 'text-slate-950 dark:text-white'}`}>{cat.label}</h3>
              <p className="text-xs text-slate-500 dark:text-slate-400 leading-relaxed">{cat.description}</p>
              
              {selected.includes(cat.id) && (
                <div className="absolute top-4 right-4 w-6 h-6 bg-slate-950 dark:bg-blue-500 rounded-full flex items-center justify-center text-white">
                  <Check className="w-4 h-4" />
                </div>
              )}
            </motion.button>
          ))}
        </div>

        <div className="mt-16 flex flex-col items-center space-y-6">
          {error && (
            <p className="text-red-500 text-sm font-black uppercase tracking-widest animate-pulse">
              {error}
            </p>
          )}
          <button
            onClick={handleSave}
            disabled={selected.length === 0 || saving}
            className={`flex items-center space-x-3 px-12 py-5 rounded-2xl font-extrabold transition-all shadow-xl ${
              selected.length > 0 
                ? "bg-slate-950 dark:bg-white text-white dark:text-slate-950 shadow-slate-200 dark:shadow-blue-500/10 hover:opacity-90 translate-y-0" 
                : "bg-slate-100 dark:bg-slate-800 text-slate-400 dark:text-slate-500 cursor-not-allowed translate-y-0"
            }`}
          >
            {saving ? (
              <span>Crafting your feed...</span>
            ) : (
              <>
                <span>Save Preferences</span>
                <ArrowRight className="w-5 h-5" />
              </>
            )}
          </button>
          <div className="flex items-center space-x-6 pt-4">
            <button 
              onClick={userLogout}
              className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest hover:text-slate-900 dark:hover:text-white transition-colors"
            >
              Sign Out
            </button>
            <div className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
            <p className="text-slate-400 dark:text-slate-500 text-xs font-black uppercase tracking-widest">
              Secure Intelligence Feed
            </p>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
