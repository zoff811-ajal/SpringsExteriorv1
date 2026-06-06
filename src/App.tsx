import { useState, useEffect } from 'react';
import { Calendar, Layers, ShieldCheck, HelpCircle, MapPin, Trash2, Clock, Check, RefreshCw, Star, ArrowUpRight, Flame, Droplet, Sparkles, Sliders } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import HeaderVideoHero from './components/HeaderVideoHero';
import ToTheRescue from './components/ToTheRescue';
import ServicesSection from './components/ServicesSection';
import RiskAssessmentCalculator from './components/RiskAssessmentCalculator';
import BookingFormModal from './components/BookingFormModal';
import { Booking } from './types';

// Sample feedback reviews for real-world proof-of-work
const CUSTOMER_REVIEWS = [
  {
    author: "Douglas M.",
    location: "Black Forest",
    rating: 5,
    text: "Saved us weeks of manual labor. Our property has tall ponderosa pines right next to the driveway. Springs Exterior cleared the ladder fuels, stacked the branches in immaculate 5x5x5 piles, and power washed our wood deck. The CSFD crew shredded the piles the following Tuesday without a hitch!",
    date: "May 2026"
  },
  {
    author: "Sarah K.",
    location: "Broadmoor",
    rating: 5,
    text: "Outstanding window and gutter cleaning service! We had five years of thick pine needle build-up. The team blew the roof, cleaned the screens, and detailed the window panes until they shined. Extremely polite, professional, and quick.",
    date: "April 2026"
  }
];

export default function App() {
  // Booking Modal States
  const [isBookingOpen, setIsBookingOpen] = useState<boolean>(false);
  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [calculatedCost, setCalculatedCost] = useState<number>(0);

  // Homeowner Bookings list from LocalStorage
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [localTime, setLocalTime] = useState<string>("");

  // Load and refresh bookings
  const fetchBookings = () => {
    try {
      const stored = localStorage.getItem('springs_bookings');
      if (stored) {
        setBookings(JSON.parse(stored));
      } else {
        setBookings([]);
      }
    } catch {
      setBookings([]);
    }
  };

  useEffect(() => {
    fetchBookings();

    // Setup dynamic Mountain timezone timer (Colorado Time)
    const updateTime = () => {
      const options: Intl.DateTimeFormatOptions = {
        timeZone: "America/Denver",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: false
      };
      const formatted = new Intl.DateTimeFormat([], options).format(new Date());
      setLocalTime(formatted);
    };

    updateTime();
    const timer = setInterval(updateTime, 1000);
    return () => clearInterval(timer);
  }, []);

  const handleOpenBooking = () => {
    setIsBookingOpen(true);
  };

  const handleSelectServices = (services: string[], cost: number) => {
    setSelectedServices(services);
    setCalculatedCost(cost);
  };

  const handleApplyMitigation = (recommendation: string, budget: number) => {
    setSelectedServices(["Wildfire Fuel Mitigation & Stacking", recommendation]);
    setCalculatedCost(budget);
  };

  const handleCancelBooking = (id: string) => {
    const freshBookings = bookings.filter(b => b.id !== id);
    localStorage.setItem('springs_bookings', JSON.stringify(freshBookings));
    fetchBookings();
  };

  const seedSampleBooking = () => {
    const sample: Booking = {
      id: "SRV-SAMPLE",
      name: "Jeffery Lindenmier",
      email: "jeffery.lindenmier@gmail.com",
      phone: "(719) 555-5201",
      address: "1825 Broadmoor Valley Road",
      city: "Broadmoor",
      date: new Date(Date.now() + 86450000 * 5).toISOString().split('T')[0],
      services: ["Wildfire Fuel Mitigation & Stacking (CSFD Preparedness)", "Pine Needle Removal & Gutter Clear"],
      notes: "Need help raising evergreen tree underbranches up to fifteen feet and blowing thick needles off wood shake roof valleys.",
      status: 'Scheduled',
      estimatedCost: 350
    };
    localStorage.setItem('springs_bookings', JSON.stringify([sample]));
    fetchBookings();
  };

  return (
    <div className="bg-[#050505] text-[#f4f4f5] min-h-screen font-sans overflow-x-hidden selection:bg-blue-600 selection:text-white">
      
      {/* Absolute Frosted Navigation Bar */}
      <nav className="absolute top-0 left-0 right-0 h-20 px-6 md:px-12 flex items-center justify-between z-30 backdrop-blur-md bg-[#050505]/40 border-b border-white/5">
        <a href="#hero-section" className="flex items-center gap-2 group">
          <div className="w-[75px] h-[75px] rounded-lg overflow-hidden border border-white/20 scale-95 group-hover:scale-100 transition-transform">
            <img 
              src="/src/assets/images/springs_logo_1780691018653.png" 
              alt="Springs Home Services badge logo icon" 
              className="object-cover scale-110"
              style={{ width: '75px', height: '75px' }}
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="text-white font-display text-sm font-black tracking-widest uppercase transition-all group-hover:text-cyan-400">
            SPRINGS <span className="font-light italic text-zinc-400">EXTERIOR</span>
          </span>
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex gap-8 text-[11px] font-semibold tracking-widest uppercase text-zinc-400">
          <a href="#the-process" className="hover:text-white transition-colors">Process</a>
          <a href="#services" className="hover:text-white transition-colors">Services</a>
          <a href="#risk-calculator" className="hover:text-white transition-colors">Risk Diagnostic</a>
          <a href="#to-the-rescue" className="hover:text-white transition-colors font-semibold text-amber-400">CSFD Stacking</a>
        </div>

        {/* Booking trigger right */}
        <div className="flex items-center gap-4">
          <button
            id="nav-btn-book"
            onClick={handleOpenBooking}
            className="px-4 py-2 rounded-lg backdrop-blur-md bg-white/5 border border-white/10 hover:border-blue-500 hover:bg-blue-600/10 text-white text-[11px] font-bold tracking-widest uppercase transition-all cursor-pointer"
          >
            Schedule Estimate
          </button>
        </div>
      </nav>

      {/* Main Video Hero Section */}
      <HeaderVideoHero onOpenBooking={handleOpenBooking} />

      {/* Main Interactive Row / Content Grid */}
      <main className="w-full relative">
        
        {/* The 3-Step Process section (How it Works) */}
        <section id="the-process" className="py-24 px-6 md:px-12 border-b border-white/5 relative">
          <div className="max-w-7xl mx-auto">
            
            {/* Context Heading */}
            <div className="mb-16 max-w-xl">
              <span className="font-mono text-[10px] uppercase text-zinc-500 tracking-[0.25em] font-semibold block mb-2">High-Performance Pipeline</span>
              <h2 className="text-3xl md:text-4xl font-extrabold font-display uppercase tracking-tight text-white">
                Our Seamless 3-Step Process
              </h2>
              <div className="h-0.5 w-20 bg-blue-500/50 mt-4 rounded-full" />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/10 rounded-2xl overflow-hidden p-px shadow-2xl">
              
              {/* Step 1 */}
              <div className="bg-[#0b0b0c] p-8 md:p-10 flex flex-col justify-between group hover:bg-zinc-900/60 transition-colors duration-300">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-zinc-600 font-mono font-bold uppercase tracking-widest mb-6 block">01 / DIAGNOSTIC</span>
                    <span className="text-rose-500 font-bold text-xs uppercase bg-rose-500/10 border border-rose-500/20 px-2 py-0.5 rounded-md font-mono">Immediate</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white uppercase mb-4 group-hover:text-blue-400 transition-colors">
                    Assess Property Hazards
                  </h3>
                  <p className="text-sm text-zinc-400 font-sans font-light leading-relaxed">
                    Evaluate your evergreens' canopy distance back to siding or chimneys. Run our Wildfire Calculator or submit an online request for a technical on-site consultation.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 text-[10px] font-mono tracking-widest uppercase text-zinc-500 select-none">
                  Defensible Space Zone 1 & 2 Map
                </div>
              </div>

              {/* Step 2 */}
              <div className="bg-[#0b0b0c] p-8 md:p-10 flex flex-col justify-between group hover:bg-zinc-900/60 transition-colors duration-300">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-zinc-600 font-mono font-bold uppercase tracking-widest mb-6 block">02 / INTERVENTION</span>
                    <span className="text-blue-400 font-bold text-xs uppercase bg-blue-500/10 border border-blue-500/20 px-2 py-0.5 rounded-md font-mono">Precision</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white uppercase mb-4 group-hover:text-blue-400 transition-colors">
                    Slashed, Cleared & Brushed
                  </h3>
                  <p className="text-sm text-zinc-400 font-sans font-light leading-relaxed">
                    Our technical crews raise evergreens under branches, sweep out roofs, blow gutters clean, and arrange materials into strict CSFD-compliant 5x5x5 stacks ready for shredding.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 text-[10px] font-mono tracking-widest uppercase text-zinc-500 select-none">
                  Low hanging evergreens thinned
                </div>
              </div>

              {/* Step 3 */}
              <div className="bg-[#0b0b0c] p-8 md:p-10 flex flex-col justify-between group hover:bg-zinc-900/60 transition-colors duration-300">
                <div>
                  <div className="flex justify-between items-start">
                    <span className="text-[10px] text-zinc-600 font-mono font-bold uppercase tracking-widest mb-6 block">03 / FINAL SHINE</span>
                    <span className="text-emerald-400 font-bold text-xs uppercase bg-emerald-500/10 border border-emerald-500/20 px-2 py-0.5 rounded-md font-mono font-bold">Sparkle</span>
                  </div>
                  <h3 className="text-xl font-bold font-display text-white uppercase mb-4 group-hover:text-blue-400 transition-colors">
                    Squeegee Glass & Chipping Day
                  </h3>
                  <p className="text-sm text-zinc-400 font-sans font-light leading-relaxed">
                    The local department processes our sorted, streetside branches absolutely free on chipping days. Concurrently, we squeegee windows and wash surfaces with high dynamic water pressure.
                  </p>
                </div>
                <div className="mt-8 pt-6 border-t border-white/5 text-[10px] font-mono tracking-widest uppercase text-zinc-500 select-none">
                  Immaculate glass, zero dry rot
                </div>
              </div>

            </div>

          </div>
        </section>

        {/* Services Bento Layout Section */}
        <ServicesSection 
          onSelectServices={handleSelectServices} 
          onOpenBooking={handleOpenBooking} 
        />

        {/* Wildfire Diagnostic & Risk Tool Section */}
        <RiskAssessmentCalculator 
          onApplyMitigationRecommendation={handleApplyMitigation} 
          onOpenBooking={handleOpenBooking} 
        />

        {/* To the Rescue brush/Maltese cross section */}
        <ToTheRescue 
          onOpenBooking={handleOpenBooking} 
          onOpenCalculator={() => {
            const el = document.getElementById("risk-calculator");
            el?.scrollIntoView({ behavior: 'smooth' });
          }} 
        />

        {/* Interactive Active Bookings Review Dashboard */}
        <section className="py-20 px-6 md:px-12 bg-zinc-950/40 border-b border-white/5" id="bookings-dashboard">
          <div className="max-w-4xl mx-auto">
            
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
              <div>
                <span className="text-blue-400 font-mono text-[10px] uppercase tracking-[0.2em] font-semibold block mb-2">DURABLE RESIDENT TRACKER</span>
                <h2 className="text-3xl font-extrabold font-display uppercase tracking-tight text-white mb-2">
                  My Scheduled Mitigation Visits
                </h2>
                <p className="text-zinc-500 text-xs font-sans">
                  Private localized tracking. Tap a scheduled estimate to inspect references or cancel.
                </p>
              </div>

              <div className="flex gap-3">
                <button
                  type="button"
                  onClick={seedSampleBooking}
                  className="px-4 h-9 bg-zinc-900 hover:bg-zinc-800 text-zinc-400 hover:text-white rounded-lg text-[10px] font-mono uppercase tracking-wider border border-white/5 flex items-center gap-1.5 transition-colors cursor-pointer"
                >
                  <RefreshCw size={10} />
                  Demo Sample Record
                </button>
                <button
                  type="button"
                  onClick={fetchBookings}
                  className="p-2 bg-zinc-90 w-9 h-9 rounded-lg border border-white/5 flex items-center justify-center hover:bg-zinc-800 text-zinc-400 hover:text-white cursor-pointer"
                  title="Force Reload Bookings"
                >
                  <RefreshCw size={13} />
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <AnimatePresence mode="popLayout">
                {bookings.length > 0 ? (
                  bookings.map((b) => (
                    <motion.div
                      key={b.id}
                      initial={{ scale: 0.98, opacity: 0 }}
                      animate={{ scale: 1, opacity: 1 }}
                      exit={{ scale: 0.98, opacity: 0 }}
                      layout
                      className="glass-panel p-5 rounded-2xl border border-white/10 flex flex-col md:flex-row justify-between items-start md:items-center gap-6"
                    >
                      <div className="space-y-2 flex-1">
                        <div className="flex flex-wrap items-center gap-2">
                          <span className="text-[10px] font-mono text-zinc-500 uppercase font-bold tracking-wider">{b.id}</span>
                          <span className={`px-2 py-0.5 font-mono text-[9px] font-bold uppercase rounded border ${
                            b.status === 'Completed' 
                              ? 'bg-emerald-950/40 text-emerald-400 border-emerald-500/10'
                              : b.status === "Scheduled"
                                ? 'bg-blue-950/40 text-blue-400 border-blue-500/10'
                                : 'bg-yellow-950/40 text-yellow-500 border-yellow-500/10'
                          }`}>
                            {b.status}
                          </span>
                          <span className="text-[10px] text-zinc-500 flex items-center gap-1">
                            <MapPin size={11} className="text-zinc-600" />
                            {b.address}, {b.city}
                          </span>
                        </div>
                        <h4 className="text-base font-bold text-white">{b.name}</h4>
                        
                        {/* List of ordered items */}
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {b.services.map((s, idx) => (
                            <span key={idx} className="bg-white/[0.03] text-zinc-400 border border-white/5 rounded px-2 py-0.5 text-[9px] font-sans">
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex md:flex-col items-end gap-3 justify-between w-full md:w-auto pt-4 md:pt-0 border-t md:border-t-0 border-white/5">
                        <div className="text-left md:text-right">
                          <span className="text-[9px] text-zinc-500 font-mono uppercase block">Estimate Target</span>
                          <span className="text-xs font-bold font-mono text-zinc-300">{b.date}</span>
                        </div>
                        <div className="text-right">
                          <span className="text-[9px] text-zinc-500 font-mono uppercase block">Budget Cost</span>
                          <span className="text-base font-extrabold text-emerald-400 font-mono">${b.estimatedCost}</span>
                        </div>
                        <button
                          type="button"
                          onClick={() => handleCancelBooking(b.id)}
                          className="p-1 px-2 text-[10px] bg-red-950/20 text-red-400 hover:text-red-300 hover:bg-red-950/40 rounded border border-red-500/10 transition-colors flex items-center gap-1 cursor-pointer"
                          title="Delete Appointment"
                        >
                          <Trash2 size={11} />
                          Cancel Request
                        </button>
                      </div>
                    </motion.div>
                  ))
                ) : (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="p-10 text-center rounded-2xl border border-dashed border-white/5 bg-white/[0.01]"
                  >
                    <Layers className="mx-auto text-zinc-600 mb-3" size={24} />
                    <h4 className="text-sm font-bold text-zinc-400">No appointments thinned yet</h4>
                    <p className="text-xs text-zinc-600 font-sans mt-1 max-w-sm mx-auto">
                      Configure your preferred options inside our Pricing Estimator or click the booking trigger to queue your local inspection.
                    </p>
                    <button
                      type="button"
                      onClick={handleOpenBooking}
                      className="mt-4 px-4 py-2 bg-zinc-900 border border-white/5 text-xs font-bold text-zinc-300 hover:text-white rounded-lg transition-all cursor-pointer inline-block"
                    >
                      Schedule Free Inspection
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>
        </section>

        {/* Customer Praise / Defensible Proof */}
        <section className="py-20 px-6 md:px-12 bg-transparent relative overflow-hidden">
          <div className="max-w-6xl mx-auto">
            
            <div className="text-center max-w-xl mx-auto mb-14">
              <span className="text-cyan-400 font-mono text-[10px] uppercase tracking-[0.25em] font-semibold block mb-2">NEIGHBORHOOD RATINGS</span>
              <h2 className="text-2xl md:text-3xl font-extrabold font-display uppercase tracking-tight text-white mb-2">
                What Colorado Homeowners Say
              </h2>
              <p className="text-zinc-500 text-xs">
                Honest validation from Monument, Black Forest, and Colorado Springs.
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {CUSTOMER_REVIEWS.map((rev, rIdx) => (
                <div key={rIdx} className="p-6 rounded-2xl glass-panel relative flex flex-col justify-between h-full">
                  <div className="space-y-4">
                    <div className="flex justify-between items-center pb-2 border-b border-white/5">
                      <div>
                        <strong className="text-white text-sm block">{rev.author}</strong>
                        <span className="text-[10px] text-zinc-500 font-mono uppercase">{rev.location}, CO</span>
                      </div>
                      <span className="text-[10px] text-zinc-500 font-mono font-bold">{rev.date}</span>
                    </div>
                    <p className="text-xs text-zinc-350 leading-relaxed font-sans font-light italic">
                      "{rev.text}"
                    </p>
                  </div>
                  
                  {/* Rating Stars */}
                  <div className="flex gap-1 mt-4 text-amber-400">
                    {[...Array(5)].map((_, s) => (
                      <Star key={s} size={11} fill="currentColor" />
                    ))}
                  </div>
                </div>
              ))}
            </div>

          </div>
        </section>

      </main>

      {/* Atmospheric Frosted Glass Bottom Footer */}
      <footer className="border-t border-white/10 px-6 md:px-12 py-8 flex flex-col md:flex-row items-center justify-between text-[10px] uppercase tracking-[0.2em] text-white/40 bg-[#050505] gap-4 text-center">
        <div>© 2026 SPRINGS EXTERIOR HOME SERVICES</div>
        
        {/* Branch listing */}
        <div className="flex flex-wrap justify-center gap-3 md:gap-8 text-zinc-500">
          <span>Monument</span>
          <span>●</span>
          <span>Black Forest</span>
          <span>●</span>
          <span>Broadmoor</span>
          <span>●</span>
          <span>CO Springs</span>
        </div>
        
        <div className="flex items-center gap-2 text-zinc-300 font-mono">
          <Clock size={11} className="text-blue-400 animate-pulse" />
          <span>Mountain Time: <strong className="text-white font-mono">{localTime || "20:30:42"}</strong></span>
        </div>
      </footer>

      {/* Booking Scheduling Drawer Modal popup */}
      <BookingFormModal 
        isOpen={isBookingOpen} 
        onClose={() => setIsBookingOpen(false)} 
        initialServices={selectedServices}
        initialCost={calculatedCost}
        onNewBookingAdded={fetchBookings}
      />

    </div>
  );
}
