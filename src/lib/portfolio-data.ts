export interface PersonalInfo {
  name: string;
  title: string;
  headline: string;
  current_role: string;
  current_company: string;
  current_location: string;
  profile_image: string;
  resume_url: string;
  old_portfolio_url: string;
}

export interface About {
  roles: string[];
  interests: string[];
  summary: string;
}

export interface Statistics {
  certifications: string;
  projects: string;
  working_years: string;
  languages_known: string;
  tools_used: string;
}

export interface Education {
  degree: string;
  institution: string;
  duration?: string;
  year?: string;
  description: string;
}

export interface WorkExperience {
  position: string;
  company: string;
  duration: string;
  description: string;
}

export interface Skill {
  name: string;
  proficiency: string;
}

export interface Project {
  name: string;
  image: string;
  description: string;
}

export interface Testimonial {
  name: string;
  designation: string;
  testimonial: string;
}

export interface Contact {
  address: string;
  phone: string;
  email: string;
  map_url: string;
}

export interface SocialLinks {
  github: string;
  twitter: string;
  linkedin: string;
  instagram: string;
}

export interface WebsiteMetadata {
  title: string;
  language: string;
  favicon: string;
  video_background: string;
  navigation: string[];
}

export interface PortfolioData {
  personal_info: PersonalInfo;
  about: About;
  statistics: Statistics;
  education: Education[];
  work_experience: WorkExperience[];
  skills: Skill[];
  projects: Project[];
  testimonials: Testimonial[];
  contact: Contact;
  social_links: SocialLinks;
  website_metadata: WebsiteMetadata;
}

export const portfolioData: PortfolioData = {
  personal_info: {
    name: "Nitin Kumar",
    title: "Python Developer",
    headline:
      "A passionate Python Developer with interest in Automation and Data Science along with good knowledge of Ethical Hacking.",
    current_role: "Senior Automation Engineer",
    current_company: "Happiest Minds Technologies",
    current_location: "Pune, India",
    profile_image: "images/nitin.jpg",
    resume_url:
      "https://drive.google.com/drive/u/3/folders/14u3ywzWiFJjtl09JLlJUJc8eXEgJIkiZ",
    old_portfolio_url: "https://portfolio-nitin.netlify.app",
  },
  about: {
    roles: [
      "Python Developer",
      "Neophyte in Cyber Security",
      "Senior Automation Engineer",
      "Web Developer",
    ],
    interests: [
      "Automation Scripts",
      "Data Science",
      "Python",
      "Cyber Security",
      "Web Development",
    ],
    summary:
      "I'm a Python Developer and Neophyte in Cyber Security. Currently working as Senior Automation Engineer in Happiest Minds Technologies, Pune. I'm very interested in creating Automation scripts. Also learning Data Science with Python and recent Web Developer.",
  },
  statistics: {
    certifications: "30+",
    projects: "70+",
    working_years: "3+",
    languages_known: "6+",
    tools_used: "7+",
  },
  education: [
    {
      degree: "MCA (Master of Computer Applications)",
      institution: "Arka Jain University",
      duration: "2021-2023",
      description:
        "Completed Post Graduation with Computer Software as specialization.",
    },
    {
      degree: "BCA (Bachelor of Computer Applications)",
      institution: "Arka Jain University",
      duration: "2017-2020",
      description: "Completed Graduation with IT as specialization.",
    },
    {
      degree: "Intermediate",
      institution: "DAV Public School, NIT Campus",
      year: "2017",
      description:
        "Completed my schooling with Science stream & 1st division.",
    },
  ],
  work_experience: [
    {
      position: "Senior Automation Engineer",
      company: "Happiest Minds Technologies",
      duration: "03/2024 - Current",
      description:
        "Currently working in my organisation as Senior Automation Engineer in Python.",
    },
    {
      position: "System Engineer",
      company: "Tata Consultancy Services",
      duration: "10/2023 - 03/2024",
      description:
        "Currently serving my organisation as Automation Engineer in Python.",
    },
    {
      position: "Assistant System Engineer",
      company: "Tata Consultancy Services",
      duration: "10/2022 - 09/2023",
      description: "Served as Assistant System Engineer after getting promoted.",
    },
    {
      position: "Programmer",
      company: "Tata Consultancy Services",
      duration: "10/2021 - 09/2022",
      description: "Served as Programmer after getting promoted.",
    },
    {
      position: "IT Analyst",
      company: "Tata Consultancy Services",
      duration: "10/2020 - 09/2021",
      description: "Joined TCS as a fresher.",
    },
    {
      position: "Placement Coordinator",
      company: "Arka Jain University",
      duration: "2019 - 2020",
      description: "Helped students with interview preparations.",
    },
    {
      position: "Web Developer",
      company: "Freelancing",
      duration: "2019 - 2020",
      description: "Worked as a freelancer with local clients.",
    },
  ],
  skills: [
    {
      name: "Python Development",
      proficiency: "70%",
    },
    {
      name: "Automation",
      proficiency: "90%",
    },
    {
      name: "Data Science",
      proficiency: "60%",
    },
    {
      name: "Web Development",
      proficiency: "65%",
    },
  ],
  projects: [
    {
      name: "Auto Book Slot for Vaccine",
      image: "projects_/auto-book-vaccinne-slots.PNG",
      description:
        "Automates the process of booking a slot for taking COVID vaccine during the pandemic.",
    },
    {
      name: "Auto Edu Mail Generator",
      image: "projects_/auto-edu-mail-generator.PNG",
      description: "Automates the process of creating EDU emails.",
    },
    {
      name: "Automation Mini Projects",
      image: "projects_/automation-using-python.PNG",
      description:
        "Collection of automation projects built using Python libraries and packages.",
    },
    {
      name: "Blog Website",
      image: "projects_/blog-websit-using-python.PNG",
      description: "A blog website built using Python Flask.",
    },
    {
      name: "Search Engine for CSV",
      image: "projects_/project-1.png",
      description: "Allows users to search through CSV data efficiently.",
    },
    {
      name: "Cosmopolitan Award Nomination Automation",
      image: "projects_/project-2.png",
      description: "Automates nomination submissions for 22 categories.",
    },
    {
      name: "Number Recognition",
      image: "projects_/number-recognition-using-python.PNG",
      description:
        "Machine learning project that recognizes handwritten numbers.",
    },
    {
      name: "Web Scrapping",
      image: "projects_/web-scrapping-using-python.PNG",
      description: "Automates collection of data from websites.",
    },
    {
      name: "Ransomware Using Python",
      image: "projects_/project-3.png",
      description:
        "Demonstrates file encryption and verification processes.",
    },
  ],
  testimonials: [
    {
      name: "Zeba Bukhtayar",
      designation: "AJU Placement Cell",
      testimonial:
        "You're quite good at your work at this young age. You're doing wonderful job.",
    },
    {
      name: "Divya Pakairay",
      designation: "AJU CS Department Professor",
      testimonial:
        "Nice and humble student with good understanding of Python. Knows better usage of it in almost any field be it automation, creating applications, Web designing etc.",
    },
    {
      name: "Naveen Kumar",
      designation: "1st Client",
      testimonial:
        "Best Web Designer at this young age. Even not a graduate and working as a freelance Web Developer. God Bless!",
    },
  ],
  contact: {
    address:
      "Adityapur-2, Jamshedpur, Saraikela-Kharsawan, Jharkhand, India",
    phone: "+91 9113797199",
    email: "nitinkumar30.py@gmail.com",
    map_url: "https://goo.gl/maps/zbQ7zrj9UhyXE4yU6",
  },
  social_links: {
    github: "https://github.com/nitinkumar30",
    twitter: "https://twitter.com/nitinkumar30",
    linkedin: "https://www.linkedin.com/in/nitin30kumar/",
    instagram: "https://www.instagram.com/nitinkumar30.py/",
  },
  website_metadata: {
    title: "Nitin Kumar",
    language: "en",
    favicon: "/images/favicon-1.png",
    video_background: "videos/2.mp4",
    navigation: [
      "Home",
      "About Me",
      "Education",
      "Work Experience",
      "My Skills",
      "My Work",
      "Testimonials",
      "Contact Me",
    ],
  },
};
