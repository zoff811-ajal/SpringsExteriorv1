import { useState } from 'react';
import { Flame, Droplet, Sparkles, ShowerHead as Shower, Gavel, CheckCircle2, Sliders, ChevronRight } from 'lucide-react';
import { motion } from 'motion/react';

interface ServicesSectionProps {
  onSelectServices: (selected: string[], calculatedCost: number) => void;
  onOpenBooking: () => void;
}

const SERVICES = [
  {
    id: "mitigation",
    name: "Wildfire Fuel Mitigation & Stacking",
    short: "CSFD-compliant brush trimming and 5x5x5 stacking.",
    desc: "We clear dry deadfall, trim low-hanging evergreen limbs up to 15ft, prune flammable junipers, and stack all materials into approved 5x5x5 piles ready for the community chipping crews.",
    basePrice: 199,
    unitName: "property zones",
    unitMultiplier: 120,
    maxUnits: 5,
    minUnits: 1,
    icon: Flame,
    color: "from-orange-500/10 to-red-500/10 text-orange-400 border-orange-500/20"
  },
  {
    id: "needles",
    name: "Pine Needle Removal & Gutter Clear",
    short: "Roof, gutter, and deck combustible fuel clearance.",
    desc: "Pine needles are highly combustible igniters. We blow, scoop, and safely bag all rooftop and gutter evergreen debris, then clear a 5-foot non-combustible defense perimeter around your foundation.",
    basePrice: 125,
    unitName: "linear feet of gutter",
    unitMultiplier: 1.5,
    maxUnits: 300,
    minUnits: 40,
    icon: Gavel,
    color: "from-amber-500/10 to-yellow-500/10 text-amber-400 border-amber-500/20"
  },
  {
    id: "window",
    name: "Squeegee Window Cleansing",
    short: "Crystal-clear exterior and interior glass washing.",
    desc: "Reveal gorgeous Colorado alpine views. We utilize eco-friendly deep cleaners, professional brass squeegees, and lint-free microfiber towels to detail screens, tracks, and pane frames.",
    basePrice: 110,
    unitName: "panes of glass",
    unitMultiplier: 8,
    maxUnits: 45,
    minUnits: 5,
    icon: Sparkles,
    color: "from-cyan-500/10 to-blue-500/10 text-cyan-400 border-cyan-500/20"
  },
  {
    id: "pressure",
    name: "Heavy-Duty Pressure Washing",
    short: "High-pressure restoration of decks, patios, and drives.",
    desc: "Deep dirt and moss accumulation can degrade siding and decking. We blast away dirt, grease, mold, and tree sap from concrete driveways, stone patios, cedar decks, and composite surfaces.",
    basePrice: 150,
    unitName: "sq. feet of surface",
    unitMultiplier: 0.25,
    maxUnits: 2000,
    minUnits: 200,
    icon: Droplet,
    color: "from-blue-500/10 to-indigo-500/10 text-blue-400 border-blue-500/20"
  }
];

export default function ServicesSection({ onSelectServices, onOpenBooking }: ServicesSectionProps) {
  // Config state for estimator
  const [selectedServices, setSelectedServices] = useState<string[]>(["mitigation"]);
  const [quantities, setQuantities] = useState<Record<string, number>>({
    mitigation: 1,
    needles: 100,
    window: 15,
    pressure: 500
  });

  const toggleService = (id: string) => {
    if (selectedServices.includes(id)) {
      setSelectedServices(selectedServices.filter(s => s !== id));
    } else {
      setSelectedServices([...selectedServices, id]);
    }
  };

  const handleQtyChange = (id: string, val: number) => {
    setQuantities({
      ...quantities,
      [id]: val
    });
  };

  // Calculator
  const calculateTotalCost = () => {
    let sum = 0;
    SERVICES.forEach(srv => {
      if (selectedServices.includes(srv.id)) {
        const qty = quantities[srv.id] || srv.minUnits;
        sum += srv.basePrice + (qty - srv.minUnits) * srv.unitMultiplier;
      }
    });
    return Math.round(sum);
  };

  const currentTotal = calculateTotalCost();

  const handleApplyEstimate = () => {
    const serviceNames = SERVICES
      .filter(s => selectedServices.includes(s.id))
      .map(s => `${s.name} (~${quantities[s.id]} ${s.unitName})`);
    onSelectServices(serviceNames, currentTotal);
    onOpenBooking();
  };

  return (
    <section className="bg-[#050505] text-[#f4f4f5] py-24 px-6 md:px-12 border-b border-white/5 relative" id="services">
      {/* Background ambient orb */}
      <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-[500px] h-[500px] rounded-full bg-blue-500/5 blur-[120px] pointer-events-none" />

      <div className="max-w-7xl mx-auto">
        
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <span className="text-blue-400 font-mono text-xs uppercase tracking-[0.2em] font-semibold bg-blue-500/5 border border-blue-500/10 px-3 py-1 rounded-full">
            OUR CAPABILITIES
          </span>
          <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight font-display text-white uppercase mt-4 mb-6">
            EXTERIOR PROPERTY SERVICES
          </h2>
          <p className="text-zinc-400 text-base md:text-lg font-light font-sans max-w-xl mx-auto leading-relaxed">
            High-performance property maintenance designed for mountain homes. Prevent wildfire spread while keeping your home's exterior clean, bright, and structural integrity high.
          </p>
        </div>

        {/* Double-Feature Graphics Card (Direct application of generated images) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-16">
          
          {/* Deck Wash & Window Clean Double Screen */}
          <div className="relative rounded-2xl overflow-hidden group border border-white/10 aspect-video md:aspect-auto md:h-80 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30 z-10 opacity-85" />
            <img 
              src="/src/assets/images/exterior_wash_1780691122683.png" 
              alt="High pressure patio washing and squeegee window cleaning details"
              className="w-full h-full object-cover scale-100 group-hover:scale-105 duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
              <span className="px-2.5 py-0.5 bg-blue-500/20 text-blue-400 border border-blue-500/30 text-[10px] font-mono rounded font-semibold w-fit tracking-wider mb-2 uppercase">
                Restorative Cleaning
              </span>
              <h3 className="text-lg font-bold text-white font-display">Power Washing & Window Squeegee</h3>
              <p className="text-xs text-zinc-300 font-sans mt-1 max-w-md">
                Premium high-pressure spray deep clears patios and decks while specialized brass squeegees restore streak-free, crystal-clear glass windows.
              </p>
            </div>
          </div>

          {/* Cozy cabins & forest mitigation */}
          <div className="relative rounded-2xl overflow-hidden group border border-white/10 aspect-video md:aspect-auto md:h-80 shadow-[0_8px_32px_rgba(0,0,0,0.5)]">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-black/30 z-10 opacity-85" />
            <img 
              src="/src/assets/images/forest_mitigated_1780691145220.png" 
              alt="Cozy cabins in fire-mitigated forests"
              className="w-full h-full object-cover scale-100 group-hover:scale-105 duration-700 ease-out"
              referrerPolicy="no-referrer"
            />
            <div className="absolute inset-0 z-20 p-6 flex flex-col justify-end">
              <span className="px-2.5 py-0.5 bg-emerald-500/20 text-emerald-400 border border-emerald-500/30 text-[10px] font-mono rounded font-semibold w-fit tracking-wider mb-2 uppercase">
                Wildfire Preparedness
              </span>
              <h3 className="text-lg font-bold text-white font-display">Defensible Space Cabin Mitigations</h3>
              <p className="text-xs text-zinc-300 font-sans mt-1 max-w-md">
                Protect Colorado forest structures. We design dry branch clearances, clean thick needle accumulations from gutters, and build elegant 5-foot ember defense footprints.
              </p>
            </div>
          </div>

        </div>

        {/* Main interactive section: Bento Details + Right Column Interactive Cost Calculator */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Services Bento Grid (8 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <h3 className="text-xs font-mono uppercase tracking-[0.2em] text-zinc-500 mb-4 font-bold">Mitigation & Restoration Services Details</h3>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {SERVICES.map((srv) => {
                const Icon = srv.icon;
                const isSelected = selectedServices.includes(srv.id);
                return (
                  <div
                    key={srv.id}
                    onClick={() => toggleService(srv.id)}
                    className={`p-6 rounded-2xl text-left border cursor-pointer transition-all duration-300 flex flex-col justify-between h-72 ${
                      isSelected 
                        ? 'bg-white/[0.04] border-blue-500/60 shadow-[0_0_20px_rgba(59,130,246,0.15)] text-white' 
                        : 'bg-white/[0.01] border-white/5 text-zinc-400 hover:border-white/15 hover:bg-white/[0.02]'
                    }`}
                  >
                    <div>
                      <div className={`p-2.5 rounded-xl border w-fit mb-4 bg-gradient-to-br ${srv.color}`}>
                        <Icon size={18} />
                      </div>
                      <h4 className={`text-base font-bold font-display ${isSelected ? 'text-white' : 'text-zinc-200'}`}>
                        {srv.name}
                      </h4>
                      <p className="text-xs text-zinc-400 font-sans font-light mt-2 line-clamp-3">
                        {srv.desc}
                      </p>
                    </div>
                    
                    <div className="pt-4 border-t border-white/5 flex items-center justify-between text-xs font-mono mt-2">
                      <span className="text-zinc-500">From ${srv.basePrice}</span>
                      <span className={`font-semibold uppercase tracking-wider flex items-center gap-1 ${isSelected ? 'text-blue-400' : 'text-zinc-500'}`}>
                        {isSelected ? 'Selected' : 'Click to Select'}
                        <ChevronRight size={10} />
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Right Column: Premium Interactive Cost Estimator (5 cols) */}
          <div className="lg:col-span-5">
            <div className="glass-panel-heavy p-6 rounded-2xl relative shadow-2xl overflow-hidden border border-white/10">
              
              {/* Decorative accent light */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl pointer-events-none" />
              
              <div className="flex items-center justify-between mb-4 pb-2 border-b border-white/5">
                <div className="flex items-center gap-2">
                  <Sliders className="text-blue-400" size={16} />
                  <h3 className="font-bold text-base font-display">Real-Time Price Estimator</h3>
                </div>
                <span className="font-mono text-[10px] text-zinc-500 uppercase">Interactive</span>
              </div>

              <p className="text-xs text-zinc-400 font-sans font-light mb-6">
                Check services and change target sizes to calculate a dynamic budget estimate for Colorado Springs property services.
              </p>

              {/* Slider list */}
              <div className="space-y-5">
                {SERVICES.map((srv) => {
                  const isSelected = selectedServices.includes(srv.id);
                  const qty = quantities[srv.id] || srv.minUnits;
                  
                  return (
                    <div key={srv.id} className={`transition-all duration-300 ${isSelected ? 'opacity-100' : 'opacity-40'}`}>
                      <div className="flex items-center justify-between mb-1">
                        <label className="text-xs font-medium text-zinc-200 truncate pr-2 flex items-center gap-1.5">
                          <input 
                            type="checkbox"
                            checked={isSelected}
                            onChange={() => toggleService(srv.id)}
                            className="accent-blue-500 rounded border-white/20 select-none"
                          />
                          <span className="cursor-pointer" onClick={() => toggleService(srv.id)}>
                            {srv.id === 'mitigation' ? 'Wildfire Prep' : srv.id === 'needles' ? 'Pine Needles' : srv.id === 'window' ? 'Window Wash' : 'Pressure Wash'}
                          </span>
                        </label>
                        <span className="font-mono text-[11px] text-cyan-400 bg-white/5 px-2 py-0.5 rounded border border-white/5 shrink-0">
                          {qty} {srv.id === 'mitigation' ? 'Zones' : srv.id === 'needles' ? 'Ft' : srv.id === 'window' ? 'Panes' : 'SqFt'}
                        </span>
                      </div>
                      
                      {isSelected && (
                        <div className="pl-5">
                          <input
                            type="range"
                            min={srv.minUnits}
                            max={srv.maxUnits}
                            step={srv.id === 'pressure' ? 50 : 1}
                            value={qty}
                            onChange={(e) => handleQtyChange(srv.id, parseFloat(e.target.value))}
                            className="w-full accent-blue-500 h-1 bg-white/10 rounded-lg appearance-none cursor-pointer"
                          />
                          <div className="flex justify-between text-[9px] text-zinc-500 font-mono mt-1">
                            <span>Min: {srv.minUnits}</span>
                            <span>Max: {srv.maxUnits}</span>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Estimate Total Summary */}
              <div className="mt-8 pt-6 border-t border-white/10 space-y-4">
                <div className="flex items-end justify-between">
                  <div>
                    <span className="text-[10px] text-zinc-500 font-mono uppercase tracking-widest block">Project Budget Estimate</span>
                    <span className="text-xs text-zinc-400 font-sans">Includes labor and clean workspace</span>
                  </div>
                  <div className="text-right">
                    <span className="text-3xl font-black text-white font-display drop-shadow-[0_2px_10px_rgba(59,130,246,0.3)]">
                      ${currentTotal}
                    </span>
                    <span className="text-[10px] text-zinc-500 font-mono block">Estimated Total</span>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={handleApplyEstimate}
                  disabled={selectedServices.length === 0}
                  className="w-full mt-2 h-12 bg-blue-600 hover:bg-blue-500 disabled:bg-zinc-800 disabled:text-zinc-600 text-white font-bold rounded-xl text-xs uppercase tracking-widest tracking-wider shadow-[0_4px_16px_rgba(59,130,246,0.3)] hover:shadow-[0_4px_24px_rgba(59,130,246,0.55)] transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  Apply & Schedule Estimate
                  <ChevronRight size={14} className="animate-pulse" />
                </button>
              </div>

            </div>
          </div>

        </div>

      </div>
    </section>
  );
}
