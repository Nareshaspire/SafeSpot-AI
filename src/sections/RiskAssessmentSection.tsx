import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, Send, Loader2, AlertTriangle, CheckCircle, FileText, RefreshCw, ChevronRight } from 'lucide-react';
import { GoogleGenAI } from "@google/genai";

const RiskAssessmentSection = () => {
  const [taskDescription, setTaskDescription] = useState('');
  const [industry, setIndustry] = useState('mining');
  const [isLoading, setIsLoading] = useState(false);
  const [report, setReport] = useState<any>(null);
  const [error, setError] = useState<string | null>(null);

  const examples = [
    {
      industry: 'mining',
      title: 'Underground Drilling',
      description: 'Underground drilling at 500m depth in a high-moisture environment using heavy pneumatic machinery. Limited ventilation and potential for rock instability.',
      report: {
        summary: "High-risk operation requiring stringent controls for atmospheric safety and structural stability.",
        hazards: [
          { type: "Physical", description: "Rockfall or structural collapse due to instability at depth.", severity: "High" },
          { type: "Atmospheric", description: "Accumulation of hazardous gases (methane, CO) and low oxygen levels.", severity: "High" },
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
          { type: "Physical", description: "Falls from height during assembly/disassembly.", severity: "High" },
          { type: "Physical", description: "Falling objects impacting workers or pedestrians below.", severity: "High" },
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
          { type: "Biological", description: "Accidental needle-stick injuries or sharps exposure.", severity: "High" },
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
    setError(null);
    window.scrollTo({ top: document.getElementById('risk-assessment')?.offsetTop, behavior: 'smooth' });
  };

  const generateAssessment = async () => {
    if (!taskDescription.trim()) return;

    setIsLoading(true);
    setError(null);
    setReport(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY || '' });
      const prompt = `Perform a comprehensive health and safety risk assessment for the following task in the ${industry} industry:
      
      Task/Workplace Description: ${taskDescription}
      
      Please provide the report in a structured JSON format with the following keys:
      - "summary": A brief overview of the risk level.
      - "hazards": An array of objects, each with "type" (e.g., Physical, Chemical, Biological), "description", and "severity" (Low, Medium, High).
      - "mitigations": An array of specific, actionable mitigation strategies.
      - "ppe_requirements": A list of required Personal Protective Equipment.
      - "regulatory_notes": Any relevant IEEE or safety standards that apply.`;

      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: prompt,
        config: {
          responseMimeType: "application/json",
        },
      });

      const result = JSON.parse(response.text || '{}');
      setReport(result);
    } catch (err) {
      console.error("Risk Assessment Error:", err);
      setError("Failed to generate risk assessment. Please check your connection and try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="risk-assessment" className="py-24 bg-slate-50">
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-100 text-indigo-700 text-xs font-bold uppercase tracking-wider mb-4">
            <ShieldAlert size={14} />
            <span>AI-Driven Intelligence</span>
          </div>
          <h2 className="font-display text-4xl font-bold mb-4 text-slate-900">Predictive Risk Assessment</h2>
          <p className="text-slate-600 max-w-2xl mx-auto">
            Leverage advanced AI to identify potential hazards and generate mitigation strategies based on industry standards and real-time analysis.
          </p>
        </div>

        <div className="grid lg:grid-cols-5 gap-12">
          {/* Input Panel */}
          <div className="lg:col-span-2">
            <div className="glass p-8 rounded-[32px] shadow-xl border-white sticky top-24">
              <h3 className="text-xl font-bold mb-6 text-slate-900 flex items-center gap-2">
                <FileText className="text-indigo-600" size={24} />
                Assessment Parameters
              </h3>
              
              <div className="space-y-6">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-slate-700 ml-1">Industry Context</label>
                  <select 
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all appearance-none bg-white"
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
                  <label className="text-sm font-bold text-slate-700 ml-1">Task/Workplace Details</label>
                  <textarea 
                    rows={6}
                    placeholder="Describe the task, environment, and equipment involved (e.g., Underground drilling at 500m depth using heavy machinery...)"
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:border-indigo-500 focus:ring-2 focus:ring-indigo-200 outline-none transition-all resize-none text-sm leading-relaxed"
                    value={taskDescription}
                    onChange={(e) => setTaskDescription(e.target.value)}
                  />
                </div>

                <button 
                  onClick={generateAssessment}
                  disabled={isLoading || !taskDescription.trim()}
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
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

              <div className="mt-10 pt-8 border-t border-slate-100">
                <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-4">Try an Example</p>
                <div className="grid grid-cols-1 gap-2">
                  {examples.map((ex, i) => (
                    <button
                      key={i}
                      onClick={() => loadExample(ex)}
                      className="text-left p-3 rounded-xl border border-slate-100 hover:border-indigo-200 hover:bg-indigo-50 transition-all text-xs font-medium text-slate-600 flex items-center justify-between group"
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
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-white/50 rounded-[40px] border border-dashed border-slate-200"
                >
                  <div className="relative mb-8">
                    <div className="w-24 h-24 border-4 border-indigo-100 rounded-full animate-pulse" />
                    <Loader2 size={48} className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-indigo-600 animate-spin" />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Processing Intelligence</h4>
                  <p className="text-slate-500 max-w-xs">Our AI is cross-referencing safety standards and identifying potential hazards...</p>
                </motion.div>
              ) : report ? (
                <motion.div 
                  key="report"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="space-y-8"
                >
                  {/* Summary Card */}
                  <div className="p-8 bg-white rounded-[32px] shadow-sm border border-slate-100">
                    <h4 className="text-xs font-bold text-indigo-600 uppercase tracking-[0.2em] mb-4">Assessment Summary</h4>
                    <p className="text-xl text-slate-800 font-medium leading-relaxed">{report.summary}</p>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    {/* Hazards */}
                    <div className="space-y-4">
                      <h5 className="font-bold text-slate-900 flex items-center gap-2 ml-2">
                        <AlertTriangle className="text-amber-500" size={20} />
                        Identified Hazards
                      </h5>
                      {report.hazards.map((hazard: any, i: number) => (
                        <div key={i} className="p-5 bg-white rounded-2xl border border-slate-100 shadow-sm">
                          <div className="flex justify-between items-start mb-2">
                            <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">{hazard.type}</span>
                            <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold uppercase ${
                              hazard.severity === 'High' ? 'bg-red-100 text-red-600' : 
                              hazard.severity === 'Medium' ? 'bg-amber-100 text-amber-600' : 'bg-emerald-100 text-emerald-600'
                            }`}>
                              {hazard.severity} Risk
                            </span>
                          </div>
                          <p className="text-sm text-slate-700 leading-relaxed">{hazard.description}</p>
                        </div>
                      ))}
                    </div>

                    {/* Mitigations */}
                    <div className="space-y-4">
                      <h5 className="font-bold text-slate-900 flex items-center gap-2 ml-2">
                        <CheckCircle className="text-emerald-500" size={20} />
                        Mitigation Strategies
                      </h5>
                      <div className="p-6 bg-emerald-50 rounded-2xl border border-emerald-100 space-y-4">
                        {report.mitigations.map((mitigation: string, i: number) => (
                          <div key={i} className="flex gap-3">
                            <div className="w-5 h-5 rounded-full bg-white flex items-center justify-center text-emerald-600 shrink-0 text-[10px] font-bold">
                              {i + 1}
                            </div>
                            <p className="text-sm text-emerald-900 leading-relaxed">{mitigation}</p>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>

                  {/* PPE & Regulatory */}
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="p-8 bg-slate-900 rounded-[32px] text-white">
                      <h5 className="font-bold mb-4 flex items-center gap-2">
                        <ShieldAlert size={20} className="text-emerald-400" />
                        Required PPE
                      </h5>
                      <ul className="grid grid-cols-2 gap-3">
                        {report.ppe_requirements.map((ppe: string, i: number) => (
                          <li key={i} className="flex items-center gap-2 text-xs text-slate-400">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                            {ppe}
                          </li>
                        ))}
                      </ul>
                    </div>
                    <div className="p-8 bg-indigo-50 rounded-[32px] border border-indigo-100">
                      <h5 className="font-bold text-indigo-900 mb-4">Regulatory Compliance</h5>
                      <p className="text-sm text-indigo-800 leading-relaxed opacity-80">{report.regulatory_notes}</p>
                    </div>
                  </div>

                  <button 
                    onClick={() => setReport(null)}
                    className="flex items-center gap-2 text-indigo-600 font-bold text-sm hover:underline mx-auto"
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
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-red-50 rounded-[40px] border border-red-100"
                >
                  <AlertTriangle size={48} className="text-red-600 mb-6" />
                  <h4 className="text-xl font-bold text-red-900 mb-2">Analysis Failed</h4>
                  <p className="text-red-700 max-w-xs mb-8">{error}</p>
                  <button 
                    onClick={generateAssessment}
                    className="px-6 py-3 bg-white text-red-600 rounded-xl font-bold border border-red-200 hover:bg-red-50 transition-colors"
                  >
                    Try Again
                  </button>
                </motion.div>
              ) : (
                <motion.div 
                  key="empty"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="h-full flex flex-col items-center justify-center text-center p-12 bg-white rounded-[40px] border border-dashed border-slate-200"
                >
                  <div className="w-20 h-20 bg-slate-50 rounded-full flex items-center justify-center text-slate-300 mb-6">
                    <FileText size={40} />
                  </div>
                  <h4 className="text-xl font-bold text-slate-900 mb-2">Ready for Analysis</h4>
                  <p className="text-slate-500 max-w-xs">Input your task details on the left to generate a comprehensive AI-driven risk assessment report.</p>
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
