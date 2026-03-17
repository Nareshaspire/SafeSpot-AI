import React from 'react';
import { motion } from 'motion/react';
import { Activity } from 'lucide-react';

const PPESection = () => {
  return (
    <section className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            className="relative"
          >
            <div className="aspect-square rounded-[40px] overflow-hidden border border-white/10 shadow-2xl">
              <img 
                src="https://picsum.photos/seed/tactical-gear/1000/1000" 
                alt="Industrial Safety Gear" 
                className="w-full h-full object-cover opacity-80"
                referrerPolicy="no-referrer"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-transparent to-transparent" />
            </div>
            {/* Overlay Widget */}
            <div className="absolute -bottom-6 -right-6 glass p-6 rounded-3xl border-white/10 shadow-2xl text-slate-900">
              <div className="flex items-center gap-3 mb-3">
                <div className="w-10 h-10 bg-emerald-100 rounded-xl flex items-center justify-center text-emerald-600">
                  <Activity size={20} />
                </div>
                <span className="font-bold">Vitals Sync</span>
              </div>
              <div className="space-y-2">
                <div className="h-1.5 w-32 bg-slate-100 rounded-full overflow-hidden">
                  <div className="h-full w-3/4 bg-emerald-500" />
                </div>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Hydration Level: Optimal</p>
              </div>
            </div>
          </motion.div>

          <div>
            <h2 className="font-display text-4xl font-bold mb-6 leading-tight">
              Beyond Software: <br />
              <span className="text-emerald-500">Smart PPE Integration</span>
            </h2>
            <p className="text-lg text-slate-400 mb-10 leading-relaxed">
              Safety isn't just about data—it's about the person on the ground. Aegis AI integrates directly with smart wearables and industrial gear to monitor environmental hazards and worker wellness in real-time.
            </p>
            
            <div className="grid sm:grid-cols-2 gap-6">
              {[
                { title: "Biometric Monitoring", desc: "Real-time fatigue and hydration tracking via wearable sensors." },
                { title: "Environmental Sensing", desc: "Detection of hazardous gases and extreme temperatures." },
                { title: "Gear Compliance", desc: "Computer vision verification of proper PPE usage." },
                { title: "Emergency Response", desc: "Instant SOS triggers based on fall detection or impact." }
              ].map((item, i) => (
                <div key={i} className="p-6 rounded-2xl bg-white/5 border border-white/10">
                  <h4 className="font-bold mb-2 text-emerald-400">{item.title}</h4>
                  <p className="text-sm text-slate-500">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PPESection;
