import React, { useState, memo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Typewriter from 'typewriter-effect';
import { Target, Eye, Instagram, Linkedin, GraduationCap } from 'lucide-react';

// ===================== IMAGE IMPORTS =====================
import mritunjayImg from '../assets/founders/mritunjay.png'; 
import shubhamImg from '../assets/founders/shubham.png';

/* ===================== PERSONNEL CARD (MEMOIZED) ===================== */
const FounderCard = memo(({ title, name, role, company, branch, batch, bio, ig, li, imgSrc }) => (
  <motion.div 
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    className="relative group rounded-2xl md:rounded-[2.5rem] border border-slate-200 dark:border-white/5 bg-white/50 dark:bg-[#0a0a0a]/50 backdrop-blur-md overflow-hidden mb-8 md:mb-12 transform-gpu"
  >
    <div className="flex flex-col lg:flex-row">
      {/* Image Container */}
      <div className="relative w-full lg:w-80 xl:w-96 h-72 sm:h-96 lg:h-auto shrink-0 bg-slate-100 dark:bg-black overflow-hidden">
        <img 
          src={imgSrc} 
          alt={name} 
          loading="lazy"
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105 transform-gpu" 
        />
        <div className="absolute inset-0 bg-gradient-to-t from-white dark:from-[#0a0a0a] via-transparent to-transparent opacity-40" />
      </div>

      <div className="p-6 md:p-10 lg:p-12 flex-grow">
        <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
          <div className="w-full">
            <span className="text-[9px] font-bold text-cyan-600 dark:text-cyan-400 uppercase tracking-widest bg-cyan-500/10 px-3 py-1 rounded-full inline-block">
              {title}
            </span>
            <h3 className="text-2xl md:text-4xl font-black text-slate-900 dark:text-white uppercase italic mt-3 leading-none">
              {name}
            </h3>
            <p className="text-xs md:text-sm text-cyan-600 dark:text-cyan-500 font-mono mt-2 uppercase tracking-tight">
              {role} @ {company}
            </p>
          </div>
          <div className="flex gap-2 self-end sm:self-start">
            {li && <a href={li} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:text-cyan-500 transition-colors shadow-sm"><Linkedin size={18} /></a>}
            {ig && <a href={ig} target="_blank" rel="noreferrer" className="p-2.5 rounded-xl bg-slate-100 dark:bg-white/5 hover:text-pink-500 transition-colors shadow-sm"><Instagram size={18} /></a>}
          </div>
        </div>
        
        {/* BIO SECTION */}
        <div className="text-slate-600 dark:text-slate-300 leading-relaxed mb-8 text-sm md:text-base min-h-[140px] md:min-h-[100px]">
          <Typewriter
            options={{
              strings: [bio],
              autoStart: true,
              delay: 20,
              cursor: "█",
              loop: false,
              pauseFor: 9999999,
            }}
          />
        </div>

        <div className="flex flex-col sm:flex-row sm:items-center gap-4 pt-6 border-t border-slate-200 dark:border-white/10">
          <div className="flex items-center gap-2">
            <GraduationCap size={16} className="text-cyan-500" />
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-wider text-slate-500">{branch}</span>
          </div>
          <div className="w-fit px-3 py-1 rounded-md bg-slate-100 dark:bg-white/5 text-[10px] font-mono text-slate-400">
            {batch}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
));

const FluxAbout = () => {
  const [activeTab, setActiveTab] = useState('mission');

  const content = {
    mission: {
      title: "Our Mission",
      icon: <Target className="text-cyan-500" size={24} />,
      text: "Bridging the gap between theory and industry. We provide a sandbox for students to break things, build things, and master the technical leadership required for the real world.",
      color: "border-cyan-500/30 bg-cyan-500/5"
    },
    vision: {
      title: "Our Vision",
      icon: <Eye className="text-purple-500" size={24} />,
      text: "To be the premier interdisciplinary hub for innovation at SATI, fostering a culture where knowledge sharing is free and creativity is the only currency that matters.",
      color: "border-purple-500/30 bg-purple-500/5"
    }
  };

  return (
    <div className="relative min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-white transition-colors duration-500 overflow-x-hidden">
      
      {/* GRID BACKGROUND */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-20 dark:opacity-10" 
        style={{ backgroundImage: 'radial-gradient(#06b6d4 0.5px, transparent 0.5px)', backgroundSize: '32px 32px' }} 
      />

      <div className="relative z-10 max-w-6xl mx-auto px-4 sm:px-6 pt-24 md:pt-32 pb-20">
        
        {/* REFINED HERO SECTION */}
        <div className="mb-16 md:mb-24">
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-center gap-3 mb-6">
            <div className="h-[2px] w-8 bg-cyan-500 rounded-full" />
            <span className="text-[9px] font-black uppercase tracking-[0.4em] text-cyan-600">Since 2019</span>
          </motion.div>

          <h1 className="text-5xl md:text-7xl font-black tracking-tighter uppercase italic mb-6 leading-tight">
            We Are <span className="text-cyan-600">Flux</span>
          </h1>
          
          <p className="max-w-xl text-sm md:text-lg text-slate-500 dark:text-slate-400 leading-relaxed font-medium italic">
            "A high-performance ecosystem designed to accelerate technical potential into engineering excellence."
          </p>
        </div>

        {/* MISSION/VISION TOGGLE */}
        <div className="mb-24 md:mb-32">
          <div className="flex p-1 bg-slate-200 dark:bg-white/5 rounded-full w-full sm:w-fit mb-8 mx-auto">
            {['mission', 'vision'].map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 sm:flex-none px-8 py-2.5 rounded-full text-[10px] font-black uppercase tracking-widest transition-all duration-300 ${
                  activeTab === tab 
                  ? 'bg-white dark:bg-cyan-600 text-black dark:text-white shadow-md scale-105' 
                  : 'text-slate-500'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              className={`p-8 md:p-12 rounded-[2rem] md:rounded-[3rem] border backdrop-blur-xl ${content[activeTab].color} transition-all duration-500 transform-gpu`}
            >
              <div className="flex flex-col md:flex-row items-center md:items-start text-center md:text-left gap-6">
                <div className="p-4 bg-white dark:bg-black rounded-2xl shadow-sm">
                  {content[activeTab].icon}
                </div>
                <div>
                  <h2 className="text-2xl md:text-3xl font-black uppercase tracking-tight mb-3 italic">
                    {content[activeTab].title}
                  </h2>
                  <p className="text-sm md:text-lg text-slate-600 dark:text-slate-300 leading-relaxed">
                    {content[activeTab].text}
                  </p>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>

        {/* TEAM SECTION */}
        <div id="team">
          <div className="flex flex-col md:flex-row items-center justify-between mb-12 gap-4">
            <h2 className="text-3xl md:text-5xl font-black uppercase italic tracking-tighter">Command Center</h2>
            <div className="px-4 py-1.5 rounded-full border border-cyan-500/20 text-[9px] font-mono text-cyan-600 uppercase tracking-[0.2em] bg-cyan-500/5">
              Profiles // Founding_Command
            </div>
          </div>

          <FounderCard 
            title="Founder"
            name="Mritunjay Pathak"
            role="SDE"
            company="Amazon"
            branch="Computer Science & Engineering"
            batch="Batch of 2019"
            bio="It’s incredible to see how much the club has evolved since we started. Our goal was simple: to create a space where students could innovate and develop skills together—a place where ideas transform into solutions. Strength lies in the networks you build."
            imgSrc={mritunjayImg}
            li="https://linkedin.com"
            ig="https://instagram.com"
          />

          <FounderCard 
            title="Co-Founder"
            name="Shubham Pathak"
            role="Consultant"
            company="Infosys"
            branch="Electronics & Communication"
            batch="Class of 2019"
            bio="Flux represents an ongoing journey of growth and self-improvement. When we founded this club, our vision was to create a platform for individuals to exchange ideas and access free training. We continue to be a force multiplier in technology."
            imgSrc={shubhamImg}
            li="https://linkedin.com"
          />
        </div>
      </div>
    </div>
  );
};

export default FluxAbout;