import { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowLeft, AlertCircle } from "lucide-react";
import { useUser } from "../context/UserContext";

interface SignInProps {
  onBack: () => void;
  onSuccess: () => void;
  key?: string;
}

export default function SignIn({ onBack, onSuccess }: SignInProps) {
  const { signIn } = useUser();
  const [error, setError] = useState<string | null>(null);
  const [isSigningIn, setIsSigningIn] = useState(false);

  const handleSignIn = async () => {
    try {
      setError(null);
      setIsSigningIn(true);
      await signIn();
      onSuccess();
    } catch (err: any) {
      if (err.code === 'auth/unauthorized-domain') {
        setError("This domain is not authorized. Please add this URL to your Firebase Console 'Authorized Domains' settings.");
      } else {
        setError(err.message || "Sign in failed. Please try again.");
      }
      setIsSigningIn(false);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 z-[100] flex flex-col md:flex-row bg-white dark:bg-slate-950 overflow-hidden"
    >
      {/* Left side: Pure Brand Aesthetic */}
      <div className="hidden md:flex flex-1 bg-slate-950 p-16 flex-col justify-between relative overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-[-10%] left-[-10%] w-[60%] h-[60%] rounded-full bg-slate-400 blur-[120px]" />
          <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] rounded-full bg-slate-500 blur-[120px]" />
        </div>
        
        <motion.div 
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.2 }}
          className="relative z-10 flex items-center space-x-2 cursor-pointer"
          onClick={onBack}
        >
          <div className="w-8 h-8 bg-white rounded-sm flex items-center justify-center">
            <span className="text-slate-950 font-bold text-xl">N</span>
          </div>
          <span className="text-2xl font-bold tracking-tight text-white">Nexus</span>
        </motion.div>

        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-6xl font-extrabold text-white leading-tight tracking-tighter mb-8"
          >
            Where design <br />
            finds its <br />
            narrative.
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
            className="text-slate-400 text-xl max-w-sm leading-relaxed"
          >
            Join a global community of designers, architects, and creative minds sharing the stories that shape our world.
          </motion.p>
        </div>

        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          className="text-slate-500 text-sm font-medium"
        >
          © 2024 Nexus. Designed for the curious.
        </motion.div>
      </div>

      {/* Right side: Login Form */}
      <div className="flex-1 flex flex-col p-8 md:p-24 justify-center relative bg-white dark:bg-slate-950 transition-colors">
        <button 
          onClick={onBack}
          className="absolute top-8 left-8 md:top-12 md:left-12 flex items-center space-x-2 text-slate-500 hover:text-slate-900 dark:hover:text-white transition-colors group"
        >
          <ArrowLeft className="w-5 h-5 group-hover:-translate-x-1 transition-transform" />
          <span className="text-sm font-bold">Back</span>
        </button>

        <div className="max-w-md mx-auto w-full space-y-10">
          <div className="space-y-4">
            <h2 className="text-4xl font-extrabold text-slate-950 dark:text-white tracking-tight">Welcome to Nexus</h2>
            <p className="text-slate-500 dark:text-slate-400 text-lg">Sign in to follow creators, save your favorite stories, and join the conversation.</p>
          </div>

          <AnimatePresence>
            {error && (
              <motion.div 
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                className="p-4 bg-red-50 dark:bg-red-900/20 border border-red-100 dark:border-red-900/30 rounded-xl flex items-start space-x-3 text-red-600 dark:text-red-400 text-sm"
              >
                <AlertCircle className="w-5 h-5 shrink-0 mt-0.5" />
                <p>{error}</p>
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            whileHover={{ scale: isSigningIn ? 1 : 1.02 }}
            whileTap={{ scale: isSigningIn ? 1 : 0.98 }}
            disabled={isSigningIn}
            onClick={handleSignIn}
            className={`w-full flex items-center justify-center space-x-4 py-5 px-6 border-2 border-slate-100 dark:border-slate-800 rounded-2xl transition-all group shadow-sm dark:shadow-blue-500/5 text-slate-900 dark:text-white ${isSigningIn ? 'opacity-70 cursor-not-allowed bg-slate-50 dark:bg-slate-900' : 'hover:bg-slate-50 dark:hover:bg-slate-900'}`}
          >
            {isSigningIn ? (
              <div className="w-6 h-6 border-2 border-slate-300 border-t-slate-900 dark:border-slate-700 dark:border-t-white rounded-full animate-spin" />
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24">
                <path
                  fill="currentColor"
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                />
                <path
                  fill="currentColor"
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                />
                <path
                  fill="currentColor"
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l3.66-2.84z"
                />
                <path
                  fill="currentColor"
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                />
              </svg>
            )}
            <span className="text-lg font-bold">{isSigningIn ? 'Signing in...' : 'Sign in with Google'}</span>
          </motion.button>

          <p className="text-center text-slate-500 text-sm">
            By signing in, you agree to our <a href="#" className="text-slate-900 dark:text-white font-bold underline">Terms of Service</a> and <a href="#" className="text-slate-900 dark:text-white font-bold underline">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </motion.div>
  );
}
