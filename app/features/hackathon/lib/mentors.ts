/**
 * Selected programme mentors shown on the public Mentors page and homepage.
 * Add or edit mentors here manually. Admin acceptance of applications does not
 * publish anyone to this list.
 */

export interface ProgrammeMentor {
  id: string;
  name: string;
  designation: string;
  organization: string;
  bio: string;
  expertise: string;
  initials: string;
  image?: string;
  linkedinUrl?: string;
}

export const MENTORS: ProgrammeMentor[] = [
  {
    id: "mentor-rohan-pant",
    name: "Rohan Pant",
    designation: "Program Manager",
    organization: "Amazon",
    expertise: "Program Management, Product",
    bio: "Guides teams on product thinking, delivery, and stakeholder alignment through the innovation series.",
    initials: "RP",
    image: "/hackathon/mentors/RohanP.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/pantrohan/",
  },
  {
    id: "mentor-virendra-pal",
    name: "Virendra Pal",
    designation: "Operations Manager",
    organization: "Amazon",
    expertise: "Operations, Process",
    bio: "Supports builders on operational design, execution discipline, and scaling practical solutions.",
    initials: "VP",
    image: "/hackathon/mentors/virendraP.jpg",
    linkedinUrl: "https://www.linkedin.com/in/virendrapal0210/",
  },
  {
    id: "mentor-kevin-patel",
    name: "Kevin Patel",
    designation: "Software Engineer",
    organization: "Google",
    expertise: "Software Engineering, Systems",
    bio: "Mentors teams on engineering quality, architecture choices, and shipping reliable products.",
    initials: "KP",
    image: "/hackathon/mentors/kevinP.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/kevinpatel20/",
  },
  {
    id: "mentor-prasant-shekhar-singh",
    name: "Prasant Shekhar Singh",
    designation: "Staff Engineer",
    organization: "Qualcomm",
    expertise: "Software Engineering, Systems",
    bio: "IIT Roorkee alumnus mentoring teams on systems engineering, technical depth, and building reliable products.",
    initials: "PS",
    image: "/hackathon/mentors/prashant.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/pssiitr/",
  },
  {
    id: "mentor-bhavesh-saini",
    name: "Bhavesh Saini",
    designation: "Risk Manager",
    organization: "IIT Roorkee, IIM Calcutta",
    expertise: "Risk Management, Strategy",
    bio: "IIT Roorkee and IIM Calcutta alumnus guiding builders on risk, strategy, and sound decision-making.",
    initials: "BS",
    image: "/hackathon/mentors/bhavesh.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/bhavesh-saini-417684109/",
  },
  {
    id: "mentor-himanshu-rawat",
    name: "Himanshu Rawat",
    designation: "Software Engineer",
    organization: "Google Warsaw",
    expertise: "Software Engineering, Systems",
    bio: "Mentors teams on software engineering, scalable systems, and building reliable products.",
    initials: "HR",
    image: "/hackathon/mentors/himanshu_rawat.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/himanshu998/",
  },
  {
    id: "mentor-anmol-dixit",
    name: "Anmol Dixit",
    designation: "Senior Software Engineer",
    organization: "Rubrik",
    expertise: "Software Engineering, Backend",
    bio: "Helps teams strengthen technical depth, code quality, and production-ready implementation.",
    initials: "AD",
    image: "/hackathon/mentors/anmolD.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/dixitanmol97/",
  },
  {
    id: "mentor-ayush-gupta",
    name: "Ayush Gupta",
    designation: "Data Engineer",
    organization: "Zeta",
    expertise: "Data Engineering, Analytics",
    bio: "Advises on data pipelines, analytics, and turning real-world signals into product insight.",
    initials: "AG",
    image: "/hackathon/mentors/AyushG.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/ayush-gupta-870595175/",
  },
  {
    id: "mentor-sagar-singh",
    name: "Sagar Singh",
    designation: "Software Developer",
    organization: "Scapia",
    expertise: "Software Development, Product",
    bio: "Works with builders on product development, rapid prototyping, and user-focused delivery.",
    initials: "SS",
    image: "/hackathon/mentors/SagarS.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/sagar-singh-ba43001b3/",
  },
  {
    id: "mentor-sparsh-goil",
    name: "Sparsh Goil",
    designation: "Senior Software Engineer",
    organization: "ThoughtSpot",
    expertise: "Software Engineering, Analytics",
    bio: "Mentors teams on engineering craft, analytics products, and shipping high-impact software.",
    initials: "SG",
    image: "/hackathon/mentors/SparshG.png",
    linkedinUrl: "https://www.linkedin.com/in/sparsh-goil-973973112/",
  },
  {
    id: "mentor-ankit-jain",
    name: "Ankit Jain",
    designation: "Software Engineer",
    organization: "Stripe",
    expertise: "Software Engineering, Backend",
    bio: "Mentors teams on engineering excellence, scalable systems, and shipping production-ready software.",
    initials: "AJ",
    image: "/hackathon/mentors/AnkitJain.jpeg",
    linkedinUrl: "https://www.linkedin.com/in/anki2jain/",
  },
];
