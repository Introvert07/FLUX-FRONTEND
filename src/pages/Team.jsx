import React, { useState, memo, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Shield, Github, Linkedin, X, Terminal, 
  Info, ExternalLink, Code, Cpu, 
  Palette, Smartphone, Megaphone, Globe, Zap, Database 
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

/* ===================== SUB-COMPONENTS ===================== */

const TechFrame = memo(({ children, className = "", scanSpeed = "2s" }) => (
  <div className={`relative group p-0.5 md:p-1 ${className}`}>
    <div className="absolute top-0 left-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-l-2 border-cyan-500 z-10" />
    <div className="absolute top-0 right-0 w-3 h-3 md:w-5 md:h-5 border-t-2 border-r-2 border-cyan-500 z-10" />
    <div className="absolute bottom-0 left-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-l-2 border-cyan-500 z-10" />
    <div className="absolute bottom-0 right-0 w-3 h-3 md:w-5 md:h-5 border-b-2 border-r-2 border-cyan-500 z-10" />
    
    <div className="relative overflow-hidden rounded-sm bg-black h-full">
      <div 
        className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-500/10 to-transparent h-1/2 w-full -translate-y-full group-hover:animate-scan z-20 pointer-events-none"
        style={{ animationDuration: scanSpeed }}
      />
      {children}
    </div>
  </div>
));

const LeaderCard = memo(({ member, color }) => {
  const accentColor = color === 'purple' ? 'text-purple-400' : 'text-cyan-400';
  const borderColor = color === 'purple' ? 'border-purple-500' : 'border-cyan-500';

  return (
    <motion.div whileHover={{ y: -8 }} className="group bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 transition-all h-full transform-gpu">
      <TechFrame className="aspect-[4/5] mb-4 md:mb-6">
        <img 
          src={member.img} 
          loading="lazy"
          className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110" 
          alt={member.name} 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent opacity-60 z-20" />
      </TechFrame>
      <div className="px-3 md:px-5 pb-4 md:pb-6">
        <h4 className="text-xl md:text-2xl font-black italic uppercase tracking-tighter mb-1 text-slate-900 dark:text-white group-hover:text-cyan-500 transition-colors truncate">
          {member.name}
        </h4>
        <div className="flex items-center gap-2">
          <div className={`h-[1px] w-4 ${borderColor.replace('border-', 'bg-')}`} />
          <p className={`text-[8px] md:text-[10px] font-mono uppercase tracking-[0.2em] ${accentColor}`}>
            {member.role}
          </p>
        </div>
      </div>
    </motion.div>
  );
});

const AutoScrollRow = memo(({ items, renderItem, reverse = false, duration = 30 }) => {
  const content = useMemo(() => [...items, ...items, ...items], [items]);
  
  return (
    <div className="flex overflow-hidden py-4 select-none group/scroll">
      <motion.div 
        className="flex gap-4 md:gap-10 flex-nowrap will-change-transform"
        animate={{ x: reverse ? ["-33.33%", "0%"] : ["0%", "-33.33%"] }}
        transition={{ duration, repeat: Infinity, ease: "linear" }}
        style={{ width: 'fit-content' }}
      >
        {content.map((item, i) => (
          <div key={i} className="shrink-0">{renderItem(item)}</div>
        ))}
      </motion.div>
    </div>
  );
});

/* ===================== MAIN APPLICATION ===================== */

const FluxTeam = () => {
  const [selectedItem, setSelectedItem] = useState(null);

  const galleryRows = useMemo(() => {
    const size = Math.ceil(TEAM_DATA.galleryImages.length / 3);
    return [
      TEAM_DATA.galleryImages.slice(0, size),
      TEAM_DATA.galleryImages.slice(size, size * 2),
      TEAM_DATA.galleryImages.slice(size * 2)
    ];
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#020202] text-slate-900 dark:text-white pt-20 md:pt-32 pb-20 px-4 md:px-8 font-sans selection:bg-cyan-500/30 overflow-x-hidden transition-colors duration-500 relative">
      
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[radial-gradient(#0ea5e9_0.5px,transparent_0.5px)] [background-size:32px_32px] opacity-[0.1]" />
        <div className="absolute inset-0 bg-gradient-to-b from-cyan-500/5 via-transparent to-transparent" />
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        
        {/* HERO HEADER - NOW SMALLER */}
        <header className="mb-16 md:mb-32 flex flex-col md:flex-row justify-between items-start md:items-end gap-10">
          <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }}>
            <div className="inline-flex items-center gap-3 px-3 py-1 bg-black rounded-sm border border-cyan-500/50 mb-4">
               <div className="w-1.5 h-1.5 rounded-full bg-cyan-500 animate-pulse" />
               <span className="text-cyan-400 text-[9px] font-mono uppercase tracking-[0.2em]">System: Active</span>
            </div>
            <h1 className="text-4xl md:text-5xl font-black italic tracking-tighter uppercase leading-none">
             <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Our_Team_</span>
            </h1>
          </motion.div>
          <div className="font-mono text-[9px] md:text-[10px] text-slate-400 dark:text-gray-500 uppercase tracking-[0.3em] leading-relaxed border-l border-cyan-500/30 pl-4">
            Node: SATI_CORE // REVISION_2025
          </div>
        </header>

        {/* 1. COMMANDERS SECTION */}
        <section className="mb-32 md:mb-52">
          <div className="flex flex-col mb-12">
            <h3 className="text-xs font-mono text-cyan-500 uppercase tracking-[0.6em] mb-4">Class_A // Commanders</h3>
            <div className="h-px w-full bg-gradient-to-r from-cyan-500 via-cyan-500/20 to-transparent" />
          </div>
          <AutoScrollRow 
            items={TEAM_DATA.convenors} 
            duration={25}
            renderItem={(m) => (
              <div className="w-[200px] md:w-[350px] cursor-pointer px-2" onClick={() => setSelectedItem(m)}>
                <LeaderCard member={m} color="cyan" />
              </div>
            )}
          />
        </section>

        {/* 2. STRATEGISTS SECTION */}
        <section className="mb-32 md:mb-52">
          <div className="flex flex-col mb-12 items-end">
            <h3 className="text-xs font-mono text-purple-500 uppercase tracking-[0.6em] mb-4">Sub_Routine // Strategists</h3>
            <div className="h-px w-full bg-gradient-to-l from-purple-500 via-purple-500/20 to-transparent" />
          </div>
          <AutoScrollRow 
            items={TEAM_DATA.coConvenors} 
            reverse 
            duration={20}
            renderItem={(m) => (
              <div className="w-[200px] md:w-[350px] cursor-pointer px-2" onClick={() => setSelectedItem(m)}>
                <LeaderCard member={m} color="purple" />
              </div>
            )}
          />
        </section>

        {/* 3. VISUAL ARCHIVE / FLOATING MEMBERS */}
        <section className="mb-32 md:mb-52 relative overflow-visible">
          <div className="mb-12 flex justify-between items-center border-b border-white/5 pb-4">
            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em]">Visual_Buffer // Memory_Wall</h3>
            <div className="text-[10px] font-mono text-cyan-500 italic">SYNCING_STREAM...</div>
          </div>
          
          <div className="-mx-10 space-y-4">
            {galleryRows.map((row, idx) => (
              <AutoScrollRow 
                key={idx}
                items={row}
                reverse={idx % 2 !== 0}
                duration={45 + (idx * 15)}
                renderItem={(img) => (
                  <TechFrame className="w-40 h-40 md:w-80 md:h-80 cursor-pointer" scanSpeed={`${3 + idx}s`}>
                    <img 
                      src={img.url || img.img} 
                      className="w-full h-full object-cover group-hover:scale-110 transition-all duration-700" 
                      // Clicking a floating item opens the full info lightbox if it's a member
                      onClick={() => setSelectedItem(img)} 
                      alt="Flux Unit" 
                    />
                  </TechFrame>
                )}
              />
            ))}
          </div>
        </section>

        {/* 4. MODULE HEADS */}
        <section className="mb-32">
          <div className="flex flex-col mb-16">
            <h3 className="text-xs font-mono text-slate-500 uppercase tracking-[0.4em] mb-4">Core_Logic // Module_Heads</h3>
            <div className="h-px w-full bg-white/10" />
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {TEAM_DATA.deptHeads.map((h, i) => (
              <motion.div 
                key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
                className="bg-white dark:bg-black/40 border border-slate-200 dark:border-white/5 p-6 md:p-8 rounded-sm flex items-center gap-5 group hover:border-cyan-500/40 transition-all cursor-pointer"
                onClick={() => setSelectedItem(h)}
              >
                <div className="p-4 bg-slate-50 dark:bg-cyan-500/5 text-cyan-500 border border-transparent group-hover:border-cyan-500/50 transition-all shrink-0">
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

      {/* UNIVERSAL LIGHTBOX - Works for Convenors AND Floating Members */}
      <AnimatePresence>
        {selectedItem && (
          <motion.div 
            initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[110] flex items-center justify-center p-4 backdrop-blur-xl bg-black/90"
            onClick={() => setSelectedItem(null)}
          >
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}
              className="max-w-4xl w-full bg-[#080808] border border-cyan-500/20 shadow-2xl relative overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="bg-cyan-500/10 border-b border-cyan-500/20 p-4 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-cyan-500" />
                  <span className="text-[10px] font-mono text-cyan-500 uppercase tracking-widest">
                    {selectedItem.bio ? `Unit_Profile // ${selectedItem.name}` : 'Visual_Archive_Data'}
                  </span>
                </div>
                <button onClick={() => setSelectedItem(null)} className="hover:rotate-90 transition-transform text-cyan-500">
                  <X size={24} />
                </button>
              </div>

              {/* Dynamic Content: Check if it's a member (has bio) or just an image */}
              <div className={`grid grid-cols-1 ${selectedItem.bio ? 'md:grid-cols-2' : ''}`}>
                <div className="relative aspect-square md:aspect-auto overflow-hidden bg-black max-h-[70vh]">
                   <img src={selectedItem.img || selectedItem.url} className="w-full h-full object-cover" alt="Data" />
                   <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent" />
                   {!selectedItem.bio && (
                     <div className="absolute bottom-4 left-4 text-white/50 font-mono text-[10px] uppercase">Ref_ID: {Math.random().toString(16).slice(2,8)}</div>
                   )}
                </div>

                {selectedItem.bio && (
                  <div className="p-8 md:p-12 space-y-8 bg-black">
                     <div className="space-y-4">
                        <div className="flex items-center gap-2 text-cyan-500/60 font-mono text-[10px] uppercase tracking-widest">
                          <Info size={14} /> <span>Operator_Bio</span>
                        </div>
                        <p className="text-gray-300 text-sm md:text-lg leading-relaxed font-medium">
                          {selectedItem.bio}
                        </p>
                     </div>
                     <div className="flex gap-4 pt-4">
                        <a href={selectedItem.git || "#"} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 py-4 bg-white text-black font-black uppercase text-xs hover:bg-cyan-500 transition-colors">
                          <Github size={16} /> GitHub
                        </a>
                        <a href={selectedItem.link || "#"} target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-3 py-4 border border-white/20 text-white font-black uppercase text-xs hover:bg-white hover:text-black transition-all">
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