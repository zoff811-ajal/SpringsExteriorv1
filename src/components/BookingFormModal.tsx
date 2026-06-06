import { useState, useEffect, FormEvent } from 'react';
import { X, Calendar, DollarSign, CheckCircle2, ChevronRight, FileText, LayoutList } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Booking } from '../types';

interface BookingFormModalProps {
  isOpen: boolean;
  onClose: () => void;
  initialServices: string[];
  initialCost: number;
  onNewBookingAdded: () => void;
}

export default function BookingFormModal({ isOpen, onClose, initialServices, initialCost, onNewBookingAdded }: BookingFormModalProps) {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
    city: "Colorado Springs" as any,
    date: "",
    notes: ""
  });

  const [selectedServices, setSelectedServices] = useState<string[]>([]);
  const [estimatedCost, setEstimatedCost] = useState<number>(0);
  const [isSuccess, setIsSuccess] = useState<boolean>(false);
  const [createdBooking, setCreatedBooking] = useState<Booking | null>(null);

  // Synchronize initial selections from main App pages
  useEffect(() => {
    if (isOpen) {
      setSelectedServices(initialServices.length > 0 ? initialServices : ["Wildfire Fuel Mitigation & Stacking"]);
      setEstimatedCost(initialCost > 0 ? initialCost : 199);
      setIsSuccess(false);
      setCreatedBooking(null);
    }
  }, [isOpen, initialServices, initialCost]);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    
    // Create new robust booking record
    const newBooking: Booking = {
      id: "SRV-" + Math.floor(100000 + Math.random() * 900000),
      name: formData.name,
      email: formData.email,
      phone: formData.phone,
      address: formData.address,
      city: formData.city,
      date: formData.date || new Date(Date.now() + 86450000 * 3).toISOString().split('T')[0], // default 3 days out
      services: selectedServices,
      notes: formData.notes,
      status: 'Pending Review',
      estimatedCost: estimatedCost
    };

    // Store in LocalStorage
    const existingBookingsStr = localStorage.getItem('springs_bookings');
    const existingBookings = existingBookingsStr ? JSON.parse(existingBookingsStr) : [];
    const updatedBookings = [newBooking, ...existingBookings];
    localStorage.setItem('springs_bookings', JSON.stringify(updatedBookings));

    setCreatedBooking(newBooking);
    setIsSuccess(true);
    onNewBookingAdded(); // trigger reload on App level

    // Clear form
    setFormData({
      name: "",
      email: "",
      phone: "",
      address: "",
      city: "Colorado Springs",
      date: "",
      notes: ""
    });
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/80 backdrop-blur-md cursor-pointer"
          />

          {/* Modal Container */}
          <motion.div
            initial={{ scale: 0.95, opacity: 0, y: 15 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.95, opacity: 0, y: 15 }}
            transition={{ type: "spring", damping: 25, stiffness: 350 }}
            className="glass-panel-heavy rounded-3xl border border-white/10 max-w-lg w-full overflow-hidden shadow-2xl relative z-10 max-h-[90vh] flex flex-col text-white"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-black/20 shrink-0">
              <div className="flex items-center gap-2">
                <Calendar className="text-blue-400" size={18} />
                <h3 className="font-bold text-lg font-display uppercase tracking-tight">Free Estimate Schedule</h3>
              </div>
              <button
                id="btn-close-modal"
                onClick={onClose}
                className="p-1 rounded-full text-zinc-400 hover:text-white hover:bg-white/5 transition-colors cursor-pointer"
              >
                <X size={18} />
              </button>
            </div>

            {/* Scrollable Body */}
            <div className="p-6 overflow-y-auto flex-1">
              {!isSuccess ? (
                <form id="form-booking" onSubmit={handleSubmit} className="space-y-5">
                  
                  {/* General Info */}
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5Col">
                      <label className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Your Full Name</label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="John Doe"
                        className="w-full h-11 bg-white/[0.02] border border-white/10 rounded-xl px-3.5 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Email Address</label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="johndoe@gmail.com"
                        className="w-full h-11 bg-white/[0.02] border border-white/10 rounded-xl px-3.5 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Phone Number</label>
                      <input
                        type="tel"
                        required
                        value={formData.phone}
                        onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                        placeholder="(719) 555-0123"
                        className="w-full h-11 bg-white/[0.02] border border-white/10 rounded-xl px-3.5 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Preferred Schedule Date</label>
                      <input
                        type="date"
                        required
                        value={formData.date}
                        min={new Date().toISOString().split('T')[0]}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="w-full h-11 bg-white/[0.02] border border-white/10 rounded-xl px-3.5 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors"
                      />
                    </div>
                  </div>

                  {/* Address Details */}
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="sm:col-span-2 space-y-1.5">
                      <label className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Street Address</label>
                      <input
                        type="text"
                        required
                        value={formData.address}
                        onChange={(e) => setFormData({ ...formData, address: e.target.value })}
                        placeholder="123 Cheyenne Mountain Rd"
                        className="w-full h-11 bg-white/[0.02] border border-white/10 rounded-xl px-3.5 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors placeholder:text-zinc-600"
                      />
                    </div>
                    <div className="space-y-1.5">
                      <label className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Colorado City Zone</label>
                      <select
                        value={formData.city}
                        onChange={(e) => setFormData({ ...formData, city: e.target.value as any })}
                        className="w-full h-11 bg-zinc-900 border border-white/10 rounded-xl px-3 text-sm focus:outline-none focus:border-blue-500 text-white transition-colors"
                      >
                        <option value="Colorado Springs">Colorado Springs</option>
                        <option value="Broadmoor">Broadmoor</option>
                        <option value="Black Forest">Black Forest</option>
                        <option value="Monument">Monument</option>
                      </select>
                    </div>
                  </div>

                  {/* Preloaded list of selected services */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 space-y-2.5">
                    <div className="flex items-center gap-1.5 text-zinc-400 mb-1">
                      <LayoutList size={13} />
                      <span className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider">Scheduled Services Bucket</span>
                    </div>
                    <div className="space-y-1.5 max-h-24 overflow-y-auto pr-1">
                      {selectedServices.map((srvName, sIdx) => (
                        <div key={sIdx} className="text-xs text-zinc-300 flex items-center justify-between border-b border-white/5 pb-1">
                          <span>{srvName}</span>
                          <span className="text-[9px] text-blue-400 select-none">Active</span>
                        </div>
                      ))}
                    </div>
                    <div className="pt-2 flex justify-between items-center text-xs">
                      <span className="text-zinc-500">Configured cost budget:</span>
                      <strong className="text-emerald-400 font-mono font-bold font-display ml-2 flex items-center">
                        <DollarSign size={12} />
                        {estimatedCost}
                      </strong>
                    </div>
                  </div>

                  {/* Technical Notes */}
                  <div className="space-y-1.5">
                    <div className="flex justify-between items-center">
                      <label className="text-[10px] text-zinc-400 font-mono uppercase tracking-wider block">Property Conditions / Notes</label>
                      <span className="text-[9px] text-zinc-500">Optional</span>
                    </div>
                    <textarea
                      rows={2}
                      value={formData.notes}
                      onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                      placeholder="E.g. dog in back yard, extreme pine needle accumulations found in back gutters, pine limb clearance under 15 feet needed"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-xl p-3 text-xs focus:outline-none focus:border-blue-500 text-white transition-colors placeholder:text-zinc-650"
                    />
                  </div>

                  {/* Submission Disclaimer */}
                  <div className="text-[10px] text-zinc-500 font-sans leading-relaxed text-center italic">
                    By submitting, you authorize Springs Exterior Home Services to visit your site property to evaluate trees/brush. We always call/notify first.
                  </div>

                  {/* Cost Summary submit */}
                  <div className="pt-4 border-t border-white/5 flex gap-3">
                    <button
                      type="button"
                      onClick={onClose}
                      className="flex-1 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl text-xs font-semibold uppercase tracking-wider transition-all text-zinc-300 hover:text-white cursor-pointer"
                    >
                      Cancel
                    </button>
                    <button
                      type="submit"
                      className="flex-1 h-12 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-500 hover:to-cyan-500 text-white font-bold rounded-xl text-xs uppercase tracking-wider shadow-[0_4px_16px_rgba(59,130,246,0.3)] transition-all cursor-pointer"
                    >
                      Request Visit
                    </button>
                  </div>

                </form>
              ) : (
                <div className="text-center py-8 space-y-6">
                  
                  {/* Glowing success ring */}
                  <div className="flex justify-center relative">
                    <div className="absolute w-16 h-16 rounded-full bg-emerald-500/10 blur-xl pointer-events-none" />
                    <CheckCircle2 size={54} className="text-emerald-400 relative z-10 animate-[bounce_1.5s_infinite]" />
                  </div>

                  <div className="space-y-2">
                    <h4 className="text-2xl font-bold font-display text-white uppercase">Reservation Staged!</h4>
                    <p className="text-sm text-zinc-400 font-sans font-light max-w-md mx-auto">
                      Thank you, <strong className="text-zinc-200">{createdBooking?.name}</strong>. Your estimate request for <strong className="text-zinc-200">{createdBooking?.city}</strong> has been saved directly to local database records.
                    </p>
                  </div>

                  {/* Summary card */}
                  <div className="p-4 rounded-2xl bg-white/[0.02] border border-white/5 text-left text-xs space-y-2.5 max-w-sm mx-auto">
                    <div className="text-[10px] font-mono text-zinc-500 uppercase pb-1 border-b border-white/5 flex justify-between">
                      <span>Ref Code</span>
                      <strong className="text-blue-400">{createdBooking?.id}</strong>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Target Date:</span>
                      <span className="font-mono text-zinc-300">{createdBooking?.date}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Project Address:</span>
                      <span className="text-zinc-300 truncate max-w-[200px]">{createdBooking?.address}, {createdBooking?.city}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-zinc-400">Status Indicator:</span>
                      <span className="px-1.5 py-0.5 bg-yellow-950/40 text-yellow-400 font-bold uppercase rounded font-mono text-[9px] border border-yellow-500/10">
                        {createdBooking?.status}
                      </span>
                    </div>
                    <div className="flex justify-between pt-1 border-t border-white/5 font-semibold text-white">
                      <span>Cost Budget Estimate:</span>
                      <span className="text-emerald-400 font-mono">${createdBooking?.estimatedCost}</span>
                    </div>
                  </div>

                  <p className="text-[11px] text-zinc-500 italic max-w-sm mx-auto">
                    A technical representative will contact you at <strong className="text-zinc-400 font-normal">{createdBooking?.phone}</strong> within 12 hours. You can review and track your booking on our interactive dashboard.
                  </p>

                  <button
                    type="button"
                    onClick={onClose}
                    className="h-11 px-8 bg-zinc-900 border border-white/10 text-zinc-300 hover:text-white rounded-xl text-xs uppercase tracking-widest transition-colors cursor-pointer"
                  >
                    Close Drawer
                  </button>

                </div>
              )}
            </div>

          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
