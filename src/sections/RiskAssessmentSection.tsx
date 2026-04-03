import { AlertTriangle, Bell, Biohazard, CheckCircle, ChevronDown, ChevronRight, ChevronUp, FileText, Flame, FlaskConical, Info, Loader2, Mountain, RefreshCw, Send, ShieldAlert, Wind, X } from 'lucide-react';
import { AnimatePresence, motion } from 'motion/react';
import { useMemo, useState } from 'react';


const HazardIcon = ({ type, description }: { type: string, description: string }) => {
  const lowerType = type.toLowerCase();
  const lowerDesc = description.toLowerCase();

  if (lowerType.includes('fire') || lowerDesc.includes('fire') || lowerDesc.includes('flame')) {
    return (
      <motion.div
        animate={{ opacity: [0.7, 1, 0.7], scale: [0.95, 1.05, 0.95] }}
        transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
        className="text-orange-500"
      >
        <Flame size={20} />
      </motion.div>
    );
  }

  if (lowerType.includes('physical') || lowerDesc.includes('rockfall') || lowerDesc.includes('fall') || lowerDesc.includes('collapse')) {
    return (
      <motion.div
        animate={{ y: [0, 2, 0] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-slate-500"
      >
        <Mountain size={20} />
      </motion.div>
    );
  }

  if (lowerType.includes('atmospheric') || lowerDesc.includes('gas') || lowerDesc.includes('ventilation') || lowerDesc.includes('oxygen')) {
    return (
      <motion.div
        animate={{ x: [-1, 1, -1], opacity: [0.6, 0.9, 0.6] }}
        transition={{ repeat: Infinity, duration: 3, ease: "easeInOut" }}
        className="text-blue-400"
      >
        <Wind size={20} />
      </motion.div>
    );
  }

  if (lowerType.includes('biological') || lowerDesc.includes('infection') || lowerDesc.includes('virus') || lowerDesc.includes('pathogen')) {
    return (
      <motion.div
        animate={{ scale: [1, 1.1, 1] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-emerald-500"
      >
        <Biohazard size={20} />
      </motion.div>
    );
  }

  if (lowerType.includes('chemical') || lowerDesc.includes('toxic') || lowerDesc.includes('acid') || lowerDesc.includes('disinfectant')) {
    return (
      <motion.div
        animate={{ rotate: [-5, 5, -5] }}
        transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
        className="text-purple-500"
      >
        <FlaskConical size={20} />
      </motion.div>
    );
  }

  return (
    <motion.div
      animate={{ opacity: [0.8, 1, 0.8] }}
      transition={{ repeat: Infinity, duration: 2 }}
      className="text-amber-500"
    >
      <AlertTriangle size={20} />
    </motion.div>
  );
};

const RiskAssessmentSection = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [industry, setIndustry] = useState('mining');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);
  const [dismissedAlerts, setDismissedAlerts] = useState<number[]>([]);
  const [expandedHazardIndex, setExpandedHazardIndex] = useState<number | null>(null);
  const [isPPEChecklistExpanded, setIsPPEChecklistExpanded] = useState(false);
  const [checkedPPEItems, setCheckedPPEItems] = useState<string[]>([]);

  const togglePPEItem = (ppe: string) => {
    setCheckedPPEItems(prev => 
      prev.includes(ppe) ? prev.filter(item => item !== ppe) : [...prev, ppe]
    );
  };

  const highSeverityHazards = useMemo(() => {
    if (!report || !report.hazards) return [];
    return report.hazards.filter((h: any) => h.severity === 'High');
  }, [report]);

  const examples = [
    {
      industry: 'mining',
      title: 'Underground Drilling',
      description: 'Underground drilling at 500m depth in a high-moisture environment using heavy pneumatic machinery. Limited ventilation and potential for rock instability.',
      report: {
        summary: "High-risk operation requiring stringent controls for atmospheric safety and structural stability.",
        hazards: [
          { type: "Physical", description: "Rockfall or structural collapse due to instability at depth.", severity: "High", immediate_action: "Evacuate the immediate area and install primary structural supports before proceeding." },
          { type: "Atmospheric", description: "Accumulation of hazardous gases (methane, CO) and low oxygen levels.", severity: "High", immediate_action: "Activate emergency ventilation systems and monitor gas levels continuously." },
          { type: "Physical", description: "Hearing loss from high-decibel pneumatic machinery.", severity: "Medium" }
        ],
        mitigations: [
          "Implement continuous automated gas monitoring with real-time alerts.",
          "Install secondary structural supports (rock bolts/mesh) before drilling.",
          "Enforce strict 'two-person' rule and real-time location tracking."
        ],
        ppe_requirements: ["Self-contained self-rescuer (SCSR)", "Cap lamp", "Class 5 hearing protection", "Steel-toed metatarsal boots"],
        regulatory_notes: "Compliant with IEEE 2846 for autonomous machinery safety and MSHA underground standards."
      }
    },
    {
      industry: 'construction',
      title: 'High-Rise Scaffolding',
      description: 'Erecting external scaffolding on a 30-story commercial building. High wind exposure and proximity to active pedestrian walkways below.',
      report: {
        summary: "Critical safety operation focusing on fall prevention and public protection from falling objects.",
        hazards: [
          { type: "Physical", description: "Falls from height during assembly/disassembly.", severity: "High", immediate_action: "Ensure all workers are 100% tied off with dual-lanyard systems at all times." },
          { type: "Physical", description: "Falling objects impacting workers or pedestrians below.", severity: "High", immediate_action: "Establish a secure exclusion zone below the work area and install debris netting." },
          { type: "Environmental", description: "Structural failure of scaffolding due to high wind loads.", severity: "Medium" }
        ],
        mitigations: [
          "Install debris netting and catch platforms around the perimeter.",
          "Mandatory 100% tie-off policy with dual-lanyard systems.",
          "Daily pre-shift structural inspections by a competent person."
        ],
        ppe_requirements: ["Full-body harness with shock-absorbing lanyard", "Hard hat with chin strap", "High-visibility vest", "Tool tethers"],
        regulatory_notes: "Adheres to OSHA 1926 Subpart L and IEEE 7001 for ethical safety monitoring."
      }
    },
    {
      industry: 'healthcare',
      title: 'Biohazard Waste Handling',
      description: 'Daily collection and processing of Category A infectious biological waste in a high-volume clinical laboratory environment.',
      report: {
        summary: "Medium-to-high risk task requiring strict adherence to sterilization and containment protocols.",
        hazards: [
          { type: "Biological", description: "Accidental needle-stick injuries or sharps exposure.", severity: "High", immediate_action: "Immediately wash the affected area and report to the supervisor for post-exposure prophylaxis." },
          { type: "Biological", description: "Aerosolization of pathogens during waste compaction.", severity: "Medium" },
          { type: "Chemical", description: "Exposure to disinfectants and sterilization chemicals.", severity: "Low" }
        ],
        mitigations: [
          "Utilize puncture-resistant, leak-proof containers with automated sealing.",
          "Implement mandatory immunization programs for all handling staff.",
          "Establish a clear, immediate post-exposure prophylaxis (PEP) protocol."
        ],
        ppe_requirements: ["N95 respirator", "Double nitrile gloves", "Fluid-resistant gown", "Face shield"],
        regulatory_notes: "Compliant with CDC BMBL guidelines and IEEE 7000 for data privacy in health tracking."
      }
    }
  ];

  const loadExample = (example: any) => {
    setIndustry(example.industry);
    setTaskDescription(example.description);
    setReport(example.report);
    setDismissedAlerts([]);
    setCheckedPPEItems([]);
    setIsPPEChecklistExpanded(false);
    setError(null);
    window.scrollTo({ top: document.getElementById('risk-assessment')?.offsetTop, behavior: 'smooth' });
  };

  const generateAssessment = async () => {
    if (!taskDescription.trim()) return;

    setIsLoading(true);
    setError(null);
    setReport(null);
    setDismissedAlerts([]);
    setCheckedPPEItems([]);
    setIsPPEChecklistExpanded(false);

    try {
      const res = await fetch('/api/risk-assessment', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskDescription, industry }),
      });
      const result = await res.json();
      if (!res.ok) throw new Error(result.error || 'Request failed');
      setReport(result);
    } catch (err) {
      console.error("Risk Assessment Error:", err);
      setError("Failed to generate risk assessment. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="risk-assessment" className="py-24 bg-slate-50 dark:bg-slate-900/50 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 dark:bg-indigo-900/30 text-indigo-700 dark:text-indigo-400 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldAlert size={14} />
            <span>AI-Driven Intelligence</span>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4 text-slate-900 dark:text-white">Predictive Risk Assessment</h2>
          <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
            Leverage advanced AI to identify potential hazards and generate mitigation strategies based on industry standards and real-time analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Input Panel */}
          <div className="lg:col-span-2">
            <div className="glass p-8 rounded-[32px] shadow-xl border-white dark:border-slate-800 sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-slate-900 dark:text-white flex items-center gap-2">
                <FileText className="text-indigo-600 dark:text-indigo-400" size={24} />
                Assessment Parameters
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Industry Context</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900/30 outline-none transition-all appearance-none bg-white dark:bg-slate-800 dark:text-white"
                    value={industry}
                    onChange={(e) => setIndustry(e.target.value)}
                  >
                    <option value="mining">Mining & Extraction</option>
                    <option value="construction">Construction & Infrastructure</option>
                    <option value="logistics">Logistics & Warehousing</option>
                    <option value="healthcare">Healthcare & Clinical</option>
                    <option value="manufacturing">Manufacturing & Industrial</option>
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 dark:text-slate-300 ml-1">Task/Workplace Details</label>
                  <textarea 
                    rows={6}
                    placeholder="Describe the task, environment, and equipment involved (e.g., Underground drilling at 500m depth using heavy machinery...)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-800 dark:text-white focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 dark:focus:ring-indigo-900/30 outline-none transition-all resize-none text-sm leading-relaxed"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </div>

                <button 
                  onClick={generateAssessment}
                  disabled={isLoading || !taskDescription.trim()}
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 dark:shadow-none flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Analyzing Risks...</span>
                    </>
                  ) : (
                    <>
                      <Send size={20} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                      <span>Generate Report</span>
                    </>
                  )}
                </button>
              </div>

              <div className="mt-10 pt-8 border-t border-slate-100 dark:border-slate-800">
                <p className="text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-widest mb-4">Try an Example</p>
                <div className="grid grid-cols-1 gap-2">
                  {examples.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => loadExample(ex)}
                      className="text-left p-3 rounded-xl border border-slate-100 dark:border-slate-800 hover:border-indigo-200 dark:hover:border-indigo-900/50 hover:bg-indigo-50 dark:hover:bg-indigo-900/20 transition-all text-xs font-medium text-slate-600 dark:text-slate-400 flex items-center justify-between group"
                    >
                      {ex.title}
                      <ChevronRight size={14} className="opacity-0 group-hover:opacity-100 transition-opacity" />
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Results Panel */}
          <div className="lg:col-span-3">
            <AnimatePresence mode="wait">
              {isLoading ? (
                <motion.div 
                  key="loading"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-white/50 dark:bg-slate-900/50 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800"
                >
                  <div className="relative mb-8">
                    <div className="w-24 h-24 border-4 border-indigo-100 dark:border-indigo-900/30 rounded-full animate-pulse" />
                    <Loader2 size={48} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 dark:text-indigo-400 animate-spin" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Processing Intelligence</h4>
                  <p className="text-slate-500 dark:text-slate-400 max-w-xs">Our AI is cross-referencing safety standards and identifying potential hazards...</p>
                </motion.div>
              ) : report ? (
                <motion.div 
                  key="report"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* High Severity Alerts */}
                  <AnimatePresence>
                    {highSeverityHazards.map((hazard: any, i: number) => (
                      !dismissedAlerts.includes(i) && (
                        <motion.div
                          key={`alert-${i}`}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ 
                            opacity: 1, 
                            x: 0,
                            scale: [1, 1.005, 1],
                          }}
                          transition={{
                            scale: { repeat: Infinity, duration: 2, ease: "easeInOut" },
                            opacity: { duration: 0.5 },
                            x: { duration: 0.5 }
                          }}
                          exit={{ opacity: 0, scale: 0.95 }}
                          className="bg-red-600 text-white p-6 rounded-[32px] shadow-2xl shadow-red-500/40 dark:shadow-none relative overflow-hidden group"
                        >
                          {/* Pulsing glow background */}
                          <motion.div 
                            className="absolute inset-0 bg-white/10 pointer-events-none"
                            animate={{ opacity: [0, 0.3, 0] }}
                            transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                          />
                          <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Bell size={80} className="rotate-12" />
                          </div>
                          
                          <div className="flex items-start gap-4 relative z-10">
                            <div className="w-12 h-12 bg-white/20 rounded-2xl flex items-center justify-center shrink-0">
                              <HazardIcon type={hazard.type} description={hazard.description} />
                            </div>
                            <div className="flex-1">
                              <div className="flex items-center justify-between mb-2">
                                <motion.h5 
                                  animate={{ opacity: [1, 0.8, 1] }}
                                  transition={{ repeat: Infinity, duration: 1.5, ease: "easeInOut" }}
                                  className="font-bold text-lg uppercase tracking-wider flex items-center gap-2"
                                >
                                  <ShieldAlert size={20} className="shrink-0" />
                                  CRITICAL HAZARD DETECTED
                                </motion.h5>
                                <button 
                                  onClick={() => setDismissedAlerts(prev => [...prev, i])}
                                  className="p-1 hover:bg-white/20 rounded-lg transition-colors"
                                >
                                  <X size={20} />
                                </button>
                              </div>
                              <motion.p 
                                animate={{ opacity: [1, 0.85, 1] }}
                                transition={{ repeat: Infinity, duration: 2, ease: "easeInOut" }}
                                className="font-medium mb-4 text-red-50"
                              >
                                {hazard.description}
                              </motion.p>
                              
                              <div className="bg-white/10 backdrop-blur-sm p-4 rounded-2xl border border-white/20">
                                <div className="flex items-center gap-2 mb-2 text-xs font-bold uppercase tracking-widest text-red-100">
                                  <Info size={14} />
                                  Immediate Action Required
                                </div>
                                <p className="text-sm font-bold text-white">
                                  {hazard.immediate_action || "Cease operations in the affected area and consult safety supervisor immediately."}
                                </p>
                              </div>
                            </div>
                          </div>
                        </motion.div>
                      )
                    ))}
                  </AnimatePresence>

                  {/* Summary Card */}
                  <div className="p-8 bg-white dark:bg-slate-900 rounded-[32px] shadow-sm border border-slate-100 dark:border-slate-800">
                    <h4 className="text-xs font-bold text-indigo-600 dark:text-indigo-400 uppercase tracking-[0.2em] mb-4">Assessment Summary</h4>
                    <p className="text-xl text-slate-800 dark:text-slate-200 font-medium leading-relaxed">{report.summary}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Hazards */}
                    <div className="space-y-4">
                      <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 ml-2">
                        <AlertTriangle className="text-amber-500" size={20} />
                        Identified Hazards
                      </h5>
                      {report.hazards.map((hazard: any, i: number) => (
                        <div 
                          key={i} 
                          className={`p-5 bg-white dark:bg-slate-900 rounded-2xl border transition-all cursor-pointer ${
                            expandedHazardIndex === i 
                              ? 'border-indigo-200 dark:border-indigo-900/50 shadow-md' 
                              : 'border-slate-100 dark:border-slate-800 shadow-sm hover:border-slate-200 dark:hover:border-slate-700'
                          }`}
                          onClick={() => setExpandedHazardIndex(expandedHazardIndex === i ? null : i)}
                        >
                          <div className="flex gap-4 items-start">
                            <div className="w-10 h-10 rounded-xl bg-slate-50 dark:bg-slate-800 flex items-center justify-center shrink-0 border border-slate-100 dark:border-slate-700 mt-1">
                              <HazardIcon type={hazard.type} description={hazard.description} />
                            </div>
                            <div className="flex-1 min-w-0">
                              <div className="flex justify-between items-start mb-2">
                                <span className="text-[10px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider">{hazard.type}</span>
                                <div className="flex items-center gap-2">
                                  <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                                    hazard.severity === 'High' ? 'bg-red-100 dark:bg-red-900/30 text-red-600 dark:text-red-400' : 
                                    hazard.severity === 'Medium' ? 'bg-amber-100 dark:bg-amber-900/30 text-amber-600 dark:text-amber-400' : 'bg-emerald-100 dark:bg-emerald-900/30 text-emerald-600 dark:text-emerald-400'
                                  }`}>
                                    {hazard.severity} Risk
                                  </span>
                                  {expandedHazardIndex === i ? <ChevronUp size={14} className="text-slate-400" /> : <ChevronDown size={14} className="text-slate-400" />}
                                </div>
                              </div>
                              <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">{hazard.description}</p>
                              
                              <AnimatePresence>
                                {expandedHazardIndex === i && hazard.immediate_action && (
                                  <motion.div
                                    initial={{ height: 0, opacity: 0 }}
                                    animate={{ height: 'auto', opacity: 1 }}
                                    exit={{ height: 0, opacity: 0 }}
                                    className="overflow-hidden"
                                  >
                                    <div className="mt-4 pt-4 border-t border-slate-100 dark:border-slate-800">
                                      <div className="flex items-center gap-2 mb-2 text-[10px] font-bold uppercase tracking-widest text-red-600 dark:text-red-400">
                                        <ShieldAlert size={12} />
                                        Immediate Action
                                      </div>
                                      <p className="text-xs font-bold text-slate-900 dark:text-white leading-relaxed">
                                        {hazard.immediate_action}
                                      </p>
                                    </div>
                                  </motion.div>
                                )}
                              </AnimatePresence>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Mitigations */}
                    <div className="space-y-4">
                      <h5 className="font-bold text-slate-900 dark:text-white flex items-center gap-2 ml-2">
                        <CheckCircle className="text-emerald-500" size={20} />
                        Mitigation Strategies
                      </h5>
                      <div className="p-6 bg-emerald-50 dark:bg-emerald-900/10 rounded-2xl border border-emerald-100 dark:border-emerald-900/20 space-y-4">
                        {report.mitigations.map((mitigation: string, i: number) => (
                          <div key={i} className="flex gap-3">
                            <div className="w-5 h-5 rounded-full bg-white dark:bg-slate-800 flex items-center justify-center text-emerald-600 dark:text-emerald-400 shrink-0 text-[10px] font-bold">
                              {i + 1}
                            </div>
                            <p className="text-sm text-emerald-900 dark:text-emerald-100 leading-relaxed">{mitigation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* PPE & Regulatory */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-900 dark:bg-slate-950 rounded-[32px] text-white">
                      <h5 className="font-bold mb-4 flex items-center gap-2">
                        <ShieldAlert size={20} className="text-emerald-400" />
                        Required PPE
                      </h5>
                      <ul className="grid grid-cols-2 gap-3 mb-6">
                        {report.ppe_requirements.map((ppe: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-400 dark:text-slate-500">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {ppe}
                          </li>
                        ))}
                      </ul>

                      <button 
                        onClick={() => setIsPPEChecklistExpanded(!isPPEChecklistExpanded)}
                        className="w-full py-3 px-4 rounded-xl bg-white/5 hover:bg-white/10 border border-white/10 transition-all flex items-center justify-between text-sm font-bold group"
                      >
                        <span className="flex items-center gap-2">
                          <CheckCircle size={16} className={checkedPPEItems.length === report.ppe_requirements.length ? "text-emerald-400" : "text-slate-500"} />
                          Safety Verification Checklist
                        </span>
                        {isPPEChecklistExpanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                      </button>

                      <AnimatePresence>
                        {isPPEChecklistExpanded && (
                          <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            className="overflow-hidden"
                          >
                            <div className="mt-4 space-y-2 pt-2">
                              {report.ppe_requirements.map((ppe: string, i: number) => (
                                <div 
                                  key={`check-${i}`}
                                  onClick={() => togglePPEItem(ppe)}
                                  className="flex items-center gap-3 p-3 rounded-xl bg-white/5 hover:bg-white/10 cursor-pointer transition-all border border-transparent hover:border-white/10"
                                >
                                  <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-all ${
                                    checkedPPEItems.includes(ppe) 
                                      ? 'bg-emerald-500 border-emerald-500' 
                                      : 'border-slate-700 bg-slate-800'
                                  }`}>
                                    {checkedPPEItems.includes(ppe) && <CheckCircle size={12} className="text-white" />}
                                  </div>
                                  <span className={`text-xs font-medium transition-all ${
                                    checkedPPEItems.includes(ppe) ? 'text-slate-300 line-through opacity-50' : 'text-slate-200'
                                  }`}>
                                    {ppe}
                                  </span>
                                </div>
                              ))}
                              {checkedPPEItems.length === report.ppe_requirements.length && (
                                <motion.div 
                                  initial={{ opacity: 0, scale: 0.9 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="mt-4 p-3 bg-emerald-500/20 border border-emerald-500/30 rounded-xl text-center"
                                >
                                  <p className="text-[10px] font-bold text-emerald-400 uppercase tracking-widest">All PPE Verified & Secured</p>
                                </motion.div>
                              )}
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                    <div className="p-8 bg-indigo-50 dark:bg-indigo-900/10 rounded-[32px] border border-indigo-100 dark:border-indigo-900/20">
                      <h5 className="font-bold text-indigo-900 dark:text-indigo-100 mb-4">Regulatory Compliance</h5>
                      <p className="text-sm text-indigo-800 dark:text-indigo-200 leading-relaxed opacity-80">{report.regulatory_notes}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setReport(null)}
                    className="flex items-center gap-2 text-indigo-600 dark:text-indigo-400 font-bold text-sm hover:underline mx-auto"
                  >
                    <RefreshCw size={16} />
                    Start New Assessment
                  </button>
                </motion.div>
              ) : error ? (
                <motion.div 
                  key="error"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-red-50 dark:bg-red-900/10 rounded-[40px] border border-red-100 dark:border-red-900/20"
                >
                  <AlertTriangle size={48} className="text-red-600 dark:text-red-400 mb-6" />
                  <h4 className="text-xl font-bold text-red-900 dark:text-red-100 mb-2">Analysis Failed</h4>
                  <p className="text-red-700 dark:text-red-300 max-w-xs mb-8">{error}</p>
                  <button 
                    onClick={generateAssessment}
                    className="px-6 py-3 bg-white dark:bg-slate-800 text-red-600 dark:text-red-400 rounded-xl font-bold border border-red-200 dark:border-red-900/30 hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-white dark:bg-slate-900/50 rounded-[40px] border border-dashed border-slate-200 dark:border-slate-800"
                >
                  <div className="w-20 h-20 bg-slate-50 dark:bg-slate-800 rounded-full flex items-center justify-center text-slate-300 dark:text-slate-600 mb-6">
                    <FileText size={40} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 dark:text-white mb-2">Ready for Analysis</h4>
                  <p className="text-slate-500 dark:text-slate-400 max-w-xs">Input your task details on the left to generate a comprehensive AI-driven risk assessment report.</p>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
};

export default RiskAssessmentSection;
