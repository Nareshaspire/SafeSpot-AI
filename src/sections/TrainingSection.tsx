import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BookOpen, 
  GraduationCap, 
  Play, 
  CheckCircle2, 
  ChevronRight, 
  Award, 
  BrainCircuit, 
  Loader2, 
  AlertCircle,
  Trophy,
  ArrowLeft
} from 'lucide-react';
import { GoogleGenAI, Type } from "@google/genai";

interface QuizQuestion {
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

interface TrainingModule {
  title: string;
  objectives: string[];
  sections: {
    title: string;
    content: string;
  }[];
  quiz: QuizQuestion[];
}

const TrainingSection = () => {
  const [industry, setIndustry] = useState('mining');
  const [role, setRole] = useState('');
  const [risks, setRisks] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [module, setModule] = useState<TrainingModule | null>(null);
  const [currentStep, setCurrentStep] = useState(0); // 0: Form, 1: Content, 2: Quiz, 3: Result
  const [currentSection, setCurrentSection] = useState(0);
  const [userAnswers, setUserAnswers] = useState<number[]>([]);
  const [score, setScore] = useState(0);
  const [error, setError] = useState<string | null>(null);

  const generateModule = async () => {
    if (!role || !risks) return;
    setIsLoading(true);
    setError(null);

    try {
      const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });
      const response = await ai.models.generateContent({
        model: "gemini-3-flash-preview",
        contents: `Generate a personalized safety training module for a ${role} in the ${industry} industry. 
        Focus on these identified risks: ${risks}. 
        The module should be professional, engaging, and highly practical.`,
        config: {
          responseMimeType: "application/json",
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              title: { type: Type.STRING },
              objectives: { type: Type.ARRAY, items: { type: Type.STRING } },
              sections: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    title: { type: Type.STRING },
                    content: { type: Type.STRING }
                  },
                  required: ["title", "content"]
                }
              },
              quiz: {
                type: Type.ARRAY,
                items: {
                  type: Type.OBJECT,
                  properties: {
                    question: { type: Type.STRING },
                    options: { type: Type.ARRAY, items: { type: Type.STRING } },
                    correctAnswer: { type: Type.INTEGER },
                    explanation: { type: Type.STRING }
                  },
                  required: ["question", "options", "correctAnswer", "explanation"]
                }
              }
            },
            required: ["title", "objectives", "sections", "quiz"]
          }
        }
      });

      const data = JSON.parse(response.text || '{}');
      setModule(data);
      setCurrentStep(1);
      setCurrentSection(0);
      setUserAnswers([]);
    } catch (err) {
      console.error(err);
      setError("Failed to generate training module. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleNextSection = () => {
    if (module && currentSection < module.sections.length - 1) {
      setCurrentSection(prev => prev + 1);
    } else {
      setCurrentStep(2); // Move to Quiz
    }
  };

  const handleAnswer = (index: number) => {
    const newAnswers = [...userAnswers, index];
    setUserAnswers(newAnswers);

    if (module && newAnswers.length === module.quiz.length) {
      // Calculate score
      const finalScore = newAnswers.reduce((acc, ans, i) => {
        return ans === module.quiz[i].correctAnswer ? acc + 1 : acc;
      }, 0);
      setScore(finalScore);
      setCurrentStep(3); // Move to Result
    }
  };

  const reset = () => {
    setModule(null);
    setCurrentStep(0);
    setCurrentSection(0);
    setUserAnswers([]);
    setScore(0);
  };

  return (
    <section id="training" className="py-24 bg-white relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-indigo-50 rounded-full blur-3xl opacity-50 -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/4 h-1/4 bg-emerald-50 rounded-full blur-3xl opacity-50 translate-y-1/2 -translate-x-1/2" />

      <div className="max-w-7xl mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-indigo-50 text-indigo-600 text-sm font-bold mb-4"
          >
            <GraduationCap size={16} />
            <span>AI-Powered Learning</span>
          </motion.div>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-5xl font-display font-bold text-slate-900 mb-6"
          >
            Personalized Safety <span className="text-indigo-600">Training</span>
          </motion.h2>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
            className="text-lg text-slate-600 max-w-2xl mx-auto"
          >
            Generate custom training modules tailored to your specific role and workplace hazards. 
            Interactive lessons designed for maximum retention.
          </motion.p>
        </div>

        <div className="max-w-4xl mx-auto">
          <AnimatePresence mode="wait">
            {currentStep === 0 && (
              <motion.div 
                key="form"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.95 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-indigo-100/50 p-8 md:p-12"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Industry</label>
                    <select 
                      value={industry}
                      onChange={(e) => setIndustry(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    >
                      <option value="mining">Mining & Resources</option>
                      <option value="construction">Construction & Infrastructure</option>
                      <option value="healthcare">Healthcare & Clinical</option>
                      <option value="logistics">Logistics & Warehousing</option>
                      <option value="manufacturing">Manufacturing</option>
                    </select>
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-slate-700 ml-1">Your Role</label>
                    <input 
                      type="text"
                      placeholder="e.g. Site Supervisor, Lab Tech"
                      value={role}
                      onChange={(e) => setRole(e.target.value)}
                      className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all font-medium"
                    />
                  </div>
                </div>

                <div className="space-y-2 mb-8">
                  <label className="text-sm font-bold text-slate-700 ml-1">Specific Risks or Hazards</label>
                  <textarea 
                    rows={4}
                    placeholder="Describe the hazards you face (e.g. working at heights, chemical exposure, heavy machinery)..."
                    value={risks}
                    onChange={(e) => setRisks(e.target.value)}
                    className="w-full bg-slate-50 border-none rounded-xl px-4 py-3 text-slate-900 focus:ring-2 focus:ring-indigo-500 transition-all font-medium resize-none"
                  />
                </div>

                {error && (
                  <div className="mb-6 p-4 bg-red-50 text-red-600 rounded-xl flex items-center gap-3 text-sm font-medium">
                    <AlertCircle size={18} />
                    {error}
                  </div>
                )}

                <button 
                  onClick={generateModule}
                  disabled={isLoading || !role || !risks}
                  className="w-full bg-indigo-600 text-white py-4 rounded-xl font-bold hover:bg-indigo-700 transition-all shadow-lg shadow-indigo-100 flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed group"
                >
                  {isLoading ? (
                    <>
                      <Loader2 size={20} className="animate-spin" />
                      <span>Building Your Module...</span>
                    </>
                  ) : (
                    <>
                      <BrainCircuit size={20} className="group-hover:rotate-12 transition-transform" />
                      <span>Generate Personalized Training</span>
                    </>
                  )}
                </button>
              </motion.div>
            )}

            {currentStep === 1 && module && (
              <motion.div 
                key="content"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-indigo-100/50 overflow-hidden"
              >
                {/* Progress Bar */}
                <div className="h-2 bg-slate-100 w-full">
                  <motion.div 
                    className="h-full bg-indigo-600"
                    initial={{ width: 0 }}
                    animate={{ width: `${((currentSection + 1) / module.sections.length) * 100}%` }}
                  />
                </div>

                <div className="p-8 md:p-12">
                  <div className="flex items-center justify-between mb-8">
                    <span className="text-xs font-bold text-indigo-600 uppercase tracking-widest">
                      Section {currentSection + 1} of {module.sections.length}
                    </span>
                    <button onClick={reset} className="text-slate-400 hover:text-slate-600 transition-colors">
                      <ArrowLeft size={20} />
                    </button>
                  </div>

                  <h3 className="text-3xl font-display font-bold text-slate-900 mb-6">
                    {module.sections[currentSection].title}
                  </h3>

                  <div className="prose prose-slate max-w-none mb-12">
                    <p className="text-slate-600 leading-relaxed text-lg whitespace-pre-wrap">
                      {module.sections[currentSection].content}
                    </p>
                  </div>

                  <div className="flex justify-end">
                    <button 
                      onClick={handleNextSection}
                      className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all flex items-center gap-2 group"
                    >
                      {currentSection === module.sections.length - 1 ? 'Start Quiz' : 'Next Section'}
                      <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
                    </button>
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 2 && module && (
              <motion.div 
                key="quiz"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-indigo-100/50 p-8 md:p-12"
              >
                <div className="text-center mb-12">
                  <div className="w-16 h-16 bg-indigo-50 rounded-2xl flex items-center justify-center text-indigo-600 mx-auto mb-4">
                    <BrainCircuit size={32} />
                  </div>
                  <h3 className="text-2xl font-display font-bold text-slate-900">Knowledge Check</h3>
                  <p className="text-slate-500">Question {userAnswers.length + 1} of {module.quiz.length}</p>
                </div>

                <div className="mb-8">
                  <p className="text-xl font-bold text-slate-800 mb-6">
                    {module.quiz[userAnswers.length].question}
                  </p>
                  <div className="grid grid-cols-1 gap-4">
                    {module.quiz[userAnswers.length].options.map((option, i) => (
                      <button
                        key={i}
                        onClick={() => handleAnswer(i)}
                        className="text-left p-4 rounded-xl border-2 border-slate-100 hover:border-indigo-600 hover:bg-indigo-50 transition-all font-medium text-slate-700"
                      >
                        {option}
                      </button>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}

            {currentStep === 3 && module && (
              <motion.div 
                key="result"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-white rounded-3xl border border-slate-100 shadow-2xl shadow-indigo-100/50 p-8 md:p-12 text-center"
              >
                <div className="w-24 h-24 bg-emerald-50 rounded-full flex items-center justify-center text-emerald-600 mx-auto mb-6">
                  <Trophy size={48} />
                </div>
                <h3 className="text-3xl font-display font-bold text-slate-900 mb-2">Module Completed!</h3>
                <p className="text-slate-500 mb-8">You've successfully finished your personalized training.</p>

                <div className="bg-slate-50 rounded-2xl p-8 mb-8">
                  <div className="text-5xl font-display font-bold text-indigo-600 mb-2">
                    {Math.round((score / module.quiz.length) * 100)}%
                  </div>
                  <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">Your Score</p>
                  <p className="text-slate-600 mt-4">
                    You got {score} out of {module.quiz.length} questions correct.
                  </p>
                </div>

                <div className="flex flex-col md:flex-row gap-4 justify-center">
                  <button 
                    onClick={reset}
                    className="bg-indigo-600 text-white px-8 py-3 rounded-xl font-bold hover:bg-indigo-700 transition-all"
                  >
                    Start New Module
                  </button>
                  <button 
                    className="border-2 border-slate-100 text-slate-600 px-8 py-3 rounded-xl font-bold hover:bg-slate-50 transition-all flex items-center justify-center gap-2"
                  >
                    <Award size={18} />
                    Download Certificate
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default TrainingSection;
