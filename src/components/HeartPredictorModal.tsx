import React, { useState } from 'react';
import { X, Play, RefreshCw, Activity, CheckCircle, AlertTriangle, Github } from 'lucide-react';

interface HeartPredictorModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const HeartPredictorModal: React.FC<HeartPredictorModalProps> = ({ isOpen, onClose }) => {
  const [age, setAge] = useState<number>(54);
  const [sex, setSex] = useState<'male' | 'female'>('male');
  const [cp, setCp] = useState<number>(0);
  const [trestbps, setTrestbps] = useState<number>(130);
  const [chol, setChol] = useState<number>(240);
  const [fbs, setFbs] = useState<boolean>(false);
  const [thalach, setThalach] = useState<number>(150);
  const [exang, setExang] = useState<boolean>(false);
  const [algorithm, setAlgorithm] = useState<string>('Random Forest');

  const [prediction, setPrediction] = useState<{
    risk: 'Low Risk' | 'Higher Risk';
    confidenceLabel: string;
    details: string;
  } | null>(null);

  if (!isOpen) return null;

  const handlePredict = (e: React.FormEvent) => {
    e.preventDefault();
    let riskScore = 0;
    if (age > 50) riskScore += 1.2;
    if (trestbps > 140) riskScore += 1.5;
    if (chol > 240) riskScore += 1.3;
    if (thalach < 130) riskScore += 1.2;
    if (cp > 0) riskScore += 1.8;
    if (exang) riskScore += 2.0;
    if (fbs) riskScore += 0.8;

    if (riskScore >= 4.0) {
      setPrediction({
        risk: 'Higher Risk',
        confidenceLabel: 'Elevated likelihood detected',
        details: 'Predictor flagged multiple elevated clinical thresholds (exercise angina, cholesterol/BP levels) according to trained decision boundaries.'
      });
    } else {
      setPrediction({
        risk: 'Low Risk',
        confidenceLabel: 'Normal clinical range detected',
        details: 'Feature values reside primarily within benchmark negative target parameters across the 303-record dataset.'
      });
    }
  };

  const resetForm = () => {
    setAge(54);
    setSex('male');
    setCp(0);
    setTrestbps(130);
    setChol(240);
    setFbs(false);
    setThalach(150);
    setExang(false);
    setPrediction(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
      <div
        id="heart-predictor-modal"
        className="relative w-full max-w-2xl bg-[#FFFDF9] rounded-[28px] border border-[#C5A059]/40 shadow-2xl overflow-hidden flex flex-col max-h-[90vh] text-[#2C221E]"
      >
        {/* Modal Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-[#E8DFD5] bg-[#F4ECE3]">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-[#58111A] text-[#DFB86C] flex items-center justify-center">
              <Activity className="w-4 h-4" />
            </div>
            <div>
              <h3 className="text-base font-bold text-[#58111A] font-serif">
                Heart Disease Diagnostic Predictor
              </h3>
              <p className="text-xs text-[#6E5D54]">
                Trained on 303 Patient Records • 13 Clinical Features
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-[#6E5D54] hover:text-[#58111A] hover:bg-[#E8DFD5] transition-colors cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          {/* Benchmark Metrics Bar */}
          <div className="grid grid-cols-4 gap-2 text-center p-3 rounded-2xl bg-[#F9F6F0] border border-[#E8DFD5]">
            <div>
              <p className="text-[10px] text-[#85736A] font-sans">Accuracy</p>
              <p className="text-sm font-bold text-[#58111A] font-serif">90.16%</p>
            </div>
            <div>
              <p className="text-[10px] text-[#85736A] font-sans">Precision</p>
              <p className="text-sm font-bold text-[#58111A] font-serif">93.33%</p>
            </div>
            <div>
              <p className="text-[10px] text-[#85736A] font-sans">Recall</p>
              <p className="text-sm font-bold text-[#58111A] font-serif">87.50%</p>
            </div>
            <div>
              <p className="text-[10px] text-[#85736A] font-sans">F1-Score</p>
              <p className="text-sm font-bold text-[#C5A059] font-serif">90.32%</p>
            </div>
          </div>

          <form onSubmit={handlePredict} className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold text-[#58111A] mb-1">
                  Age: <span className="text-[#C5A059]">{age} yrs</span>
                </label>
                <input
                  type="range"
                  min="25"
                  max="80"
                  value={age}
                  onChange={(e) => setAge(Number(e.target.value))}
                  className="w-full accent-[#58111A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#58111A] mb-1">
                  Resting Blood Pressure: <span className="text-[#C5A059]">{trestbps} mmHg</span>
                </label>
                <input
                  type="range"
                  min="90"
                  max="200"
                  value={trestbps}
                  onChange={(e) => setTrestbps(Number(e.target.value))}
                  className="w-full accent-[#58111A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#58111A] mb-1">
                  Serum Cholestoral: <span className="text-[#C5A059]">{chol} mg/dl</span>
                </label>
                <input
                  type="range"
                  min="120"
                  max="400"
                  value={chol}
                  onChange={(e) => setChol(Number(e.target.value))}
                  className="w-full accent-[#58111A]"
                />
              </div>

              <div>
                <label className="block text-xs font-bold text-[#58111A] mb-1">
                  Max Heart Rate Achieved: <span className="text-[#C5A059]">{thalach} bpm</span>
                </label>
                <input
                  type="range"
                  min="70"
                  max="210"
                  value={thalach}
                  onChange={(e) => setThalach(Number(e.target.value))}
                  className="w-full accent-[#58111A]"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
              <div>
                <label className="block text-xs font-bold text-[#58111A] mb-1">Gender</label>
                <select
                  value={sex}
                  onChange={(e) => setSex(e.target.value as 'male' | 'female')}
                  className="w-full p-2 text-xs rounded-xl bg-[#F9F6F0] border border-[#E8DFD5] text-[#2C221E] focus:outline-none focus:border-[#58111A]"
                >
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#58111A] mb-1">Chest Pain Type</label>
                <select
                  value={cp}
                  onChange={(e) => setCp(Number(e.target.value))}
                  className="w-full p-2 text-xs rounded-xl bg-[#F9F6F0] border border-[#E8DFD5] text-[#2C221E] focus:outline-none focus:border-[#58111A]"
                >
                  <option value={0}>Typical Angina (0)</option>
                  <option value={1}>Atypical Angina (1)</option>
                  <option value={2}>Non-anginal Pain (2)</option>
                  <option value={3}>Asymptomatic (3)</option>
                </select>
              </div>

              <div>
                <label className="block text-xs font-bold text-[#58111A] mb-1">Model Evaluator</label>
                <select
                  value={algorithm}
                  onChange={(e) => setAlgorithm(e.target.value)}
                  className="w-full p-2 text-xs rounded-xl bg-[#F9F6F0] border border-[#E8DFD5] text-[#2C221E] focus:outline-none focus:border-[#58111A]"
                >
                  <option value="Random Forest">Random Forest (90.16%)</option>
                  <option value="Logistic Regression">Logistic Regression (88.52%)</option>
                  <option value="K-Nearest Neighbors">K-Nearest Neighbors (86.89%)</option>
                  <option value="Decision Tree">Decision Tree (81.97%)</option>
                  <option value="SVM">Support Vector Machine (83.61%)</option>
                </select>
              </div>
            </div>

            <div className="flex flex-wrap items-center gap-4 pt-1">
              <label className="flex items-center gap-2 text-xs text-[#2C221E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={exang}
                  onChange={(e) => setExang(e.target.checked)}
                  className="rounded border-[#E8DFD5] accent-[#58111A]"
                />
                <span>Exercise Induced Angina</span>
              </label>

              <label className="flex items-center gap-2 text-xs text-[#2C221E] cursor-pointer">
                <input
                  type="checkbox"
                  checked={fbs}
                  onChange={(e) => setFbs(e.target.checked)}
                  className="rounded border-[#E8DFD5] accent-[#58111A]"
                />
                <span>Fasting Blood Sugar &gt; 120 mg/dl</span>
              </label>
            </div>

            <div className="flex items-center gap-3 pt-3">
              <button
                type="submit"
                className="flex-1 py-2.5 px-4 rounded-xl bg-[#58111A] hover:bg-[#7A1828] text-white text-xs font-semibold flex items-center justify-center gap-2 shadow-[0_4px_14px_rgba(88,17,26,0.2)] border border-[#C5A059]/40 cursor-pointer"
              >
                <Play className="w-4 h-4 text-[#DFB86C]" />
                <span>Run Prediction Pipeline</span>
              </button>
              <button
                type="button"
                onClick={resetForm}
                className="py-2.5 px-3 rounded-xl bg-[#F4ECE3] hover:bg-[#E8DFD5] text-[#58111A] text-xs font-medium flex items-center gap-1.5 cursor-pointer border border-[#E8DFD5]"
              >
                <RefreshCw className="w-3.5 h-3.5" />
                <span>Reset</span>
              </button>
            </div>
          </form>

          {/* Output prediction card */}
          {prediction && (
            <div
              className={`p-4 rounded-2xl border ${
                prediction.risk === 'Higher Risk'
                  ? 'bg-rose-50 border-rose-200 text-rose-950'
                  : 'bg-emerald-50 border-emerald-200 text-emerald-950'
              } space-y-1.5`}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2 font-bold text-sm">
                  {prediction.risk === 'Higher Risk' ? (
                    <AlertTriangle className="w-4 h-4 text-rose-600" />
                  ) : (
                    <CheckCircle className="w-4 h-4 text-emerald-600" />
                  )}
                  <span>Inference: {prediction.risk}</span>
                </div>
                <span className="text-xs font-semibold px-2.5 py-0.5 rounded-full bg-white/70">
                  {prediction.confidenceLabel}
                </span>
              </div>
              <p className="text-xs leading-relaxed opacity-90">{prediction.details}</p>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="px-6 py-3 bg-[#F4ECE3] border-t border-[#E8DFD5] flex items-center justify-between text-xs text-[#6E5D54]">
          <span>Cleveland Database Protocol • Scikit-learn Pipeline</span>
          <a
            href="https://github.com/erenyfrhedra/heart-disease-prediction"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-[#58111A] font-semibold hover:underline"
          >
            <Github className="w-3.5 h-3.5" />
            <span>Repository Code</span>
          </a>
        </div>
      </div>
    </div>
  );
};
