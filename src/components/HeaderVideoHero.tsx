import { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX } from 'lucide-react';
import { motion } from 'motion/react';

interface HeaderVideoHeroProps {
  onOpenBooking: () => void;
}

export default function HeaderVideoHero({ onOpenBooking }: HeaderVideoHeroProps) {
  const videoUrl = "/src/assets/images/Yard Transformation.mp4";
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [isMuted, setIsMuted] = useState<boolean>(true);

  const videoRef = useRef<HTMLVideoElement | null>(null);

  // Sync state with video element
  useEffect(() => {
    if (videoRef.current) {
      if (isPlaying) {
        videoRef.current.play().catch(() => {
          // Auto-play might be blocked, continue quietly
          setIsPlaying(false);
        });
      } else {
        videoRef.current.pause();
      }
    }
  }, [isPlaying]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isMuted;
    }
  }, [isMuted]);

  return (
    <section className="relative bg-black w-full overflow-hidden flex flex-col items-center justify-center min-h-[550px] lg:min-h-[650px] pt-12 pb-16 px-4 border-b border-zinc-900" id="hero-section">
      
      {/* Background Video Layer */}
      <div 
        className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden transition-all duration-700"
        style={{
          opacity: 0.45,
          filter: `blur(4px)`,
        }}
      >
        <video
          ref={videoRef}
          src={videoUrl}
          autoPlay
          loop
          muted={isMuted}
          playsInline
          className="w-full h-full object-cover scale-105"
        />
        {/* Dark radial gradient overlay for better text readability */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_40%,rgba(0,0,0,0.85)_100%)]" />
        <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-black opacity-90" />
      </div>

      {/* Floating Interactive Controls bar (Quietly embedded in bottom right) */}
      <div className="absolute bottom-4 right-4 z-20 flex gap-2 pointer-events-auto">
        <button
          id="btn-toggle-play"
          onClick={() => setIsPlaying(!isPlaying)}
          title={isPlaying ? "Pause video" : "Play video"}
          className="p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white transition-all backdrop-blur-md cursor-pointer border border-zinc-800"
        >
          {isPlaying ? <Pause size={16} /> : <Play size={16} />}
        </button>
        <button
          id="btn-toggle-mute"
          onClick={() => setIsMuted(!isMuted)}
          title={isMuted ? "Unmute audio" : "Mute audio"}
          className="p-2 rounded-full bg-zinc-900/80 hover:bg-zinc-800 text-white transition-all backdrop-blur-md cursor-pointer border border-zinc-800"
        >
          {isMuted ? <VolumeX size={16} /> : <Volume2 size={16} />}
        </button>
      </div>

      {/* Main Content Overlays */}
      <div className="relative z-10 max-w-4xl w-full flex flex-col items-center justify-center text-center">
        
        {/* Main Logo from the flyer */}
        <motion.div 
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-48 h-48 md:w-56 md:h-56 mb-8 hover:scale-105 duration-300 ease-out cursor-pointer relative"
        >
          <img
            src="/src/assets/images/springs_logo_1780691018653.png"
            alt="Springs Exterior Home Services Logo"
            className="w-full h-full object-contain filter drop-shadow-[0_4px_20px_rgba(30,144,255,0.4)]"
            referrerPolicy="no-referrer"
          />
        </motion.div>

        {/* Location Subtitle badge */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.5 }}
          className="px-4 py-1.5 rounded-full border border-blue-500/30 bg-blue-950/40 text-blue-300 font-mono text-xs uppercase tracking-widest mb-6 backdrop-blur-sm"
        >
          Colorado Springs, CO • Broadmoor • Monument • Black Forest
        </motion.div>

        {/* "LET US HELP!" billboard style typography */}
        <motion.h1 
          initial={{ opacity: 0, filter: 'blur(10px)' }}
          animate={{ opacity: 1, filter: 'blur(0px)' }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="text-6xl md:text-8xl font-extrabold tracking-tighter text-white uppercase drop-shadow-[0_5px_15px_rgba(0,0,0,0.9)] select-none text-center"
        >
          LET US HELP!
        </motion.h1>

        {/* Supporting Hook */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.6, duration: 0.6 }}
          className="text-zinc-400 font-sans mt-4 text-base md:text-lg max-w-xl text-center leading-relaxed drop-shadow-md"
        >
          Professional wildfire mitigation and exterior property maintenance services engineered to safeguard your Home and protect your Mountain neighborhood.
        </motion.p>

        {/* Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.8, duration: 0.5 }}
          className="flex flex-col sm:flex-row gap-4 mt-8 w-full justify-center max-w-md"
        >
          <button
            id="btn-hero-book"
            onClick={onOpenBooking}
            className="px-8 py-4 rounded-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold shadow-[0_4px_24px_rgba(59,130,246,0.35)] transition-all transform hover:-translate-y-0.5 active:translate-y-0 duration-200 cursor-pointer"
          >
            Book your Free Estimate
          </button>
          <a
            href="#the-process"
            className="px-8 py-4 rounded-xl bg-zinc-900 border border-zinc-800 hover:bg-zinc-800 text-zinc-200 font-medium transition-all text-center flex items-center justify-center cursor-pointer"
          >
            See Our 3-Step Process
          </a>
        </motion.div>
      </div>
    </section>
  );
}
