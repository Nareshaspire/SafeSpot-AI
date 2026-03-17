import React from 'react';

const Lifecycle = () => {
  const steps = [
    { title: "Discovery", desc: "Identifying safety gaps and AI opportunities through deep industry analysis." },
    { title: "Architecture", desc: "Designing robust, scalable AI systems based on IEEE research standards." },
    { title: "Integration", desc: "Seamlessly embedding AI models into your existing H&S applications." },
    { title: "Deployment", desc: "Controlled rollouts with real-time performance monitoring and feedback." },
    { title: "Evolution", desc: "Continuous learning and model refinement to adapt to new safety challenges." }
  ];

  return (
    <section id="ai-lifecycle" className="py-24 bg-slate-900 text-white overflow-hidden">
      <div className="max-w-7xl mx-auto px-6 relative">
        <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl" />
        
        <div className="mb-16">
          <h2 className="font-display text-4xl font-bold mb-4">Full-Lifecycle AI Integration</h2>
          <p className="text-slate-400 max-w-2xl">We don't just build apps; we engineer intelligent ecosystems that grow with your organization.</p>
        </div>

        <div className="relative">
          <div className="hidden lg:block absolute top-1/2 left-0 right-0 h-0.5 bg-slate-800 -translate-y-1/2 z-0" />
          
          <div className="grid lg:grid-cols-5 gap-8 relative z-10">
            {steps.map((step, i) => (
              <div key={i} className="group">
                <div className="w-12 h-12 rounded-full bg-slate-800 border-2 border-slate-700 flex items-center justify-center font-bold text-xl mb-6 group-hover:bg-emerald-600 group-hover:border-emerald-500 transition-all">
                  {i + 1}
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-emerald-400 transition-colors">{step.title}</h4>
                <p className="text-sm text-slate-400 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Lifecycle;
