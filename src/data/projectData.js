import { Shield, Cpu, Brain, Wind, Radio, Microscope } from 'lucide-react';

export const PROJECTS_DATA = [
  {
    id: 1,
    title: "Capture_The_Flag",
    desc: "Cybersecurity platform for pen-testing challenges.",
    summary: "A robust training environment with containerized challenges and real-time scoreboards.",
    tech: ["Next.js", "Docker"],
    img: "https://images.unsplash.com/photo-1550751827-4bd374c3f58b",
    git: "#",
    live: "#",
    reportFile: "ctf-report.pdf", // Match this filename in public/report/
    category: "security",
    iconName: "shield",
    team: ["Mahesh K.", "Rahul S."]
  },
  {
    id: 2,
    title: "Obstacle_Bot",
    desc: "Autonomous rover utilizing LiDAR mapping.",
    summary: "Implements SLAM algorithms to navigate complex terrain with remote telemetry.",
    tech: ["Arduino", "ROS"],
    img: "https://images.unsplash.com/photo-1485827404703-89b55fcc595e",
    git: "#",
    live: "#",
    reportFile: "obstacle-bot-report.pdf",
    category: "robotics",
    iconName: "cpu",
    team: ["Priya S.", "Sumit V."]
  },
  {
    id: 3,
    title: "Neural_Nexus",
    desc: "Decentralized LLM training node network.",
    summary: "Leverages idle GPU power across networks to distribute heavy ML workloads.",
    tech: ["Python", "PyTorch"],
    img: "https://images.unsplash.com/photo-1677442136019-21780ecad995",
    git: "#",
    live: "#",
    reportFile: "neural-nexus-report.pdf",
    category: "ai",
    iconName: "brain",
    team: ["Vikram A.", "Sneha K."]
  },
  {
    id: 4,
    title: "Flux_Drone",
    desc: "Stabilized FPV drone with gesture controls.",
    summary: "AI-powered camera recognizes hand gestures to execute flight maneuvers.",
    tech: ["OpenCV", "Raspberry Pi"],
    img: "https://images.unsplash.com/photo-1507504031003-b417219a0fde",
    git: "#",
    live: "#",
    reportFile: "flux-drone-report.pdf",
    category: "hardware",
    iconName: "wind",
    team: ["Aryan R.", "Divya M."]
  },
  {
    id: 5,
    title: "Sat_Link",
    desc: "Satellite signal interceptor for weather data.",
    summary: "Decodes NOAA satellite feeds to render high-res thermal weather maps.",
    tech: ["Rust", "SDR"],
    img: "https://images.unsplash.com/photo-1446776811953-b23d57bd21aa",
    git: "#",
    live: "#",
    reportFile: "sat-link-report.pdf",
    category: "aerospace",
    iconName: "radio",
    team: ["Karan J."]
  },
  {
    id: 6,
    title: "Bio_Sync",
    desc: "Wearable tech for muscle-to-MIDI control.",
    summary: "Translates EMG sensor micro-movements into digital music commands.",
    tech: ["C++", "Sensors"],
    img: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8",
    git: "#",
    live: "#",
    reportFile: "bio-sync-report.pdf",
    category: "biotech",
    iconName: "microscope",
    team: ["Riya B."]
  }
];