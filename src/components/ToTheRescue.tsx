import { Phone, Calendar, HeartHandshake, ShieldAlert, Sparkles, CheckCircle } from 'lucide-react';
import { motion } from 'motion/react';

interface ToTheRescueProps {
  onOpenBooking: () => void;
  onOpenCalculator: () => void;
}

export default function ToTheRescue({ onOpenBooking, onOpenCalculator }: ToTheRescueProps) {
  return (
    <section className="bg-[#050505] text-[#f4f4f5] py-20 px-6 md:px-12 border-b border-white/5 relative overflow-hidden" id="to-the-rescue">
      {/* Background radial highlight */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-96 h-96 rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />
      <div className="absolute top-1/3 right-10 w-80 h-80 rounded-full bg-amber-500/5 blur-[100px] pointer-events-none" />

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          
          {/* Left Column: Copywriting & Brush Pile Photo */}
          <div className="lg:col-span-7 space-y-8 flex flex-col justify-between h-full">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="p-1 px-2.5 rounded-full border border-blue-500/30 bg-blue-500/10 text-blue-400 font-mono text-[10px] uppercase tracking-wider flex items-center gap-1.5 backdrop-blur-md">
                  <HeartHandshake size={11} />
                  Your Local Wildfire Partner
                </div>
              </div>
              
              <h2 className="text-4xl md:text-5xl font-black tracking-tight text-white uppercase font-display mb-6">
                To The Rescue <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Program</span>
              </h2>
              
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-sans font-light max-w-2xl">
                <strong className="text-white font-medium">Springs Exterior Home Services</strong> is your trusted neighborhood team dedicated to safeguarding your home. We specialize in the low-cost removal of dead branches, hazardous shrubs, pine needle accumulations, and organic wildfire fuels.
              </p>
              
              <p className="text-zinc-400 text-base md:text-lg leading-relaxed font-sans font-light max-w-2xl mt-4">
                We safely clear, trim, and stack branches into neat, 100% compliant <strong className="text-blue-400 font-medium">5x5x5 stacking zones</strong>. This perfectly staging your green waste according to the Colorado Springs Fire Department (CSFD) guidelines, so the community chipping crew can easily shred and haul it away.
              </p>
              
              {/* Compliance list for 5x5x5 brush piles */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-6">
                {[
                  "Branches up to 9 inches in diameter",
                  "Stacked with cut ends facing the street",
                  "Maximum pile depth of 5 feet",
                  "Clear distance from active power lines"
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-2.5 text-xs text-zinc-400">
                    <CheckCircle size={14} className="text-cyan-400 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Actions Panel */}
            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <button
                id="btn-rescue-book"
                onClick={onOpenBooking}
                className="px-6 py-3.5 rounded-xl bg-blue-650 hover:bg-blue-600 text-white font-semibold tracking-wide shadow-[0_4px_20px_rgba(59,130,246,0.25)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <Calendar size={16} />
                Book Free Estimate
              </button>
              <button
                id="btn-rescue-calc"
                onClick={onOpenCalculator}
                className="px-6 py-3.5 rounded-xl border border-white/10 hover:border-amber-500/50 bg-white/5 hover:bg-amber-950/20 text-zinc-300 hover:text-amber-400 font-medium tracking-wide transition-all duration-200 cursor-pointer flex items-center justify-center gap-2"
              >
                <ShieldAlert size={16} className="text-amber-400 animate-pulse" />
                Run Risk Diagnostic
              </button>
            </div>

            {/* Fine Arts Glass Card featuring Neat Brush Piles Image */}
            <div className="relative rounded-2xl overflow-hidden mt-8 max-w-2xl group border border-white/10 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
              {/* Overlay with radial fade */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10 opacity-90 transition-opacity duration-350" />
              <img
                src="/src/assets/images/2022-01-11_16-35-21_1641944131.webp"
                alt="Prepared brush pile ready for wildfire chipping"
                className="w-full h-64 md:h-72 object-cover scale-100 group-hover:scale-[1.02] duration-700 ease-out"
                referrerPolicy="no-referrer"
              />
              <div className="absolute bottom-5 left-6 right-6 z-20 flex flex-col md:flex-row md:items-end justify-between gap-4">
                <div>
                  <span className="px-2 py-0.5 bg-cyan-950/80 border border-cyan-500/30 text-cyan-400 font-mono text-[9px] font-bold uppercase rounded tracking-wider mb-2 inline-block">
                    PRO PACKING STANDARD
                  </span>
                  <h4 className="text-lg font-bold text-white font-display">CSFD Chipping Program Preparation</h4>
                  <p className="text-xs text-zinc-300 font-sans mt-0.5">Meticulously layered brush sorting to optimize community safety rules.</p>
                </div>
                <div className="shrink-0 flex items-center gap-1.5 text-xs text-blue-300 bg-white/5 border border-white/10 px-3 py-1.5 rounded-full backdrop-blur-md">
                  <Sparkles size={11} className="text-blue-400" />
                  <span>CSFD Guidelines Ready</span>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Autumn Fire Department Shield Badge Card */}
          <div className="lg:col-span-5 flex flex-col items-center justify-center h-full">
            <motion.div 
              whileHover={{ y: -5, scale: 1.01 }}
              transition={{ duration: 0.3 }}
              className="relative p-8 rounded-3xl backdrop-blur-2xl bg-white/[0.02] border border-white/10 shadow-[0_16px_48px_rgba(0,0,0,0.7)] max-w-md w-full aspect-square flex flex-col items-center justify-center overflow-hidden group"
            >
              {/* Spinning background halo */}
              <div className="absolute w-[95%] h-[95%] rounded-full border border-dashed border-white/5 animate-[spin_180s_linear_infinite] pointer-events-none group-hover:border-blue-500/20" />
              <div className="absolute w-[80%] h-[80%] rounded-full bg-gradient-to-tr from-rose-500/5 to-amber-500/5 blur-2xl pointer-events-none" />
              
              {/* Image itself */}
              <img
                src="/src/assets/images/wildfire_badge_1780691042294.png"
                alt="Springs Home Services Wildfire Fire Department Shield Badge"
                className="w-full h-full object-contain relative z-10 filter drop-shadow-[0_8px_24px_rgba(0,0,0,0.6)]"
                referrerPolicy="no-referrer"
              />
              
              {/* Sub-badge Caption bar */}
              <div className="absolute bottom-6 left-0 right-0 text-center z-20">
                <p className="text-[9px] font-mono uppercase tracking-[0.2em] text-amber-400 font-bold bg-zinc-950/80 border border-amber-500/20 py-2 px-5 mx-10 rounded-full shadow-lg backdrop-blur-md">
                  ★ EST. 2026 - TO THE RESCUE ★
                </p>
              </div>
            </motion.div>
            
            {/* Rapid Info Block */}
            <div className="max-w-md w-full mt-6 grid grid-cols-2 gap-4">
              <div className="p-4 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/5 text-center">
                <h5 className="text-[10px] text-zinc-500 font-semibold uppercase font-mono tracking-wider">Colorado Springs</h5>
                <p className="text-sm font-bold text-white mt-0.5">Mitigation Protocol</p>
              </div>
              <div className="p-4 rounded-xl backdrop-blur-md bg-white/[0.03] border border-white/5 text-center">
                <h5 className="text-[10px] text-zinc-500 font-semibold uppercase font-mono tracking-wider">Stack Guidelines</h5>
                <p className="text-sm font-bold text-white mt-0.5">100% Match</p>
              </div>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
