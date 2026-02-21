// Mock Portfolio Data for Varakumar G

export const portfolioData = {
  user: {
    name: "Varakumar G",
    username: "varakumar",
    role: "Cybersecurity Enthusiast",
    bio: "Specialized in vulnerability assessment, ICS/SCADA security, and offensive security. Experienced in cloud compliance, kernel development, and automation with AI-driven security solutions.",
    ip: "fetching..." // Will be updated dynamically
  },
  
  projects: [
    {
      name: "Wireguard VPN | Self-Hosted Server",
      description: "Deployed a WireGuard VPN server on Ubuntu as a personal project to explore network security and system administration. Automated peer setup, routing, and firewall configurations using Bash and iptables to secure and isolate VPN traffic.",
      technologies: ["Bash", "Linux Networking", "iptables", "WireGuard", "Ubuntu"],
      status: "Active",
      type: "Network Security"
    },
    {
      name: "NetHunter & KernelSU Kernel for OnePlus 9",
      description: "Integrated KernelSU into the OnePlus 9 kernel, enabling enhanced root management and custom module support. Developed and maintain NetHunter-compatible custom kernels for the OnePlus 9, supporting HID attacks, packet injection, and offensive security testing tools.",
      technologies: ["Kernel Development", "Android", "LineageOS", "KernelSU", "NetHunter", "C"],
      status: "Maintained",
      type: "Kernel Development & Security"
    },
    {
      name: "InfoScrape | Open-Source Enumeration Tool",
      description: "Built a Python-based enumeration tool integrating Nmap, Hunter.io, and Tkinter to automate email, IP, and social media data extraction for penetration testing and OSINT operations.",
      technologies: ["Python", "Nmap", "Tkinter", "Hunter.io API", "OSINT"],
      status: "Completed",
      type: "Security Tool Development"
    }
  ],
  
  skills: {
    "Offensive Security": [
      "Vulnerability Assessment & Exploitation",
      "Zero-Day Research",
      "OSCP (Ongoing)",
      "Social Engineering",
      "MITRE ATT&CK Framework",
      "Burp Suite",
      "OWASP Top 10"
    ],
    "ICS/SCADA Security": [
      "ICS/SCADA Security",
      "Modbus Protocol",
      "BACnet Protocol",
      "DNP3",
      "EtherNet/IP",
      "PROFINET"
    ],
    "Cloud & Compliance": [
      "CloudSploit",
      "Azure Security Compliance",
      "NIST Frameworks",
      "CIS Benchmarks",
      "NVD (National Vulnerability Database)",
      "Google Cloud Platform (GCP)",
      "Amazon Web Services (AWS)"
    ],
    "Defensive Security": [
      "Incident Response",
      "SIEM",
      "Active Directory Security",
      "Root Security Bypass"
    ],
    "Programming & Scripting": [
      "Python (3+ years)",
      "Node.js (2 years)",
      "NASL (2 years)",
      "Bash Scripting",
      "NSE (Nmap Scripting)",
      "MongoDB",
      "MySQL"
    ],
    "Security Tools": [
      "OpenVAS",
      "Nessus",
      "Nmap",
      "Metasploit",
      "Kali Linux",
      "NetHunter"
    ]
  },
  
  impact: [
    "Expanded CVE database from 400 → 3200+ (700% growth)",
    "Automated NASL generation using AI",
    "Developed 1500+ custom NASL scripts",
    "Built production-grade SCADA vulnerability checks and Detection Scripts",
    "Maintained CIS benchmark compliance across cloud infra"
  ],
  
  knownIssues: [
    { status: "ongoing", text: "Ongoing OSCP Certificate" },
    { status: "ongoing", text: "Ongoing Lineage OS Op9 Custom ROM" }
  ],
  
  statusMessage: {
    status: "Not working",
    message: "Looking for Job opportunity"
  },
  
  resumeLink: "https://drive.google.com/file/d/17c5RtAgWn5TdRQUxnDIvLQogPoUoxgO_/view?usp=sharing",
  
  experience: [
    {
      company: "Holmsecurity AB",
      role: "Security Developer",
      location: "Sweden (Remote/WFH)",
      duration: "2 years",
      description: "Extensive experience in vulnerability assessment and SCADA security, expanding CVE database by 700% through custom NASL script development.",
      responsibilities: [
        "Extensive experience with OpenVAS and Nessus for vulnerability assessment and management",
        "Proficient in multiple SCADA communication protocols (SNMP, Modbus, BACnet, EtherNet/IP)",
        "Independently managed CloudSploit, maintained CIS benchmark compliance, developed multiple Node.js plugins",
        "Designed and implemented SCADA NASL scripts, expanding CVE database from 400 to 3,200+ vulnerabilities",
        "Developed AI-driven automation for NASL plugin generation (OpenVAS/Nessus)",
        "Intermediate proficiency in Microsoft Azure with foundational knowledge of GCP and AWS"
      ]
    },
    {
      company: "OnePlus 9 Open-Source Development",
      role: "Developer & Researcher",
      location: "Open-Source Community",
      duration: "1+ year",
      description: "Open-source kernel development and security research for OnePlus 9, focusing on custom ROM and security tool integration.",
      responsibilities: [
        "Integrated KernelSU into OnePlus 9 kernel for enhanced root management",
        "Developed NetHunter-compatible custom kernels supporting HID attacks",
        "Implemented packet injection capabilities for security testing",
        "Maintained and updated kernel modules for offensive security tools"
      ]
    }
  ],
  
  certifications: [
    {
      name: "Offensive Security Certified Professional (OSCP)",
      issuer: "OffSec",
      status: "Ongoing"
    },
    {
      name: "Practical Ethical Hacking",
      issuer: "TCM Security",
      status: "Certified"
    },
    {
      name: "Windows and Linux Privilege Escalation",
      issuer: "TCM Security",
      status: "Certified"
    },
    {
      name: "Open-Source Intelligence (OSINT) Fundamentals",
      issuer: "TCM Security",
      status: "Certified"
    },
    {
      name: "The External Pentest Playbook",
      issuer: "TCM Security",
      status: "Certified"
    }
  ],
  
  social: {
    github: "https://github.com/varakumar",
    gitlab: "https://gitlab.com/Tony_01",
    linkedin: "https://linkedin.com/in/varakumar",
    email: "varakumar7000@gmail.com"
  },
  
  github: {
    username: "varakumar",
    gitlab: "Tony_01",
    profile: "https://github.com/varakumar",
    repositories: [
      "wireguard-vpn",
      "op9-nethunter-kernel",
      "kernelsu-lineageos",
      "infoscrape-tool",
      "security-automation-scripts"
    ],
    stats: {
      repos: "20+",
      contributions: "500+",
      focus: "Security Tools & Kernel Development"
    }
  },
  
  education: {
    institution: "Malla Reddy College of Engineering & Technology",
    degree: "Bachelor of Science in Computer Science",
    location: "Hyderabad"
  }
};
