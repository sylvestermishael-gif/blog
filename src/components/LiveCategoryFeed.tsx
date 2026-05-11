import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { Zap, ExternalLink, Loader2, Sparkles, Trophy, Cpu, Film, Newspaper } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { Category } from "../types";
import { extractAndParseJSON } from "../lib/aiUtils";

interface LivePost {
  id: string;
  title: string;
  summary: string;
  source: string;
  url: string;
  time: string;
  category: string;
  isScore?: boolean;
  homeTeam?: string;
  awayTeam?: string;
  score?: string;
  status?: string;
}

interface LiveCategoryFeedProps {
  category: Category;
}

const CATEGORY_ICONS = {
  Sports: <Trophy className="w-5 h-5 text-amber-400" />,
  Tech: <Cpu className="w-5 h-5 text-blue-400" />,
  Entertainment: <Film className="w-5 h-5 text-purple-400" />,
  News: <Newspaper className="w-5 h-5 text-slate-400" />,
  Inspiration: <Sparkles className="w-5 h-5" />,
  Interviews: <Sparkles className="w-5 h-5" />,
  Career: <Sparkles className="w-5 h-5" />,
  Tutorials: <Sparkles className="w-5 h-5" />,
};

export default function LiveCategoryFeed({ category }: LiveCategoryFeedProps) {
  const [posts, setPosts] = useState<LivePost[]>([]);
  const [scores, setScores] = useState<LivePost[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLiveNews = async (retryCount = 0) => {
      setLoading(true);
      setError(null);

      const apiKey = process.env.GEMINI_API_KEY;
      if (!apiKey) {
        setError("Bandwidth restricted. AI frequencies unavailable. Please add GEMINI_API_KEY to your Secrets.");
        setLoading(false);
        return;
      }

      try {
        const ai = new GoogleGenAI({ apiKey });
        const currentDate = new Date().toLocaleDateString();
        
        const prompt = category === "Sports" 
          ? `FAST MODE: Find today's football match scores (date: ${currentDate}). 
             Include major leagues. Also find 4-5 major sports news stories.
             MANDATORY: Return valid URLs. No "#".
             JSON Format: {
               "scores": [{"homeTeam": "...", "awayTeam": "...", "score": "...", "status": "LIVE/FT/Upcoming", "source": "..."}],
               "posts": [{"title": "...", "summary": "...", "source": "...", "url": "...", "time": "..."}]
             }`
          : `FAST MODE: Search 8 recent stories for "${category}". 
             MANDATORY: Return valid URLs. No "#".
             JSON Format: {"posts": [{"title": "...", "summary": "...", "source": "...", "url": "...", "time": "..."}]}`;

        const response = await ai.models.generateContent({
          model: "gemini-2.0-flash",
          contents: prompt,
          config: {
            tools: [{ googleSearch: {} }],
            toolConfig: { includeServerSideToolInvocations: true }
          }
        });

        const data = extractAndParseJSON<{ posts: any[]; scores?: any[] }>(response.text);
        
        const validPosts = (data.posts || []).filter((p: any) => p.title && p.summary);
        
        setPosts(validPosts);
        setScores(data.scores || []);
        
        if (validPosts.length === 0 && (!data.scores || data.scores.length === 0)) {
           setError("Signals are faint at this frequency. Checking other bands.");
        }
      } catch (err) {
        console.error("Failed to fetch live category news:", err);
        if (retryCount < 1) {
          console.log("Retrying fetch...");
          return fetchLiveNews(retryCount + 1);
        }
        setError("World radar offline. Signal lost in space.");
      } finally {
        setLoading(false);
      }
    };

    fetchLiveNews();
  }, [category]);

  const ScoreCard = ({ match }: { match: LivePost }) => (
    <>
      <div className="flex justify-between items-center mb-4">
        <span className="text-[9px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">{match.source || "Global Match"}</span>
        <div className="flex items-center space-x-1.5">
          {match.status === "LIVE" && <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />}
          <span className={`text-[10px] font-black uppercase tracking-widest ${match.status === "LIVE" ? "text-red-500" : "text-slate-400"}`}>
            {match.status}
          </span>
        </div>
      </div>
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1 text-center">
          <p className="text-slate-950 dark:text-white font-black text-sm line-clamp-1">{match.homeTeam}</p>
        </div>
        <div className="bg-slate-50 dark:bg-slate-800 px-3 py-1.5 rounded-xl border border-slate-100 dark:border-slate-700 min-w-[60px] text-center">
          <p className="text-xl font-black text-slate-950 dark:text-white tabular-nums tracking-tighter">
            {match.score && match.score !== "" ? match.score : "vs"}
          </p>
        </div>
        <div className="flex-1 text-center">
          <p className="text-slate-950 dark:text-white font-black text-sm line-clamp-1">{match.awayTeam}</p>
        </div>
      </div>
    </>
  );

  if (loading) {
    return (
      <div className="py-24 flex flex-col items-center justify-center space-y-6">
        <div className="relative">
          <Loader2 className="w-10 h-10 text-slate-900 dark:text-white animate-spin" />
          <div className="absolute inset-0 bg-black/5 blur-xl dark:bg-black/50 dark:blur-xl rounded-full" />
        </div>
        <p className="text-xs font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500 animate-pulse">Syncing Global Waves</p>
      </div>
    );
  }

  if (error && posts.length === 0 && scores.length === 0) {
    return (
      <div className="py-12 px-8 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center space-y-4">
        <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
          <Zap className="w-6 h-6 text-slate-400" />
        </div>
        <p className="text-slate-500 dark:text-slate-400 font-medium">{error}</p>
        <button 
          onClick={() => window.location.reload()} 
          className="text-xs font-black uppercase tracking-widest text-slate-900 dark:text-white bg-white dark:bg-slate-950 hover:bg-slate-50 px-8 py-3 border border-slate-200 dark:border-slate-800 rounded-full shadow-sm active:scale-95 transition-all cursor-pointer"
        >
          Re-calibrate Radar
        </button>
      </div>
    );
  }

  return (
    <div className="space-y-12">
      {/* Dynamic Header */}
      <div className="flex flex-col md:flex-row md:items-end justify-between space-y-6 md:space-y-0">
        <div className="flex items-center space-x-5">
          <div className="p-4 bg-slate-950 dark:bg-blue-600 text-white rounded-[1.5rem] shadow-2xl shadow-blue-500/10 ring-8 ring-white dark:ring-slate-900 transition-all">
            {CATEGORY_ICONS[category as keyof typeof CATEGORY_ICONS] || <Zap className="w-6 h-6" />}
          </div>
          <div>
            <div className="flex items-center space-x-2 mb-1">
              <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse shadow-[0_0_12px_rgba(34,197,94,0.6)]" />
              <span className="text-[10px] font-black uppercase tracking-[0.2em] text-slate-400 dark:text-slate-500">Broadcasting Live</span>
            </div>
            <h3 className="text-4xl font-black text-slate-950 dark:text-white tracking-tight leading-none">{category === 'Sports' ? 'Match Center' : `Live ${category}`}</h3>
          </div>
        </div>
        {category === "Sports" && scores.length > 0 && (
          <p className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500">Tracking {scores.length} matches globally</p>
        )}
      </div>

    {/* Special Sports Scoreboard */}
    {category === "Sports" && scores.length > 0 && (
      <section className="relative">
        <div className="flex items-center space-x-3 mb-6">
          <div className="h-px flex-grow bg-slate-100 dark:bg-slate-800" />
          <h4 className="text-[11px] font-black uppercase tracking-[0.3em] text-slate-400 dark:text-slate-500">Live Coverage Hub</h4>
          <div className="h-px flex-grow bg-slate-100 dark:bg-slate-800" />
        </div>
          <div className="flex overflow-x-auto pb-6 space-x-4 no-scrollbar -mx-4 px-4 mask-fade-edges">
            {scores.map((match, idx) => (
              <motion.div 
                key={idx}
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                className="bg-white dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-5 rounded-3xl min-w-[280px] flex flex-col justify-between shadow-xl shadow-slate-100 dark:shadow-none transition-colors"
              >
                <ScoreCard match={match} />
              </motion.div>
            ))}
          </div>
        </section>
      )}

      {/* Main Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 relative">
        <AnimatePresence mode="popLayout">
          {posts.map((post, idx) => (
            <motion.a
              key={post.title}
              href={post.url && post.url !== "#" ? post.url : undefined}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.1, duration: 0.6, ease: [0.23, 1, 0.32, 1] }}
              className="group flex flex-col p-10 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-[2.5rem] hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-[0_40px_80px_-20px_rgba(59,130,246,0.1)] transition-all duration-500"
            >
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-3">
                  <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 px-3 py-1.5 rounded-full">
                    {post.source}
                  </span>
                  <div className="w-1 h-1 bg-slate-200 dark:bg-slate-800 rounded-full" />
                  <span className="text-[10px] font-black text-slate-400 dark:text-slate-500 uppercase tracking-widest">{post.time}</span>
                </div>
                <div className="w-10 h-10 rounded-full bg-slate-50 dark:bg-slate-900 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-500 -translate-x-4 group-hover:translate-x-0 border border-slate-100 dark:border-slate-800">
                  <ExternalLink className="w-4 h-4 text-slate-900 dark:text-white" />
                </div>
              </div>

              <h4 className="text-2xl font-black text-slate-950 dark:text-white leading-[1.1] mb-4 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                {post.title}
              </h4>
              
              <p className="text-slate-600 dark:text-slate-400 text-base leading-relaxed mb-10 flex-grow line-clamp-3 font-medium opacity-80 group-hover:opacity-100 transition-opacity">
                {post.summary}
              </p>

              <div className="flex items-center text-xs font-black text-slate-950 dark:text-white space-x-2 pt-6 border-t border-slate-100 dark:border-slate-800 group-hover:border-slate-200 dark:group-hover:border-slate-700 transition-colors">
                <span className="uppercase tracking-widest">Full Coverage</span>
                <div className="w-0 group-hover:w-6 h-px bg-slate-950 dark:bg-white transition-all duration-500" />
                <Zap className="w-3.5 h-3.5 text-amber-500 fill-amber-500" />
              </div>
            </motion.a>
          ))}
        </AnimatePresence>
      </div>

      {/* Visual Break / Newsletter */}
      <div className="p-10 md:p-16 bg-slate-900 dark:bg-slate-950 rounded-[4rem] text-white overflow-hidden relative shadow-2xl group transition-colors">
        <div className="relative z-10 grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <div className="inline-flex items-center space-x-2 px-3 py-1 bg-blue-500/20 border border-blue-500/30 rounded-full">
              <Sparkles className="w-3.5 h-3.5 text-blue-400" />
              <span className="text-[10px] font-black uppercase tracking-widest text-blue-400">Global Nexus Pulse</span>
            </div>
            <h4 className="text-4xl md:text-5xl font-black tracking-tighter leading-[0.9] italic italic-none">
              Stay ahead of <br /> the global shift.
            </h4>
            <p className="text-slate-300 dark:text-slate-400 text-lg font-medium max-w-md">
              Our autonomous network continues to monitor thousands of channels for major {category} signals.
            </p>
          </div>
          <div className="flex flex-col space-y-4">
            <div className="relative group/input">
              <input 
                type="email" 
                placeholder="Secure frequency (email)" 
                className="w-full bg-white/10 dark:bg-white/5 border border-white/20 dark:border-white/10 rounded-2xl py-5 px-8 text-white focus:outline-none focus:border-blue-500 transition-all font-bold placeholder:text-slate-500 dark:placeholder:text-slate-600"
              />
              <button className="absolute right-3 top-3 bottom-3 px-6 bg-white text-slate-950 rounded-xl font-black text-xs hover:bg-blue-50 dark:hover:bg-blue-50 transition-all active:scale-95">
                Join Pulse
              </button>
            </div>
            <p className="text-[10px] text-slate-400 dark:text-slate-600 font-bold uppercase tracking-widest text-center lg:text-left">
              Encrypted delivery. Zero noise. 100% Signal.
            </p>
          </div>
        </div>
        
        {/* Dynamic Background Elements */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-blue-500/20 blur-[120px] rounded-full -mr-32 -mt-32 transition-transform duration-1000 group-hover:scale-125" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-purple-500/10 blur-[100px] rounded-full -ml-20 -mb-20" />
      </div>
    </div>
  );
}
