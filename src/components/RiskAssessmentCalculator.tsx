import { useState, useEffect } from 'react';
import { ShieldCheck, ShieldAlert, CheckCircle, AlertTriangle, RefreshCw, Layers, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { RiskAssessment } from '../types';

interface RiskAssessmentCalculatorProps {
  onApplyMitigationRecommendation: (details: string, recommendedDiscountCost: number) => void;
  onOpenBooking: () => void;
}

export default function RiskAssessmentCalculator({ onApplyMitigationRecommendation, onOpenBooking }: RiskAssessmentCalculatorProps) {
  const [assessment, setAssessment] = useState<RiskAssessment>({
    treeDistance: 'close',
    guttersCleaned: false,
    lowLimbsRemoved: false,
    dryBrushCleared: false,
    roofMaterial: 'combustible'
  });

  const [score, setScore] = useState<number>(85);
  const [severity, setSeverity] = useState<'CRITICAL' | 'MODERATE' | 'LOW'>('CRITICAL');

  // Dynamic Score Logic
  useEffect(() => {
    let tempScore = 15; // baseline threat
    
    // Roof properties
    if (assessment.roofMaterial === 'combustible') {
      tempScore += 30; // Wood shake/wooden materials have extremely high fire grab rates
    } else {
      tempScore += 5;
    }

    // Evergreen canopy distance
    if (assessment.treeDistance === 'close') {
      tempScore += 30; // Closer tree canopies act as ladders
    } else if (assessment.treeDistance === 'moderate') {
      tempScore += 15;
    } else {
      tempScore += 0;
    }

    // Combustibles buildup
    if (!assessment.guttersCleaned) {
      tempScore += 10;
    }
    if (!assessment.lowLimbsRemoved) {
      tempScore += 8;
    }
    if (!assessment.dryBrushCleared) {
      tempScore += 7;
    }

    // Cap at 100
    const finalScore = Math.min(100, Math.max(0, tempScore));
    setScore(finalScore);

    if (finalScore >= 65) {
      setSeverity('CRITICAL');
    } else if (finalScore >= 35) {
      setSeverity('MODERATE');
    } else {
      setSeverity('LOW');
    }
  }, [assessment]);

  const handleReset = () => {
    setAssessment({
      treeDistance: 'moderate',
      guttersCleaned: true,
      lowLimbsRemoved: true,
      dryBrushCleared: true,
      roofMaterial: 'non-combustible'
    });
  };

  const handleApplyRecommends = () => {
    // Generate recommendation copy based on failure points
    const recommendedServices: string[] = [];
    let priceCredit = 0;

    if (assessment.treeDistance === 'close' || !assessment.lowLimbsRemoved) {
      recommendedServices.push("Pruning hazardous evergreen underlimbs");
      priceCredit += 250;
    }
    if (!assessment.guttersCleaned) {
      recommendedServices.push("Gutter pine needle sweeping & roof blow");
      priceCredit += 140;
    }
    if (!assessment.dryBrushCleared) {
      recommendedServices.push("Defensible Space 5x5x5 brush clearance & stacking");
      priceCredit += 180;
    }

    if (recommendedServices.length === 0) {
      recommendedServices.push("Semi-annual pine cone / needle defense maintenance");
      priceCredit += 99;
    }

    const detailText = `Wildfire Risk Rating: ${severity} (Score: ${score}/100). Recommended actions: ${recommendedServices.join(', ')}.`;
    onApplyMitigationRecommendation(detailText, priceCredit);
    onOpenBooking();
  };

  return (
    <section className="bg-[#050505] text-[#f4f4f5] py-20 px-6 md:px-12 border-b border-white/5 relative overflow-hidden" id="risk-calculator">
      
      {/* Dynamic ambient background glow */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-orange-600/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          
          {/* Left Column: Diagnostics Card Input Fields (7 cols) */}
          <div className="lg:col-span-7 space-y-6">
            <div>
              <span className="text-amber-500 font-mono text-xs uppercase tracking-[0.2em] font-semibold bg-amber-500/5 border border-amber-500/10 px-3 py-1 rounded-full">
                HAZARD ASSESSMENT ENGINE
              </span>
              <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight font-display text-white uppercase mt-4 mb-4">
                WILDFIRE RISK DIAGNOSTIC
              </h2>
              <p className="text-zinc-400 text-sm md:text-base font-light leading-relaxed max-w-xl font-sans">
                A home is lost to wildfire because of embers landing on combustible debris. Check your property features to see your real-time risk rating and customized Colorado mitigation priorities.
              </p>
            </div>

            <div className="glass-panel p-6 rounded-2xl border border-white/5 space-y-6 shadow-xl">
              
              {/* Question 1: Tree Canopy Distance */}
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-white font-sans flex items-center gap-1.5">
                    <span className="text-blue-400 font-mono text-xs">01.</span>
                    Evergreen Tree Proximity
                  </label>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase">Canopy spacing</span>
                </div>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { value: 'close', label: 'Close (<30ft)', desc: 'Ladder Threat' },
                    { value: 'moderate', label: 'Mid (30-100ft)', desc: 'Zone 2 Defense' },
                    { value: 'safe', label: 'Safe (>100ft)', desc: 'Forest Buffer' }
                  ].map((opt) => (
                    <button
                      key={opt.value}
                      type="button"
                      onClick={() => setAssessment({ ...assessment, treeDistance: opt.value as any })}
                      className={`p-3 rounded-xl border text-center transition-all duration-200 cursor-pointer ${
                        assessment.treeDistance === opt.value
                          ? 'bg-blue-600/20 border-blue-500 text-white shadow-lg'
                          : 'bg-white/[0.01] border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/[0.02]'
                      }`}
                    >
                      <h4 className="text-xs font-bold font-display">{opt.label}</h4>
                      <p className="text-[9px] text-zinc-500 font-sans font-light mt-0.5">{opt.desc}</p>
                    </button>
                  ))}
                </div>
              </div>

              {/* Question 2: Roof Flammability */}
              <div className="space-y-3 pt-2">
                <div className="flex justify-between items-center">
                  <label className="text-sm font-semibold text-white font-sans flex items-center gap-1.5">
                    <span className="text-blue-400 font-mono text-xs">02.</span>
                    Roof Composition
                  </label>
                  <span className="text-[10px] text-zinc-500 font-mono uppercase">Material Threat</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="button"
                    onClick={() => setAssessment({ ...assessment, roofMaterial: 'combustible' })}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-200 cursor-pointer ${
                      assessment.roofMaterial === 'combustible'
                        ? 'bg-red-500/10 border-red-500/40 text-red-300'
                        : 'bg-white/[0.01] border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    <Layers className="shrink-0 mt-0.5 text-red-400" size={16} />
                    <div>
                      <h4 className="text-xs font-bold font-display">Wood Shake/Combustible</h4>
                      <p className="text-[9px] text-zinc-500 font-sans mt-0.5">High ignition danger from blown embers.</p>
                    </div>
                  </button>

                  <button
                    type="button"
                    onClick={() => setAssessment({ ...assessment, roofMaterial: 'non-combustible' })}
                    className={`p-4 rounded-xl border text-left flex items-start gap-3 transition-all duration-200 cursor-pointer ${
                      assessment.roofMaterial === 'non-combustible'
                        ? 'bg-emerald-500/10 border-emerald-500/40 text-emerald-300'
                        : 'bg-white/[0.01] border-white/5 text-zinc-400 hover:border-white/10 hover:bg-white/[0.02]'
                    }`}
                  >
                    <ShieldCheck className="shrink-0 mt-0.5 text-emerald-400" size={16} />
                    <div>
                      <h4 className="text-xs font-bold font-display">Metal / Asphalt / Tile</h4>
                      <p className="text-[9px] text-zinc-500 font-sans mt-0.5">Safeguarded standard shingles.</p>
                    </div>
                  </button>
                </div>
              </div>

              {/* Question 3: Toggles / Checkboxes */}
              <div className="space-y-4 pt-2">
                <label className="text-sm font-semibold text-white font-sans flex items-center gap-1.5">
                  <span className="text-blue-400 font-mono text-xs">03.</span>
                  Defensible Space Actions
                </label>
                
                <div className="space-y-3.5">
                  {/* Gutters Toggle */}
                  <label className="flex items-start md:items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.01] cursor-pointer hover:bg-white/[0.02] transition-colors select-none">
                    <div className="flex gap-3 items-start md:items-center">
                      <input
                        type="checkbox"
                        checked={assessment.guttersCleaned}
                        onChange={(e) => setAssessment({ ...assessment, guttersCleaned: e.target.checked })}
                        className="w-4 h-4 rounded border-white/20 text-blue-500 focus:ring-0 cursor-pointer accent-blue-500"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-zinc-200">Are gutters and roofs free of pine needles?</h4>
                        <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Rooftops are prime collectors for floating fire spores</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${assessment.guttersCleaned ? 'bg-emerald-950/40 text-emerald-400' : 'bg-rose-950/40 text-rose-400 border border-rose-500/20'}`}>
                      {assessment.guttersCleaned ? 'Clean' : 'Needs Clear'}
                    </span>
                  </label>

                  {/* Low Limbs Toggle */}
                  <label className="flex items-start md:items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.01] cursor-pointer hover:bg-white/[0.02] transition-colors select-none">
                    <div className="flex gap-3 items-start md:items-center">
                      <input
                        type="checkbox"
                        checked={assessment.lowLimbsRemoved}
                        onChange={(e) => setAssessment({ ...assessment, lowLimbsRemoved: e.target.checked })}
                        className="w-4 h-4 rounded border-white/20 text-blue-500 focus:ring-0 cursor-pointer accent-blue-500"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-zinc-200">Have branches under 15ft been limb raised/removed?</h4>
                        <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Prevents ground-level fires from laddering up the trees</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${assessment.lowLimbsRemoved ? 'bg-emerald-950/40 text-emerald-400' : 'bg-rose-950/40 text-rose-400 border border-rose-500/20'}`}>
                      {assessment.lowLimbsRemoved ? 'Trimmed' : 'Needs Trim'}
                    </span>
                  </label>

                  {/* Dry Brush Toggle */}
                  <label className="flex items-start md:items-center justify-between p-3.5 rounded-xl border border-white/5 bg-white/[0.01] cursor-pointer hover:bg-white/[0.02] transition-colors select-none">
                    <div className="flex gap-3 items-start md:items-center">
                      <input
                        type="checkbox"
                        checked={assessment.dryBrushCleared}
                        onChange={(e) => setAssessment({ ...assessment, dryBrushCleared: e.target.checked })}
                        className="w-4 h-4 rounded border-white/20 text-blue-500 focus:ring-0 cursor-pointer accent-blue-500"
                      />
                      <div>
                        <h4 className="text-xs font-bold text-zinc-200">Is dry brush and dead shrubs cleared within 30ft of house?</h4>
                        <p className="text-[10px] text-zinc-500 font-sans mt-0.5">Keeps high-intensity heat from building up next to siding</p>
                      </div>
                    </div>
                    <span className={`text-[10px] font-mono px-2 py-0.5 rounded ${assessment.dryBrushCleared ? 'bg-emerald-950/40 text-emerald-400' : 'bg-rose-950/40 text-rose-400 border border-rose-500/20'}`}>
                      {assessment.dryBrushCleared ? 'Cleared' : 'Needs Clear'}
                    </span>
                  </label>
                </div>
              </div>

              <div className="flex justify-end pt-2 border-t border-white/5">
                <button
                  type="button"
                  onClick={handleReset}
                  className="flex items-center gap-1.5 text-xs text-zinc-500 hover:text-white font-mono uppercase tracking-wider transition-colors cursor-pointer"
                >
                  <RefreshCw size={12} />
                  Reset diagnostic
                </button>
              </div>

            </div>
          </div>

          {/* Right Column: Visual Indicator Score Dial & Recommendations (5 cols) */}
          <div className="lg:col-span-5 h-full">
            <div className="glass-panel-heavy p-6 rounded-2xl text-center border border-white/10 shadow-2xl relative">
              
              {/* Glowing color orbs */}
              <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 rounded-full blur-3xl opacity-15 pointer-events-none transition-all duration-500 ${
                severity === 'CRITICAL' ? 'bg-rose-500' : severity === 'MODERATE' ? 'bg-amber-500' : 'bg-emerald-500'
              }`} />

              <h3 className="text-xs font-bold font-mono text-zinc-400 uppercase tracking-[0.2em] mb-6 block">Diagnostic Outcome</h3>

              {/* Dial score presentation */}
              <div className="relative flex flex-col items-center justify-center my-6">
                
                {/* Score Dial Wrapper SVGs */}
                <div className="w-44 h-44 relative flex items-center justify-center">
                  <svg className="w-full h-full transform -rotate-90">
                    {/* Background Track Circle */}
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      className="stroke-white/5"
                      strokeWidth="12"
                      fill="transparent"
                    />
                    {/* Dynamic Bar Circle */}
                    <circle
                      cx="88"
                      cy="88"
                      r="76"
                      strokeDasharray={2 * Math.PI * 76}
                      strokeDashoffset={2 * Math.PI * 76 * (1 - score / 100)}
                      className={`transition-all duration-700 ease-out ${
                        severity === 'CRITICAL' ? 'stroke-rose-500' : severity === 'MODERATE' ? 'stroke-amber-500' : 'stroke-emerald-400'
                      }`}
                      strokeWidth="12"
                      strokeLinecap="round"
                      fill="transparent"
                    />
                  </svg>
                  
                  {/* Inside dial text overlay */}
                  <div className="absolute flex flex-col items-center justify-center">
                    <span className="text-4xl font-extrabold text-white font-display tracking-tight drop-shadow-md">
                      {score}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono tracking-widest uppercase">Score</span>
                  </div>
                </div>

                {/* Badge layout */}
                <div className="mt-4">
                  <span className={`px-4 py-1.5 rounded-full font-mono font-bold text-xs uppercase tracking-wider block border ${
                    severity === 'CRITICAL' 
                      ? 'bg-rose-955/60 text-rose-400 border-rose-500/20 shadow-[0_0_15px_rgba(239,68,68,0.2)]' 
                      : severity === 'MODERATE' 
                        ? 'bg-amber-955/60 text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]' 
                        : 'bg-emerald-955/60 text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(52,211,153,0.2)]'
                  }`}>
                    {severity} THREAT LEVEL
                  </span>
                </div>
              </div>

              {/* Description message box */}
              <div className="mt-6 p-4 rounded-xl border border-white/5 bg-white/[0.01] text-left">
                {severity === 'CRITICAL' ? (
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    <AlertTriangle className="inline-block text-rose-500 mr-1 shrink-0 align-text-bottom animate-bounce" size={14} />
                    <strong className="text-white">Actions highly recommended!</strong> Your evergreen canopies are extremely close, gutters might be loaded with highly flammable dry spruce, or evergreens are severely underlimbed. A forest match or embers could ignite immediately.
                  </p>
                ) : severity === 'MODERATE' ? (
                  <p className="text-xs text-zinc-300 leading-relaxed font-sans">
                    <AlertTriangle className="inline-block text-amber-500 mr-1 shrink-0 align-text-bottom" size={14} />
                    <strong className="text-white">Vulnerability detected.</strong> General preventative fuel thinning required. Trimming lower branches and vacuuming out thick evergreen needles will substantially block spot embers.
                  </p>
                ) : (
                  <p className="text-xs text-emerald-400 leading-relaxed font-sans">
                    <CheckCircle className="inline-block text-emerald-400 mr-1 shrink-0 align-text-bottom" size={14} />
                    <strong className="text-white">Defensible Space Excellent!</strong> Your property conforms comfortably to the primary CSFD guidance. Regular fall needle cleans and branch grooming are sufficient.
                  </p>
                )}
              </div>

              {/* Apply recommendations option Button */}
              {severity !== 'LOW' && (
                <div className="mt-6 pt-4 border-t border-white/5">
                  <button
                    type="button"
                    onClick={handleApplyRecommends}
                    className="w-full h-11 bg-orange-650 hover:bg-orange-650/90 text-white font-bold rounded-xl text-xs uppercase tracking-widest tracking-wider shadow-[0_4px_16px_rgba(249,115,22,0.3)] transition-all cursor-pointer flex items-center justify-center gap-1.5"
                  >
                    Resolve Vulnerabilities
                    <ArrowRight size={13} className="animate-pulse" />
                  </button>
                  <p className="text-[10px] text-zinc-500 font-sans mt-2">
                    Applies proper mitigations to your estimable service basket immediately.
                  </p>
                </div>
              )}

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
