import React, { useState, useEffect } from 'react'; // 1. Added useEffect here
import { motion, AnimatePresence } from 'framer-motion';
import { Github, Layers, Cpu, Shield, Wind, Brain, Radio, Microscope, User, Send, Plus, Globe } from 'lucide-react';
import API from '../api'; 
import { PROJECTS_DATA } from '../data/projectData'; // Your imported data

/* ===================== ICON HELPER ===================== */
const getProjectIcon = (iconName) => {
  const icons = {
    shield: <Shield size={16} />,
    cpu: <Cpu size={16} />,
    brain: <Brain size={16} />,
    wind: <Wind size={16} />,
    radio: <Radio size={16} />,
    microscope: <Microscope size={16} />,
  };
  return icons[iconName?.toLowerCase()] || <Layers size={16} />;
};

/* ===================== REFINED CARD COMPONENT ===================== */
const ProjectCard = ({ project }) => {
  // Helper to render the specific category icon
  const getProjectIcon = (iconName) => {
    const icons = {
      shield: <Shield size={16} />,
      cpu: <Cpu size={16} />,
      brain: <Brain size={16} />,
      wind: <Wind size={16} />,
      radio: <Radio size={16} />,
      microscope: <Microscope size={16} />,
    };
    return icons[iconName?.toLowerCase()] || <Layers size={16} />;
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 15 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      className="bg-white dark:bg-[#0c0c0c] border border-slate-200 dark:border-white/5 rounded-[1.5rem] md:rounded-[2rem] p-4 flex flex-col group hover:border-cyan-500/30 transition-all duration-300 shadow-sm h-full"
    >
      {/* Image Header */}
      <div className="aspect-video rounded-xl md:rounded-2xl overflow-hidden mb-4 relative bg-slate-100 dark:bg-white/5">
        <img 
          src={project.img} 
          className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" 
          alt={project.title} 
        />
        <div className="absolute top-3 left-3 p-2 bg-white/90 dark:bg-black/60 backdrop-blur-md rounded-xl text-cyan-600 border border-white/10">
          {getProjectIcon(project.iconName)}
        </div>
      </div>

      <div className="px-1 flex-1 flex flex-col">
        {/* Title & Summary */}
        <h3 className="text-base md:text-lg font-bold tracking-tight text-slate-900 dark:text-white uppercase mb-1">
          {project.title}
        </h3>
        <p className="text-[11px] md:text-xs text-slate-500 dark:text-gray-400 font-medium mb-3 line-clamp-2">
          {project.summary}
        </p>

        {/* Team Members */}
        <div className="flex items-center gap-2 mb-4 bg-slate-50 dark:bg-white/5 p-2 rounded-lg">
          <User size={12} className="text-cyan-500" />
          <div className="flex flex-wrap gap-1">
            {project.team?.map((name, i) => (
              <span key={i} className="text-[9px] md:text-[10px] font-bold text-slate-600 dark:text-gray-300 uppercase">
                {name}{i !== project.team.length - 1 ? ',' : ''}
              </span>
            ))}
          </div>
        </div>

        {/* Tech Stack Tags */}
        <div className="flex flex-wrap gap-1 mb-5">
          {project.tech?.map((t, idx) => (
            <span key={idx} className="px-2 py-0.5 bg-cyan-500/5 text-[9px] font-mono text-cyan-600 dark:text-cyan-400 rounded border border-cyan-500/10">
              {t}
            </span>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 mt-auto">
          {/* Download Button: Links to /public/report/file.pdf */}
          <a 
            href={`/report/${project.reportFile}`} 
            download={project.reportFile}
            className="flex-1 flex items-center justify-center gap-2 bg-slate-900 dark:bg-white text-white dark:text-black py-2.5 md:py-3 rounded-xl font-bold text-[10px] uppercase hover:bg-cyan-600 dark:hover:bg-cyan-500 transition-colors"
          >
            <Globe size={12} /> 
            <span className="hidden xs:inline">Download Report</span>
            <span className="xs:hidden">Report</span>
          </a>

          {/* Github Link */}
          <a 
            href={project.git} 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-2.5 md:p-3 bg-slate-100 dark:bg-white/5 rounded-xl border border-slate-200 dark:border-white/10 hover:text-cyan-500 transition-colors"
          >
            <Github size={16} />
          </a>
        </div>
      </div>
    </motion.div>
  );
};

/* ===================== MAIN APP ===================== */
const FluxProjects = () => {
  const [projects, setProjects] = useState([]);
  
  const [formData, setFormData] = useState({
    submittedBy: '', email: '', title: '', description: '', techStack: '', githubLink: '', liveLink: ''
  });

  // 2. Added this useEffect to load your data into state
  useEffect(() => {
    if (PROJECTS_DATA) {
      setProjects(PROJECTS_DATA);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = {
      ...formData,
      techStack: formData.techStack.split(',').map(item => item.trim())
    };

    try {
      const res = await API.post('/projects', payload);
      if (res.status === 201 || res.status === 200) {
        alert("Proposal Sent to Registry Successfully.");
        setFormData({
          submittedBy: '', email: '', title: '', description: '', 
          techStack: '', githubLink: '', liveLink: ''
        });
      }
    } catch (err) {
      console.error("Transmission Error:", err);
      alert(err.response?.data?.message || "Deployment Failed: System Busy");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-[#050505] text-slate-900 dark:text-slate-100 pt-24 md:pt-32 pb-20 px-4 md:px-6 font-sans overflow-x-hidden">
      
      <header className="max-w-6xl mx-auto mb-12 md:mb-20">
        <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }}>
          <div className="flex items-center gap-2 text-cyan-600 dark:text-cyan-400 text-[10px] font-bold uppercase tracking-[0.3em] mb-3">
            <Layers size={14} /> System Registry
          </div>
          <h1 className="text-4xl xs:text-5xl md:text-7xl font-black tracking-tighter uppercase leading-[0.9]">
            Active <br className="sm:hidden" />
            <span className="italic text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 to-blue-500">Projects</span>
          </h1>
        </motion.div>
      </header>

      <div className="max-w-6xl mx-auto">
        <section className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 mb-24">
          {/* Now projects has data from the useEffect hook */}
          {projects.map((p) => <ProjectCard key={p.id || p._id} project={p} />)}
          
          <motion.div 
            whileHover={{ scale: 0.98 }}
            onClick={() => {
                const element = document.getElementById('simple-form');
                const offset = 100; 
                const bodyRect = document.body.getBoundingClientRect().top;
                const elementRect = element.getBoundingClientRect().top;
                const elementPosition = elementRect - bodyRect;
                const offsetPosition = elementPosition - offset;

                window.scrollTo({
                    top: offsetPosition,
                    behavior: 'smooth'
                });
            }}
            className="border-2 border-dashed border-slate-200 dark:border-white/10 rounded-[1.5rem] md:rounded-[2rem] flex flex-col items-center justify-center p-8 md:p-12 cursor-pointer hover:border-cyan-500/50 transition-all bg-white/50 dark:bg-white/[0.01] min-h-[300px]"
          >
            <div className="p-4 bg-cyan-500/10 rounded-full text-cyan-500 mb-4 animate-pulse"><Plus size={28} /></div>
            <span className="text-[10px] md:text-xs font-black uppercase text-slate-400 tracking-widest text-center">Contribute to Archive</span>
          </motion.div>
        </section>

        <section id="simple-form" className="max-w-3xl mx-auto">
          <div className="bg-white dark:bg-[#0c0c0c] p-6 md:p-12 rounded-[2rem] md:rounded-[3rem] border border-slate-200 dark:border-white/5 shadow-2xl relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/5 blur-3xl rounded-full -mr-16 -mt-16" />
            
            <h2 className="text-xl md:text-3xl font-black uppercase tracking-tight mb-8 flex items-center gap-3">
              <Send size={24} className="text-cyan-500" /> Submit Proposal
            </h2>

            <form onSubmit={handleSubmit} className="space-y-4 md:space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-widest ml-1 text-slate-400">Collaborator</label>
                  <input type="text" required placeholder="Full Name" value={formData.submittedBy}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 md:py-4 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                    onChange={(e) => setFormData({...formData, submittedBy: e.target.value})} />
                </div>
                <div className="space-y-2">
                  <label className="text-[9px] uppercase font-bold tracking-widest ml-1 text-slate-400">Communication</label>
                  <input type="email" required placeholder="Email Address" value={formData.email}
                    className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 md:py-4 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                    onChange={(e) => setFormData({...formData, email: e.target.value})} />
                </div>
              </div>
              
              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold tracking-widest ml-1 text-slate-400">Identification</label>
                <input type="text" required placeholder="Project Title" value={formData.title}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 md:py-4 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                  onChange={(e) => setFormData({...formData, title: e.target.value})} />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold tracking-widest ml-1 text-slate-400">Manifesto</label>
                <textarea required placeholder="Briefly explain the project goals..." rows="4" value={formData.description}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 md:py-4 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all resize-none"
                  onChange={(e) => setFormData({...formData, description: e.target.value})} />
              </div>

              <div className="space-y-2">
                <label className="text-[9px] uppercase font-bold tracking-widest ml-1 text-slate-400">Technology Stack</label>
                <input type="text" placeholder="e.g. React, Python, AWS" value={formData.techStack}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 md:py-4 text-sm outline-none focus:ring-2 focus:ring-cyan-500/20 focus:border-cyan-500 transition-all"
                  onChange={(e) => setFormData({...formData, techStack: e.target.value})} />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <input type="url" placeholder="Source Code URL" value={formData.githubLink}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 md:py-4 text-sm outline-none focus:border-cyan-500 transition-all"
                  onChange={(e) => setFormData({...formData, githubLink: e.target.value})} />
                <input type="url" placeholder="Deployment URL" value={formData.liveLink}
                  className="w-full bg-slate-50 dark:bg-white/5 border border-slate-200 dark:border-white/10 rounded-xl px-4 py-3 md:py-4 text-sm outline-none focus:border-cyan-500 transition-all"
                  onChange={(e) => setFormData({...formData, liveLink: e.target.value})} />
              </div>

              <button type="submit" className="w-full bg-cyan-600 hover:bg-cyan-500 text-white py-4 md:py-5 rounded-2xl font-black uppercase text-[11px] md:text-xs tracking-[0.3em] transition-all shadow-xl shadow-cyan-500/20 active:scale-[0.98]">
                Initialize Deployment
              </button>
            </form>
          </div>
        </section>
      </div>

      <footer className="mt-20 text-center text-slate-400 text-[10px] uppercase tracking-[0.4em] font-bold">
        Flux Archive © 2026 // Decentralized Registry
      </footer>
    </div>
  );
};

export default FluxProjects;