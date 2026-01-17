/**
 * PURE JAVASCRIPT DATA OBJECT
 * No JSX allowed here to prevent SyntaxErrors.
 * Icons are referenced by string names.
 */

export const TEAM_DATA = {
  convenors: [
    { 
      name: "Alpha Leader", 
      role: "Convenor", 
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=1", 
      git: "#", 
      link: "#", 
      bio: "Leading the core architectural decisions of Flux. Focused on engineering excellence and club expansion." 
    },
    { 
      name: "Beta Prime", 
      role: "Convenor", 
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=2", 
      git: "#", 
      link: "#", 
      bio: "Overseeing project lifecycles and technical mentorship for the upcoming generation of developers." 
    },
    { 
      name: "Gamma Core", 
      role: "Convenor", 
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=3", 
      git: "#", 
      link: "#", 
      bio: "Specializing in hardware-software integration and managing the club's research initiatives." 
    },
    { 
      name: "Delta Zero", 
      role: "Convenor", 
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=4", 
      git: "#", 
      link: "#", 
      bio: "Driving community outreach and ensuring the Flux vision reaches every student at SATI." 
    },
  ],
  coConvenors: [
    { 
      name: "Co-Lead A", 
      role: "Co-Convenor", 
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=5", 
      git: "#", 
      link: "#", 
      bio: "Assisting in technical operations and backend infrastructure management." 
    },
    { 
      name: "Co-Lead B", 
      role: "Co-Convenor", 
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=6", 
      git: "#", 
      link: "#", 
      bio: "Managing creative assets and ensuring visual consistency across all Flux platforms." 
    },
    { 
      name: "Co-Lead C", 
      role: "Co-Convenor", 
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=7", 
      git: "#", 
      link: "#", 
      bio: "Coordinating inter-departmental workflows and event scheduling." 
    },
    { 
      name: "Co-Lead D", 
      role: "Co-Convenor", 
      img: "https://api.dicebear.com/7.x/avataaars/svg?seed=8", 
      git: "#", 
      link: "#", 
      bio: "Focusing on student engagement and organizing weekly code sprints." 
    },
  ],
  deptHeads: [
    { name: "Head Tech", dept: "Technical", iconId: "Code" },
    { name: "Head IoT", dept: "Hardware", iconId: "Cpu" },
    { name: "Head Design", dept: "Creative", iconId: "Palette" },
    { name: "Head Ops", dept: "Operations", iconId: "Terminal" },
    { name: "Head App", dept: "App Dev", iconId: "Smartphone" },
    { name: "Head Mkt", dept: "Marketing", iconId: "Megaphone" },
    { name: "Head PR", dept: "Public Relations", iconId: "Globe" },
    { name: "Head Event", dept: "Events", iconId: "Zap" },
    { name: "Head Data", dept: "Database", iconId: "Database" },
  ],
  thirdYear: Array(11).fill("Member Name"),
  galleryImages: Array.from({ length: 30 }, (_, i) => ({
    id: i,
    url: `https://picsum.photos/seed/flux_v3_${i + 100}/800/800`, 
    caption: `Flux Event Log #${200 + i}`
  }))
};