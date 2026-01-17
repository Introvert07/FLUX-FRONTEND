import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Pagination, Navigation } from 'swiper/modules';
import { ChevronDown, Users, PlayCircle, Info, X, Maximize2, FileText, Download } from 'lucide-react';

// Import the static data
import { ARCHIVE_DATA } from '../data/archiveData';

// Swiper Styles
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import 'swiper/css/navigation';

const FullscreenPortal = ({ img, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-xl flex items-center justify-center p-4"
    onClick={onClose}
  >
    <button className="absolute top-6 right-6 text-white/50 hover:text-white transition-colors z-[110]">
      <X size={32} />
    </button>
    <motion.img 
      initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
      src={img} className="max-w-full max-h-full object-contain rounded-lg shadow-2xl" 
    />
  </motion.div>
);

const EventCard = ({ event, index }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [isCarouselActive, setIsCarouselActive] = useState(false);
  const [selectedImg, setSelectedImg] = useState(null);

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
      <AnimatePresence>
        {selectedImg && <FullscreenPortal img={selectedImg} onClose={() => setSelectedImg(null)} />}
      </AnimatePresence>

      {/* IMAGE SECTION */}
      <div className={`lg:col-span-7 ${index % 2 !== 0 ? 'lg:order-last' : ''}`}>
        <div className="relative group">
          {!isCarouselActive ? (
            <div 
              onClick={() => setIsCarouselActive(true)}
              className="relative w-full aspect-video rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden cursor-pointer border border-slate-200 dark:border-white/10 group/cover"
            >
              <img src={event.images[0]} className="w-full h-full object-cover grayscale-[30%] group-hover/cover:grayscale-0 transition-all duration-700" alt="cover" />
              <div className="absolute inset-0 bg-black/40 flex flex-col items-center justify-center backdrop-blur-[2px]">
                <PlayCircle className="text-cyan-400 opacity-90 group-hover:scale-110 transition-transform w-12 h-12 md:w-16 md:h-16" />
                <p className="text-white font-mono text-[9px] md:text-[10px] tracking-[0.3em] mt-4 uppercase">View_Gallery ({event.images.length}_Frames)</p>
              </div>
            </div>
          ) : (
            <Swiper
              effect={'coverflow'} grabCursor={true} centeredSlides={true} slidesPerView={'auto'}
              navigation={true} pagination={{ clickable: true }}
              coverflowEffect={{ rotate: 10, stretch: 0, depth: 100, modifier: 2.5, slideShadows: false }}
              modules={[EffectCoverflow, Pagination, Navigation]}
              className="w-full rounded-[1.5rem] md:rounded-[2.5rem] overflow-hidden border border-cyan-500/30 shadow-2xl"
            >
              {event.images.map((img, idx) => (
                <SwiperSlide key={idx} className="w-full aspect-video relative group/slide">
                  <img src={img} className="w-full h-full object-cover" alt="event-slide" />
                  <div 
                    onClick={() => setSelectedImg(img)}
                    className="absolute inset-0 bg-black/20 opacity-0 group-hover/slide:opacity-100 transition-opacity flex items-center justify-center cursor-zoom-in"
                  >
                    <Maximize2 className="text-white" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          )}
        </div>
      </div>

      {/* CONTENT SECTION */}
      <div className="lg:col-span-5 space-y-4 md:space-y-6">
        <div className="space-y-3 md:space-y-4">
          <span className="inline-block bg-cyan-500/10 text-cyan-600 dark:text-cyan-400 text-[8px] md:text-[9px] font-black px-3 py-1 md:px-4 md:py-1.5 rounded-full border border-cyan-500/20 uppercase tracking-[0.2em]">{event.tag}</span>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black italic uppercase tracking-tighter leading-none text-slate-900 dark:text-white break-words">{event.title}</h2>
        </div>

        <div className="relative bg-slate-900 p-4 md:p-6 rounded-[1rem] md:rounded-[1.5rem] border border-cyan-500/20 font-mono text-[11px] md:text-[12px] text-cyan-400 leading-relaxed shadow-xl overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-[2px] bg-cyan-400/30 animate-scan" />
          <pre className="whitespace-pre-wrap max-h-32 overflow-y-auto custom-scrollbar">{event.terminal}</pre>
        </div>

        <button 
          onClick={() => setIsExpanded(!isExpanded)}
          className="flex items-center justify-between w-full p-4 md:p-6 bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-2xl group transition-all hover:border-cyan-500/50"
        >
          <div className="flex items-center gap-3">
            <Users size={18} className="text-cyan-500" />
            <span className="text-[10px] md:text-xs font-black uppercase tracking-widest">Details & Team</span>
          </div>
          <ChevronDown size={18} className={`transition-transform duration-300 ${isExpanded ? 'rotate-180' : ''}`} />
        </button>

        <AnimatePresence>
          {isExpanded && (
            <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} className="overflow-hidden space-y-4">
              <div className="pt-2 border-t border-slate-100 dark:border-white/5">
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 uppercase font-mono text-[9px] md:text-[10px] tracking-widest">
                    <Info size={14} /> Summary
                  </div>
                  
                  {/* DOWNLOAD PDF BUTTON */}
                  {event.reportUrl && (
                    <a 
                      href={event.reportUrl} 
                      download={`${event.title}_Report.pdf`}
                      className="flex items-center gap-1.5 px-3 py-1 bg-cyan-500 text-white hover:bg-cyan-600 rounded-lg transition-all text-[10px] font-bold uppercase tracking-tighter shadow-lg shadow-cyan-500/20"
                    >
                      <Download size={12} />
                      Download Report
                    </a>
                  )}
                </div>
                <p className="text-xs md:text-sm text-slate-500 dark:text-gray-400 leading-relaxed italic">{event.summary}</p>
              </div>
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pb-4">
                <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl">
                  <p className="text-[8px] md:text-[9px] font-mono text-slate-400 uppercase mb-2 underline">Leads</p>
                  <ul className="text-xs font-bold space-y-1">
                    {event.team.leads.map((name, i) => <li key={i} className="text-slate-800 dark:text-slate-200">_ {name}</li>)}
                  </ul>
                </div>
                <div className="bg-slate-50 dark:bg-white/5 p-3 rounded-xl">
                  <p className="text-[8px] md:text-[9px] font-mono text-slate-400 uppercase mb-2 underline">Volunteers</p>
                  <div className="flex flex-wrap gap-1">
                    {event.team.volunteers.map((name, i) => <span key={i} className="px-2 py-0.5 bg-slate-200 dark:bg-white/10 rounded text-[9px] md:text-[10px] text-slate-600 dark:text-slate-400">{name}</span>)}
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

const FluxArchive = () => {
  const years = Object.keys(ARCHIVE_DATA).reverse();
  const [activeYear, setActiveYear] = useState(years[0] || "2025");

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#020202] text-slate-900 dark:text-white pb-12 px-4 selection:bg-cyan-500/30 font-sans transition-colors duration-500 overflow-x-hidden">
      <div className="fixed inset-0 z-0 pointer-events-none">
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#80808012_1px,transparent_1px),linear-gradient(to_bottom,#80808012_1px,transparent_1px)] bg-[size:40px_40px]" />
      </div>

      <div className="relative z-10 max-w-6xl mx-auto mt-20 md:mt-32">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 md:mb-16 border-b border-slate-200 dark:border-white/10 pb-8 md:pb-10 gap-6 md:gap-8">
          <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
            <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse" />
                <p className="text-cyan-600 dark:text-cyan-500 font-mono text-[9px] md:text-[10px] tracking-[0.4em] uppercase">SATI_Vidisha.Log</p>
            </div>
            <h1 className="text-5xl md:text-6xl font-black italic tracking-tighter uppercase leading-none">
              Events<span className="text-cyan-600 dark:text-cyan-500">.db</span>
            </h1>
          </motion.div>
          
          <div className="flex bg-white/80 dark:bg-white/5 backdrop-blur-md p-1 rounded-2xl border border-slate-200 dark:border-white/10 shadow-xl overflow-x-auto max-w-full no-scrollbar">
            {years.map((year) => (
              <button
                key={year} onClick={() => setActiveYear(year)}
                className={`relative px-6 md:px-8 py-2 md:py-2.5 rounded-xl text-[10px] md:text-xs font-black transition-all whitespace-nowrap ${activeYear === year ? 'text-white dark:text-black' : 'text-slate-500 hover:text-cyan-600'}`}
              >
                {activeYear === year && <motion.div layoutId="activeTab" className="absolute inset-0 bg-cyan-600 dark:bg-cyan-400 z-0 rounded-xl" />}
                <span className="relative z-10">{year}</span>
              </button>
            ))}
          </div>
        </header>

        <AnimatePresence mode="wait">
          <motion.div
            key={activeYear} initial={{ opacity: 0, y: 30 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -30 }}
            className="space-y-24 md:space-y-48 mb-32"
          >
            {ARCHIVE_DATA[activeYear]?.map((event, i) => (
              <EventCard key={i} event={event} index={i} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>

      <style jsx global>{`
        .no-scrollbar::-webkit-scrollbar { display: none; }
        .no-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #06b6d433; border-radius: 10px; }
        .swiper-button-next, .swiper-button-prev { color: #06b6d4 !important; transform: scale(0.6); }
        .swiper-pagination-bullet-active { background: #06b6d4 !important; }
        @keyframes scan { from { transform: translateY(-100%); } to { transform: translateY(400%); } }
        .animate-scan { animation: scan 4s linear infinite; }
      `}</style>
    </div>
  );
};

export default FluxArchive;