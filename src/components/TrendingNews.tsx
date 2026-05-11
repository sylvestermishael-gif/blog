import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "motion/react";
import { TrendingUp, Globe, MapPin, Loader2, ChevronRight, Activity, Zap, Compass } from "lucide-react";
import { GoogleGenAI } from "@google/genai";
import { extractAndParseJSON } from "../lib/aiUtils";

interface TrendingItem {
  id: string;
  title: string;
  source: string;
  time: string;
  url: string;
}

interface WorldRegion {
  title: string;
  source: string;
}

export default function TrendingNews() {
  const [location, setLocation] = useState<{ city: string; country: string } | null>(null);
  const [localTrending, setLocalTrending] = useState<TrendingItem[]>([]);
  const [globalTrending, setGlobalTrending] = useState<TrendingItem[]>([]);
  const [worldRadar, setWorldRadar] = useState<Record<string, WorldRegion[]>>({});
  const [activeRegion, setActiveRegion] = useState<string>("Africa");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const fetchTrending = async (city?: string, country?: string, retryCount = 0) => {
    setLoading(true);
    setError(null);
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      
      const prompt = `
        FAST DATA EXTRACTION MODE:
        Search for 5-8 major, breaking news stories from the last 24 hours.
        Target Location: ${city || "Global Markets"}, ${country || ""}
        
        REQUIRED: Tech, Entertainment, Sports, World Events.
        MANDATORY: Deep-link URLs to major news sites (CNN, Reuters, BBC, etc).
        
        FORMAT: Return ONLY a raw JSON object. NO code blocks.
        
        {
          "local": [{"id": "l1", "title": "...", "source": "...", "time": "...", "url": "..."}],
          "global": [{"id": "g1", "title": "...", "source": "...", "time": "...", "url": "..."}],
          "regions": {
            "Africa": [{"title": "...", "source": "..."}],
            "Europe": [{"title": "...", "source": "..."}],
            "Asia": [{"title": "...", "source": "..."}],
            "Americas": [{"title": "...", "source": "..."}]
          }
        }
      `;

      const response = await ai.models.generateContent({
        model: "gemini-2.0-flash",
        contents: prompt,
        config: {
          tools: [{ googleSearch: {} }],
          toolConfig: { includeServerSideToolInvocations: true }
        }
      });

      const data = extractAndParseJSON<{ local: any[]; global: any[]; regions: any }>(response.text);
      
      // Ensure IDs are unique if AI fails to provide them uniquely
      const mapItem = (item: any, type: string, idx: number) => ({
        ...item,
        id: item.id || `${type}-${idx}-${Date.now()}`
      });

      setLocalTrending((data.local || []).map((item, i) => mapItem(item, 'local', i)));
      setGlobalTrending((data.global || []).map((item, i) => mapItem(item, 'global', i)));
      setWorldRadar(data.regions || {});
    } catch (err) {
      console.error("Failed to fetch trending news:", err);
      if (retryCount < 1) {
        console.log("Retrying fetch with simplified parameters...");
        return fetchTrending(undefined, undefined, retryCount + 1);
      }
      setError("Radar signal lost. Global frequencies are unstable.");
    } finally {
      setLoading(false);
    }
  };

  const initRadar = () => {
    setLoading(true);
    setError(null);

    let locationFound = false;

    const useFallback = () => {
      if (locationFound) return;
      console.warn("Falling back to global radar...");
      fetchTrending();
    };

    if (!navigator.geolocation) {
      useFallback();
      return;
    }

    // Faster timeout: if location isn't found in 3s, start global fetch but keep listening
    const geoTimeout = setTimeout(() => {
      useFallback();
    }, 3000);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        clearTimeout(geoTimeout);
        locationFound = true;
        const { latitude, longitude } = position.coords;
        try {
          const res = await fetch(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${latitude}&lon=${longitude}`, {
            headers: { 'Accept-Language': 'en' },
            signal: AbortSignal.timeout(3000) // Don't hang on geocoding
          }).catch(() => null);
          
          if (!res || !res.ok) {
            fetchTrending();
            return;
          }
          
          const data = await res.json();
          const city = data?.address?.city || data?.address?.town || data?.address?.village || "major cities";
          const country = data?.address?.country || "nearby regions";
          setLocation({ city, country });
          fetchTrending(city, country);
        } catch (err) {
          fetchTrending(); 
        }
      },
      (err) => {
        clearTimeout(geoTimeout);
        fetchTrending();
      },
      { timeout: 4000, enableHighAccuracy: false }
    );
  };

  useEffect(() => {
    initRadar();
  }, []);

  return (
    <div className="space-y-16">
      {/* Live Header */}
      <div className="flex items-center space-x-3 mb-2">
        <div className="flex items-center space-x-1.5 px-3 py-1 bg-red-100 dark:bg-red-500/10 rounded-full border border-red-200 dark:border-red-500/20">
          <div className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse" />
          <span className="text-[10px] font-black uppercase tracking-widest text-red-600 dark:text-red-500">Live Global Pulse</span>
        </div>
        <div className="h-px flex-grow bg-slate-200 dark:bg-slate-800" />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
        {/* Left Column: Local & Global Lists */}
        <div className="lg:col-span-8 space-y-12">
          {/* Local Trends */}
          <section>
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center space-x-3">
                <div className="p-2.5 bg-slate-950 dark:bg-blue-600 rounded-2xl shadow-lg shadow-blue-500/10">
                  <MapPin className="w-5 h-5 text-white" />
                </div>
                <div>
                  <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">Around {location?.city || "Your Area"}</h3>
                  {location && <p className="text-xs text-slate-500 font-bold uppercase tracking-wider">{location.country}</p>}
                </div>
              </div>
              <TrendingUp className="w-5 h-5 text-slate-400 dark:text-slate-200" />
            </div>

            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map((i) => (
                  <div key={i} className="h-28 bg-slate-50 dark:bg-slate-900/50 rounded-3xl animate-pulse border border-slate-100 dark:border-slate-800" />
                ))}
              </div>
            ) : error && localTrending.length === 0 ? (
              <div className="p-12 bg-slate-50 dark:bg-slate-900 rounded-[2.5rem] border border-slate-100 dark:border-slate-800 text-center space-y-4">
                <div className="w-12 h-12 bg-slate-200 dark:bg-slate-800 rounded-2xl flex items-center justify-center mx-auto mb-4">
                  <Activity className="w-6 h-6 text-slate-400" />
                </div>
                <p className="text-slate-500 dark:text-slate-400 font-medium">{error}</p>
                <button 
                  onClick={() => {
                    console.log("Triggering manual radar sync...");
                    initRadar();
                  }} 
                  className="relative z-50 text-[10px] font-black uppercase tracking-widest text-slate-900 dark:text-white bg-white dark:bg-slate-950 hover:bg-slate-50 dark:hover:bg-slate-900 px-8 py-4 border border-slate-200 dark:border-slate-800 rounded-full shadow-lg active:scale-95 transition-all cursor-pointer"
                >
                  Attempt Sync
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <AnimatePresence>
                  {localTrending.map((item, idx) => (
                    <motion.a
                      key={item.id}
                      href={item.url === "#" ? undefined : item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                       initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: idx * 0.1 }}
                      className="group p-6 bg-white dark:bg-slate-900/40 border border-slate-100 dark:border-slate-800 rounded-[2rem] hover:border-blue-600 dark:hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-500/5 transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center space-x-2 mb-3">
                          <span className="text-[10px] font-black uppercase tracking-widest text-slate-400 dark:text-slate-500 bg-slate-50 dark:bg-slate-900 px-2 py-0.5 rounded-md">{item.source}</span>
                          <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{item.time}</span>
                        </div>
                        <h4 className="text-lg font-bold text-slate-950 dark:text-white leading-tight group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors line-clamp-3">
                          {item.title}
                        </h4>
                      </div>
                      <div className="flex items-center text-xs font-black text-slate-900 dark:text-white mt-6 group-hover:translate-x-1 transition-transform">
                        Explore Full Report <ChevronRight className="w-4 h-4 ml-1" />
                      </div>
                    </motion.a>
                  ))}
                </AnimatePresence>
              </div>
            )}
          </section>

          {/* Global Insights - Grid Version */}
          <section>
            <div className="flex items-center space-x-3 mb-8">
              <div className="p-2.5 bg-slate-100 dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800">
                <Globe className="w-5 h-5 text-slate-950 dark:text-white" />
              </div>
              <h3 className="text-2xl font-black text-slate-950 dark:text-white tracking-tight">The Global Dispatch</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {loading ? (
                 <div className="md:col-span-2 h-20 bg-slate-50 dark:bg-slate-900/50 rounded-3xl animate-pulse" />
              ) : error && globalTrending.length === 0 ? (
                <div className="md:col-span-2 text-slate-500 text-xs font-medium italic">Global signals blocked by local interference.</div>
              ) : globalTrending.map((item, idx) => (
                <motion.a
                  key={item.id}
                  href={item.url === "#" ? undefined : item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.3 + idx * 0.1 }}
                  className="flex items-start space-x-4 p-5 rounded-3xl hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors border border-transparent hover:border-slate-100 dark:hover:border-slate-800"
                >
                  <span className="text-slate-200 dark:text-slate-800 font-black text-3xl leading-none">0{idx + 1}</span>
                  <div>
                    <h4 className="font-bold text-slate-900 dark:text-white leading-snug mb-1 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                      {item.title}
                    </h4>
                    <div className="flex items-center space-x-2">
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-black uppercase tracking-widest">{item.source}</span>
                      <span className="w-1 h-1 rounded-full bg-slate-200 dark:bg-slate-800" />
                      <span className="text-[10px] text-slate-400 dark:text-slate-500 font-bold">{item.time}</span>
                    </div>
                  </div>
                </motion.a>
              ))}
            </div>
          </section>
        </div>

        {/* Right Column: World News Radar (Region Selector) */}
        <div className="lg:col-span-4">
          <div className="sticky top-32 space-y-8">
            <div className="p-8 bg-slate-950 dark:bg-slate-900 border border-slate-800 rounded-[2.5rem] text-white shadow-2xl shadow-slate-200 dark:shadow-blue-500/5">
              <div className="flex items-center space-x-3 mb-8">
                <Compass className="w-6 h-6 text-blue-400 animate-spin-slow" />
                <h3 className="text-xl font-black tracking-tight">World Radar</h3>
              </div>

              {/* Region Tabs */}
              <div className="flex flex-wrap gap-2 mb-8">
                {Object.keys(worldRadar).map((region) => (
                  <button
                    key={region}
                    onClick={() => setActiveRegion(region)}
                    className={`px-4 py-2 rounded-xl text-xs font-black uppercase tracking-widest transition-all ${
                      activeRegion === region 
                        ? "bg-white text-slate-950" 
                        : "text-slate-400 hover:text-white hover:bg-white/5"
                    }`}
                  >
                    {region}
                  </button>
                ))}
              </div>

              {/* Region Content */}
              <div className="space-y-6">
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeRegion}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="space-y-6"
                  >
                    {worldRadar[activeRegion]?.map((item, idx) => (
                      <div
                        key={`${activeRegion}-${idx}`}
                        className="group block space-y-2 border-b border-white/10 pb-6 last:border-0 last:pb-0"
                      >
                        <span className="text-[10px] font-black text-blue-400 uppercase tracking-widest">{item.source}</span>
                        <h4 className="text-sm font-bold text-white group-hover:text-blue-300 transition-colors leading-relaxed">
                          {item.title}
                        </h4>
                      </div>
                    )) || (
                      <div className="text-white/20 text-xs font-medium py-12 text-center italic">
                        Scanning world frequencies...
                      </div>
                    )}
                  </motion.div>
                </AnimatePresence>
              </div>

              <div className="mt-10 pt-6 border-t border-white/10">
                <div className="flex items-center space-x-2 text-[10px] font-black uppercase tracking-widest text-slate-500">
                  <Activity className="w-3 h-3 text-green-500" />
                  <span>Real-time coverage active</span>
                </div>
              </div>
            </div>

            {/* AI Summary Sidebar */}
            <div className="p-8 bg-blue-50 dark:bg-blue-950/20 border border-blue-100 dark:border-blue-900/30 rounded-[2.5rem]">
              <div className="flex items-center space-x-3 mb-4">
                <Zap className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                <h4 className="font-black text-blue-900 dark:text-blue-200 tracking-tight">AI Briefing</h4>
              </div>
              <p className="text-sm text-blue-800 dark:text-blue-100/60 leading-relaxed font-medium">
                Our global network is currently tracking high activity in <span className="font-black text-blue-600 dark:text-blue-400">{activeRegion}</span>. Digital trends are shifting towards human-centric AI and sustainable architecture updates.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
