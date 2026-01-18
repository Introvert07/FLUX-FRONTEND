import React, { useState, useEffect, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Github, Linkedin, X, Terminal, 
  Info, Code, Cpu, Palette, Smartphone, 
  Megaphone, Globe, Zap, Database 
} from 'lucide-react';

// Data Import
import { TEAM_DATA } from '../data/teamData';

/* ===================== ICON LOOKUP MAP ===================== */
const ICON_MAP = {
  Code: <Code size={18}/>,
  Cpu: <Cpu size={18}/>,
  Palette: <Palette size={18}/>,
  Terminal: <Terminal size={18}/>,
  Smartphone: <Smartphone size={18}/>,
  Megaphone: <Megaphone size={18}/>,
  Globe: <Globe size={18}/>,
  Zap: <Zap size={18}/>,
  Database: <Database size={18}/>,
};

/* ===================== HOOKS ===================== */
const useIsMobile = () => {
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);
  return isMobile;
};

/* ===================== SUB-COMPONENTS ===================== */

const TechFrame = memo(({ children, className = "", scanSpeed = "2s", isMobile }) => (
  <div className={`relative group p-0.5 md:p-1 ${className}`}>
    {/* Corner Accents */}
    <div className="absolute top-0 left-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-l-2 border-cyan-500 z-10" />
    <div className="absolute top-0 right-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-r-2 border-cyan-500 z-10" />
    <div className="absolute bottom-0 left-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-l-2 border-cyan-500 z-10" />
    <div className="absolute bottom-0 right-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-r-2 border-cyan-500 z-10" />
    
    <div className="relative overflow-hidden rounded-sm bg-black h-full w-full">
      {/* Scanline - Desktop Only */}
      {!isMobile && (
        <div 
          className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-scan z-20 pointer-events-none"
          style={{ animationDuration: scanSpeed }}
        />
      )}
      {children}
    </div>
  </div>
));

const LeaderCard = memo(({ member, color, isMobile }) => {
  const accentColor = color === 'purple' ? 'text-purple-400' : 'text-cyan-400';
  const borderColor = color === 'purple' ? 'border-purple-500' : 'border-cyan-500';

  // Desktop uses Framer Motion, Mobile uses standard div
  const Wrapper = isMobile ? 'div' : motion.div;
  const props = isMobile ? {} : { whileHover: { y: -8 } };

  return (
    <Wrapper {...props} className="group bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 h-full w-full flex flex-col">
      <TechFrame className="aspect-[4/5] w-full mb-3 md:mb-6" isMobile={isMobile}>
        <img 
          src={member.img} 
          loading="lazy"
          className={`w-full h-full object-cover transition-transform duration-700 ${!isMobile ? 'group-hover:scale-110' : ''}`} 
          alt={member.name} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-20" />
      </TechFrame>
      <div className="px-3 md:px-5 pb-4 md:pb-6 mt-auto">
        <h4 className={`text-lg md:text-2xl font-black italic uppercase tracking-tighter mb-1 text-slate-900 dark:text-white ${!isMobile ? 'group-hover:text-cyan-500' : ''} transition-colors truncate`}>
          {member.name}
        </h4>
        <div className="flex items-center gap-2">
          <div className={`h-[1px] w-4 ${borderColor.replace('border-', 'bg-')}`} />
          <p className={`text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] ${accentColor}`}>
            {member.role}
          </p>
        </div>
      </div>
    </Wrapper>
  );
});

// Hybrid Scroll Component: Auto-scroll on Desktop, Snap Scroll on Mobile
const AdaptiveScrollRow = memo(({ items, renderItem, reverse = false, duration = 30, isMobile }) => {
  if (isMobile) {
    // Mobile: Native Horizontal Scroll Snap
    return (
      <div className="flex overflow-x-auto snap-x snap-mandatory gap-4 pb-6 px-4 no-scrollbar">
        {items.map((item, i) => (
          <div key={i} className="snap-center shrink-0 w-[85vw] sm:w-[300px]">
            {renderItem(item)}
          </div>
        ))}
      </div>
    );
  }

  // Desktop: Infinite Marquee Animation
  const content = [...items, ...items, ...items];
  return (
    <div className="flex overflow-hidden py-4 select-none group/scroll">
      <motion.div 
        className="flex gap-10 flex-nowrap will-change-transform"
        animate={{ x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ width: 'fit-content' }}
      >
        {content.map((item, i) => (
          <div key={i} className="shrink-0 w-[350px]">{renderItem(item)}</div>
        ))}
      </motion.div>
    </div>
  );
});

/* ===================== MAIN APPLICATION ===================== */

const FluxTeam = () => {
  const [selectedItem, setSelectedItem] = useState(null);
  const isMobile = useIsMobile();

  const galleryRows = useMemo(() => {
    const size = Math.ceil(TEAM_DATA.galleryImages.length / 3);
    return [
      TEAM_DATA.galleryImages.slice(0, size),
      TEAM_DATA.galleryImages.slice(size, size * 2),
      TEAM_DATA.galleryImages.slice(size * 2)
    ];
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020202] text-slate-900 dark:text-white pt-20 md:pt-32 pb-20 overflow-x-hidden font-sans selection:bg-cyan-500/30">
      
      {/* Background Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_0.5px,transparent_0.5px)] [background-size:24px_24px] md:[background-size:32px_32px] opacity-[0.1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10 px-4 md:px-8">
        
        {/* HEADER */}
        <header className="mb-12 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 md:gap-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }} 
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-black rounded-sm border border-cyan-500/50 mb-4">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
               <span className="text-cyan-400 text-[9px] font-mono uppercase tracking-[0.2em]">System: Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Our_Team_</span>
            </h1>
          </motion.div>
          
          <div className="font-mono text-[9px] md:text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-[0.3em] leading-relaxed border-l border-cyan-500/30 pl-4">
            Node: SATI_CORE <br className="md:hidden"/> // REVISION_2025
          </div>
        </header>

        {/* 1. COMMANDERS SECTION */}
        <section className="mb-20 md:mb-52">
          <div className="flex flex-col mb-8 md:mb-12">
            <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-[0.4em] mb-4 pl-1">Class_A // Commanders</h3>
            <div className="h-px w-full bg-gradient-to-r from-cyan-500 via-cyan-500/20 to-transparent" />
          </div>
          
          <div className="-mx-4 md:mx-0">
            <AdaptiveScrollRow 
              items={TEAM_DATA.convenors} 
              duration={25}
              isMobile={isMobile}
              renderItem={(m) => (
                <div className="cursor-pointer h-full" onClick={() => setSelectedItem(m)}>
                  <LeaderCard member={m} color="cyan" isMobile={isMobile} />
                </div>
              )}
            />
          </div>
        </section>

        {/* 2. STRATEGISTS SECTION */}
        <section className="mb-20 md:mb-52">
          <div className="flex flex-col mb-8 md:mb-12 items-end">
            <h3 className="text-xs font-mono text-purple-500 uppercase tracking-[0.4em] mb-4 pr-1">Sub_Routine // Strategists</h3>
            <div className="h-px w-full bg-gradient-to-l from-purple-500 via-purple-500/20 to-transparent" />
          </div>
          
          <div className="-mx-4 md:mx-0">
            <AdaptiveScrollRow 
              items={TEAM_DATA.coConvenors} 
              reverse 
              duration={20}
              isMobile={isMobile}
              renderItem={(m) => (
                <div className="cursor-pointer h-full" onClick={() => setSelectedItem(m)}>
                  <LeaderCard member={m} color="purple" isMobile={isMobile} />
                </div>
              )}
            />
          </div>
        </section>

        {/* 3. VISUAL ARCHIVE */}
        <section className="mb-20 md:mb-52">
          <div className="mb-8 md:mb-12 flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em]">Visual_Buffer</h3>
            <div className="text-[10px] font-mono text-cyan-500 italic hidden md:block">SYNCING_STREAM...</div>
          </div>
          
          <div className="-mx-4 md:-mx-10 space-y-4">
            {galleryRows.map((row, idx) => (
              <AdaptiveScrollRow 
                key={idx}
                items={row}
                reverse={idx % 2 !== 0}
                duration={45 + (idx * 15)}
                isMobile={isMobile}
                renderItem={(img) => (
                  <div className="w-[150px] md:w-[320px] aspect-square p-1" onClick={() => setSelectedItem(img)}>
                    <TechFrame className="w-full h-full cursor-pointer" scanSpeed={`${3 + idx}s`} isMobile={isMobile}>
                      <img 
                        src={img.url || img.img} 
                        className={`w-full h-full object-cover transition-transform duration-700 ${!isMobile ? 'group-hover:scale-110' : ''}`} 
                        alt="Flux Unit" 
                      />
                    </TechFrame>
                  </div>
                )}
              />
            ))}
          </div>
        </section>

        {/* 4. MODULE HEADS - Responsive Grid */}
        <section className="mb-20">
          <div className="flex flex-col mb-10 md:mb-16">
            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4">Core_Logic // Module_Heads</h3>
            <div className="h-px w-full bg-gray-200 dark:bg-white/10" />
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
            {TEAM_DATA.deptHeads.map((h, i) => (
              <motion.div 
                key={i} 
                initial={isMobile ? { opacity: 1 } : { opacity: 0, y: 20 }} 
                whileInView={isMobile ? {} : { opacity: 1, y: 0 }} 
                viewport={{ once: true }}
                className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 p-5 md:p-8 rounded-sm flex items-center gap-5 group hover:border-cyan-500/40 transition-all cursor-pointer active:scale-[0.98]"
                onClick={() => setSelectedItem(h)}
              >
                <div className={`p-4 bg-slate-50 dark:bg-cyan-500/5 text-cyan-500 border border-transparent ${!isMobile && 'group-hover:border-cyan-500/50'} transition-all shrink-0 rounded`}>
                  {ICON_MAP[h.iconId]}
                </div>
                <div className="min-w-0">
                  <h4 className="font-black uppercase tracking-tight text-lg text-slate-900 dark:text-white truncate">{h.name}</h4>
                  <p className="text-[10px] text-cyan-500 font-mono uppercase tracking-widest">{h.dept}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </section>
      </div>

      {/* LIGHTBOX - Full Screen on Mobile */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[200] flex items-center justify-center p-0 md:p-4 bg-black/95 md:backdrop-blur-xl"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ y: 50, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 50, opacity: 0 }}
              className="w-full h-full md:h-auto md:max-w-4xl bg-[#080808] border-none md:border border-cyan-500/20 shadow-2xl relative overflow-y-auto md:overflow-hidden flex flex-col md:block"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Modal Header */}
              <div className="bg-cyan-500/10 border-b border-cyan-500/20 p-4 flex justify-between items-center sticky top-0 z-50 backdrop-blur-md">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-cyan-500" />
                  <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest truncate max-w-[200px]">
                    {selectedItem.bio ? `Profile // ${selectedItem.name}` : 'Archive_Data'}
                  </span>
                </div>
                <button onClick={() => setSelectedItem(null)} className="p-2 -mr-2 text-cyan-500 hover:bg-cyan-500/20 rounded-full transition-colors">
                  <X size={24} />
                </button>
              </div>

              {/* Modal Content */}
              <div className={`grid grid-cols-1 ${selectedItem.bio ? 'md:grid-cols-2' : ''} h-full md:h-auto`}>
                {/* Image Section */}
                <div className="relative w-full aspect-square md:aspect-auto md:h-full max-h-[50vh] md:max-h-[600px] bg-black">
                   <img src={selectedItem.img || selectedItem.url} className="w-full h-full object-cover" alt="Data" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:opacity-50" />
                </div>

                {/* Info Section */}
                {selectedItem.bio && (
                  <div className="p-6 md:p-12 space-y-6 md:space-y-8 bg-black">
                     <div className="space-y-4">
                        <div className="flex items-center gap-2 text-cyan-500/60 font-mono text-[10px] uppercase tracking-widest">
                          <Info size={14} /> <span>Operator_Bio</span>
                        </div>
                        <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
                          {selectedItem.bio}
                        </p>
                     </div>
                     
                     {/* Action Buttons */}
                     <div className="flex flex-col md:flex-row gap-3 pt-4 pb-8 md:pb-0">
                        <a href={selectedItem.git || "#"} className="flex items-center justify-center gap-3 py-3 md:py-4 bg-white text-black font-black uppercase text-xs rounded-sm active:scale-95 transition-transform">
                          <Github size={16} /> GitHub
                        </a>
                        <a href={selectedItem.link || "#"} className="flex items-center justify-center gap-3 py-3 md:py-4 border border-white/20 text-white font-black uppercase text-xs rounded-sm active:bg-white/10 active:scale-95 transition-all">
                          <Linkedin size={16} /> LinkedIn
                        </a>
                     </div>
                  </div>
                )}
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx global>{`
        /* Hide scrollbar for Chrome, Safari and Opera */
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        /* Hide scrollbar for IE, Edge and Firefox */
        .no-scrollbar {
          -ms-overflow-style: none;  /* IE and Edge */
          scrollbar-width: none;  /* Firefox */
        }
        @keyframes scan {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(200%); }
        }
        .animate-scan { animation: scan linear infinite; }
      `}</style>
    </div>
  );
};

export default FluxTeam;