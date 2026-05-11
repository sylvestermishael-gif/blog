import { Github, Instagram, Twitter, Send } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 pt-20 pb-10 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-slate-950 dark:bg-blue-600 rounded-sm flex items-center justify-center">
                <span className="text-white font-bold text-xl">N</span>
              </div>
              <span className="text-2xl font-bold tracking-tight text-slate-950 dark:text-white">Nexus</span>
            </div>
            <p className="text-slate-600 dark:text-slate-400 max-w-sm leading-relaxed">
              Nexus is a design-focused publication exploring the stories behind beautiful products and the people who build them.
            </p>
            <div className="flex items-center space-x-6">
              <a href="#" className="text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="text-slate-400 hover:text-slate-950 dark:hover:text-white transition-colors">
                <Github className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-950 dark:text-white mb-6">Categories</h4>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm">
              <li><a href="#" className="hover:text-slate-950 dark:hover:text-white transition-colors">Inspiration</a></li>
              <li><a href="#" className="hover:text-slate-950 dark:hover:text-white transition-colors">Interviews</a></li>
              <li><a href="#" className="hover:text-slate-950 dark:hover:text-white transition-colors">Career</a></li>
              <li><a href="#" className="hover:text-slate-950 dark:hover:text-white transition-colors">Tutorials</a></li>
            </ul>
          </div>

          <div>
            <h4 className="text-sm font-bold uppercase tracking-widest text-slate-950 dark:text-white mb-6">Nexus</h4>
            <ul className="space-y-4 text-slate-600 dark:text-slate-400 text-sm">
              <li><a href="#" className="hover:text-slate-950 dark:hover:text-white transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-slate-950 dark:hover:text-white transition-colors">Contact</a></li>
              <li><a href="#" className="hover:text-slate-950 dark:hover:text-white transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-slate-950 dark:hover:text-white transition-colors">Terms of Service</a></li>
            </ul>
          </div>
        </div>

        <div className="pt-12 border-t border-slate-200 dark:border-slate-800">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between space-y-8 md:space-y-0">
            <div className="max-w-md w-full">
              <h4 className="text-sm font-bold uppercase tracking-widest text-slate-950 dark:text-white mb-4">Subscribe to our newsletter</h4>
              <div className="relative">
                <input 
                  type="email" 
                  placeholder="name@email.com" 
                  className="w-full bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-full py-3.5 px-6 outline-none focus:border-slate-400 dark:focus:border-white transition-all text-sm pr-12 text-slate-950 dark:text-white"
                />
                <button className="absolute right-1.5 top-1.5 p-2 bg-slate-950 dark:bg-white text-white dark:text-slate-950 rounded-full hover:bg-slate-800 dark:hover:bg-slate-200 transition-colors">
                  <Send className="w-4 h-4" />
                </button>
              </div>
            </div>
            <p className="text-slate-500 text-xs">
              © 2024 Nexus Design Blog. All rights reserved. Built with precision and care.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
