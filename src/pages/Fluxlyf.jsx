import React, { useState, useEffect, useCallback, memo } from "react";
import { Play, ChevronLeft, ChevronRight, X, ExternalLink } from "lucide-react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay, FreeMode } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";

// Import centralized data
import { youtubeProjects, instaReels, eventPosters } from "../data/GalleryData";

// Swiper Styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/free-mode";

const SectionHeader = memo(({ title, subtitle, borderColor, textColor, children }) => (
  <div className={`flex items-center justify-between mb-8 border-l-4 ${borderColor} pl-4`}>
    <div>
      <h2 className={`text-2xl font-black uppercase italic ${textColor || ""}`}>{title}</h2>
      <p className="text-sm opacity-50">{subtitle}</p>
    </div>
    <div className="flex gap-2">{children}</div>
  </div>
));

const FluxGallery = () => {
  const [isDarkMode, setIsDarkMode] = useState(() => 
    document.documentElement.classList.contains("dark")
  );
  const [selectedItem, setSelectedItem] = useState(null);
  const [modalType, setModalType] = useState(null);

  useEffect(() => {
    const observer = new MutationObserver(() => {
      setIsDarkMode(document.documentElement.classList.contains("dark"));
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });
    return () => observer.disconnect();
  }, []);

  const openLightbox = useCallback((item, type) => {
    setSelectedItem(item);
    setModalType(type);
    document.body.style.overflow = "hidden";
  }, []);

  const closeLightbox = useCallback(() => {
    setSelectedItem(null);
    setModalType(null);
    document.body.style.overflow = "unset";
  }, []);

  return (
    <div className={`min-h-screen ${isDarkMode ? "bg-[#0b0b0b] text-white" : "bg-white text-zinc-900"} transition-colors duration-300 pb-20 relative font-sans`}>
      
      <div className="absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
           style={{ backgroundImage: `radial-gradient(circle, #888 1px, transparent 1px)`, backgroundSize: '24px 24px' }} />

      <AnimatePresence>
        {selectedItem && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[9999] bg-black/98 flex items-center justify-center p-2 md:p-10 backdrop-blur-md"
            onClick={closeLightbox}
          >
            <button onClick={closeLightbox} className="absolute top-5 right-5 z-[10000] p-3 rounded-full bg-red-600 hover:bg-red-700 text-white transition-all shadow-2xl">
              <X size={24} />
            </button>

            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              className="w-full max-w-5xl aspect-video rounded-2xl overflow-hidden bg-black shadow-2xl border border-white/5"
              onClick={(e) => e.stopPropagation()}
            >
              {modalType === "video" ? (
                <iframe
                  src={`https://www.youtube.com/embed/${selectedItem.id}?autoplay=1`}
                  className="w-full h-full"
                  allow="autoplay; encrypted-media"
                  allowFullScreen
                  title="video"
                />
              ) : (
                <img src={selectedItem.img} className="w-full h-full object-contain" alt={selectedItem.title} />
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <header className="relative z-10 pt-24 pb-12 px-6 max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <span className="bg-red-500/10 text-red-500 px-3 py-1 rounded-full text-[10px] tracking-[0.2em] uppercase font-bold border border-red-500/20">
            Official Archive
          </span>
          <h1 className="text-5xl md:text-7xl font-black mt-4 tracking-tighter italic uppercase">
            Flux <span className="text-red-600">Media</span>
          </h1>
        </motion.div>
      </header>

      <main className="relative z-10 space-y-16 md:space-y-32">
        
        {/* 1. HERO POSTER SECTION */}
        <section className="relative group/poster">
          <div className="max-w-7xl mx-auto px-6 mb-4 flex items-end justify-between">
             <h2 className="text-xs font-bold uppercase tracking-widest opacity-50">Feature Spotlights</h2>
             <div className="hidden md:flex gap-2">
                <button className="p-prev p-2 rounded-full border border-current/10 hover:bg-red-600 hover:text-white transition"><ChevronLeft size={20} /></button>
                <button className="p-next p-2 rounded-full border border-current/10 hover:bg-red-600 hover:text-white transition"><ChevronRight size={20} /></button>
             </div>
          </div>

          <div className="w-full md:container md:mx-auto">
            <Swiper
              modules={[Navigation, Autoplay, Pagination]}
              navigation={{ prevEl: ".p-prev", nextEl: ".p-next" }}
              pagination={{ clickable: true, dynamicBullets: true }}
              autoplay={{ delay: 4000, disableOnInteraction: false }}
              speed={1000}
              loop={true}
              className="md:rounded-3xl overflow-hidden shadow-2xl"
            >
              {eventPosters.map((p, i) => (
                <SwiperSlide key={i}>
                  <div onClick={() => openLightbox(p, "poster")} className="relative aspect-[4/5] md:aspect-[21/8] lg:aspect-[25/8] cursor-pointer group overflow-hidden">
                    <img src={p.img} className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" alt={p.title} loading="lazy" />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </section>

        {/* 2. YOUTUBE SECTION - UPDATED FOR INFINITE AUTO-RUN */}
        <section className="max-w-7xl mx-auto px-6">
          <SectionHeader title="Video Vault" subtitle="Tutorials, Tech-talks & Events" borderColor="border-red-600">
            <button className="v-prev p-2 rounded-full bg-zinc-500/10 hover:bg-red-600 hover:text-white transition"><ChevronLeft size={18} /></button>
            <button className="v-next p-2 rounded-full bg-zinc-500/10 hover:bg-red-600 hover:text-white transition"><ChevronRight size={18} /></button>
          </SectionHeader>

          <Swiper
            modules={[Navigation, Autoplay, FreeMode]} // Added Autoplay module
            navigation={{ prevEl: ".v-prev", nextEl: ".v-next" }}
            autoplay={{
              delay: 3000,
              disableOnInteraction: false,
              pauseOnMouseEnter: true,
            }}
            loop={true} // Set to true for infinite sliding
            speed={1000}
            spaceBetween={20}
            slidesPerView={1.2}
            freeMode={true}
            breakpoints={{
              640: { slidesPerView: 2.2 },
              1024: { slidesPerView: 3 }
            }}
          >
            {youtubeProjects.map((vid, i) => (
              <SwiperSlide key={i}>
                <motion.div whileHover={{ y: -5 }} onClick={() => openLightbox(vid, "video")} className="group cursor-pointer">
                  <div className="relative aspect-video rounded-2xl overflow-hidden bg-zinc-900 border border-white/5">
                    <img src={`https://img.youtube.com/vi/${vid.id}/maxresdefault.jpg`} className="w-full h-full object-cover transition duration-700 group-hover:scale-110" alt={vid.title} loading="lazy" />
                    <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="bg-red-600 p-4 rounded-full scale-75 group-hover:scale-100 transition-transform">
                        <Play size={24} fill="white" color="white" />
                      </div>
                    </div>
                    <div className="absolute top-3 right-3 bg-black/60 backdrop-blur-md p-2 rounded-lg">
                       <ExternalLink size={14} className="text-white/70" />
                    </div>
                  </div>
                  <h3 className="mt-4 text-sm font-bold leading-snug group-hover:text-red-500 transition">{vid.title}</h3>
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>
        </section>

        {/* 3. INSTAGRAM REELS */}
        <section className="max-w-7xl mx-auto px-6">
          <SectionHeader 
            title="Social Loop" 
            subtitle="Latest from Instagram" 
            borderColor="border-pink-600" 
            textColor="text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-500"
          />
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
            {instaReels.slice(0, 4).map((id, i) => (
              <div key={i} className="rounded-2xl overflow-hidden shadow-2xl bg-black border border-white/5 hover:border-pink-500/50 transition">
                <iframe 
                  src={`https://www.instagram.com/reel/${id}/embed`} 
                  className="w-full aspect-[9/16] scale-[1.02]" 
                  scrolling="no" 
                  frameBorder="0" 
                  title={`Instagram Reel ${i}`} 
                />
              </div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
};

export default FluxGallery;