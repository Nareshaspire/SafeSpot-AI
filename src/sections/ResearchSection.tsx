import { BookOpen } from 'lucide-react';

const ResearchSection = () => {
  return (
    <section id="research" className="py-24 bg-emerald-50 dark:bg-emerald-950/20 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row gap-16 items-center">
        <div className="lg:w-1/2">
          <div className="w-16 h-16 bg-white dark:bg-slate-900 rounded-2xl shadow-md flex items-center justify-center text-emerald-600 dark:text-emerald-400 mb-8">
            <BookOpen size={32} />
          </div>
          <h2 className="font-display text-4xl font-bold mb-6 dark:text-white">IEEE Standardized AI Frameworks</h2>
          <p className="text-lg text-slate-600 dark:text-slate-400 leading-relaxed mb-8">
            Our methodology is rooted in the latest IEEE research on AI ethics and safety. We implement <strong>IEEE 7000™</strong> standards to ensure transparency, accountability, and ethical alignment in every health and safety application we build.
          </p>
          <div className="grid grid-cols-2 gap-6">
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-transparent dark:border-slate-800">
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">IEEE 7001</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">Transparency of Autonomous Systems</p>
            </div>
            <div className="p-4 bg-white dark:bg-slate-900 rounded-xl shadow-sm border border-transparent dark:border-slate-800">
              <h5 className="font-bold text-slate-900 dark:text-white mb-1">IEEE 2846</h5>
              <p className="text-xs text-slate-500 dark:text-slate-400">Assumptions in Safety-Related Models</p>
            </div>
          </div>
        </div>
        <div className="lg:w-1/2 grid grid-cols-2 gap-4">
          <div className="space-y-4">
            <div className="h-48 rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&q=80&w=500" alt="AI-powered cybersecurity monitoring dashboard" className="w-full h-full object-cover opacity-90 dark:opacity-70" referrerPolicy="no-referrer" />
            </div>
            <div className="h-64 rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1485827404703-89b55fcc595e?auto=format&fit=crop&q=80&w=500" alt="Humanoid robot representing AI safety research" className="w-full h-full object-cover opacity-90 dark:opacity-70" referrerPolicy="no-referrer" />
            </div>
          </div>
          <div className="space-y-4 pt-8">
            <div className="h-64 rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1531297484001-80022131f5a1?auto=format&fit=crop&q=80&w=500" alt="Technology workspace with data visualization" className="w-full h-full object-cover opacity-90 dark:opacity-70" referrerPolicy="no-referrer" />
            </div>
            <div className="h-48 rounded-2xl overflow-hidden shadow-lg">
              <img src="https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80&w=500" alt="Circuit board representing ethical AI frameworks" className="w-full h-full object-cover opacity-90 dark:opacity-70" referrerPolicy="no-referrer" />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ResearchSection;
