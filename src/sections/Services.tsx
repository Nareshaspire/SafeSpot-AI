import React from 'react';
import { motion } from 'motion/react';
import { Shield, Cpu, Layers, CheckCircle2 } from 'lucide-react';

const Services = () => {
  const services = [
    {
      icon: <Shield className="text-emerald-600" size={32} />,
      title: "H&S Applications",
      desc: "Custom-built health and safety software tailored for construction, manufacturing, and healthcare.",
      features: ["Incident Reporting", "Compliance Tracking", "Audit Automation"]
    },
    {
      icon: <Cpu className="text-indigo-600" size={32} />,
      title: "AI Implementation",
      desc: "Strategic integration of machine learning and computer vision into your existing workflows.",
      features: ["Computer Vision", "Predictive Analytics", "NLP Documentation"]
    },
    {
      icon: <Layers className="text-amber-600" size={32} />,
      title: "Lifecycle Management",
      desc: "End-to-end support from initial AI feasibility studies to long-term model maintenance.",
      features: ["Strategy & Design", "Deployment", "Optimization"]
    }
  ];

  return (
    <section id="services" className="py-24 bg-white">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="font-display text-4xl font-bold mb-4">Our Core Expertise</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">We bridge the gap between traditional safety protocols and cutting-edge artificial intelligence.</p>
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {services.map((s, i) => (
            <motion.div
              key={i}
              whileHover={{ 
                y: -12, 
                scale: 1.02,
                transition: { duration: 0.3, ease: "easeOut" }
              }}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="p-8 rounded-[32px] bg-slate-50 border border-slate-100 hover:border-emerald-200 hover:bg-white hover:shadow-2xl hover:shadow-emerald-100/50 transition-all cursor-default group"
            >
              <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">{s.icon}</div>
              <h3 className="text-2xl font-bold mb-4 group-hover:text-emerald-600 transition-colors">{s.title}</h3>
              <p className="text-slate-600 mb-8 leading-relaxed">{s.desc}</p>
              <ul className="space-y-3">
                {s.features.map((f, fi) => (
                  <li key={fi} className="flex items-center gap-2 text-sm font-medium text-slate-700">
                    <CheckCircle2 size={16} className="text-emerald-500 group-hover:scale-125 transition-transform" />
                    {f}
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Services;
