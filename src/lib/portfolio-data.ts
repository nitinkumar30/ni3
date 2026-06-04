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
  ai_tools: string;
}

export interface Certification {
  name: string;
  issuer?: string;
}

export interface Honor {
  title: string;
  description?: string;
}

export interface Publication {
  title: string;
  description?: string;
  url?: string;
}

export interface FeaturedProject {
  name: string;
  description: string;
  stars: number;
  language: string;
  url: string;
  topics?: string[];
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
  certifications: Certification[];
  honors: Honor[];
  publications: Publication[];
  featured_projects: FeaturedProject[];
  projects: Project[];
  testimonials: Testimonial[];
  contact: Contact;
  social_links: SocialLinks;
  website_metadata: WebsiteMetadata;
}

export const portfolioData: PortfolioData = {
  personal_info: {
    name: "Nitin S Kumar",
    title: "Senior Automation Engineer",
    headline:
      "Enthusiastic about Python | Aspiring Data Scientist | ⭐⭐⭐⭐ on HackerRank | ex-TCS",
    current_role: "Senior Automation Engineer",
    current_company: "Happiest Minds Technologies",
    current_location: "Pune, Maharashtra, India",
    profile_image: "images/nitin.jpg",
    resume_url:
      "https://drive.google.com/drive/u/3/folders/14u3ywzWiFJjtl09JLlJUJc8eXEgJIkiZ",
    old_portfolio_url: "https://portfolio-nitin.netlify.app",
  },
  about: {
    roles: [
      "Senior Automation Engineer",
      "Python Developer",
      "Aspiring Data Scientist",
      "Cyber Security Enthusiast",
    ],
    interests: [
      "Python Automation",
      "Selenium Testing",
      "Data Science",
      "Web Development",
      "Cyber Security",
      "GCP & Cloud",
      "Open Source",
    ],
    summary:
      "Automation Engineer with a focus on meeting quality goals and customer service. Experienced in using JIRA, GCP, Selenium, and other tools to complete tasks before deadlines. Currently serving as Senior Automation Engineer at Happiest Minds Technologies, Pune in the PDES (Product & Digital Engineering Services) department, developing and maintaining robust automation test scripts using Python and Selenium, leading framework migrations, and delivering sessions on GCP automation.",
  },
  statistics: {
    certifications: "5+",
    projects: "200+",
    working_years: "5+",
    languages_known: "4",
    tools_used: "11+",
    ai_tools: "4+",
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
      duration: "03/2024 - Present",
      description:
        "Department: PDES (Product & Digital Engineering Services). Developed and maintained robust automation test scripts using Python and Selenium. Enhanced existing automation frameworks by integrating new features, optimizing performance, and ensuring scalability. Led the migration of test automation frameworks from legacy systems to modern platforms. Headed an intern's one-month internship in data science. Delivered a comprehensive session on GCP automation for data migration from local SQL Server to Google Cloud Platform.",
    },
    {
      position: "System Engineer",
      company: "Tata Consultancy Services",
      duration: "10/2023 - 02/2024",
      description:
        "Served my organisation as Automation Engineer in Python.",
    },
    {
      position: "Assistant System Engineer",
      company: "Tata Consultancy Services",
      duration: "10/2022 - 09/2023",
      description:
        "Investigated system component suitability for specified purposes and made recommendations regarding component use. Developed system engineering, software engineering, system integration, and distributed system architectures. Selected hardware and software components required to meet user needs. Tested and verified software patches to restore or enhance system performance.",
    },
    {
      position: "Automation Engineer",
      company: "Tata Consultancy Services",
      duration: "10/2021 - 09/2022",
      description:
        "Identifying and selecting automation test cases. Applying various designs and documenting automation test strategy. Configuring Selenium Test Environment (STE). Automating the design of a framework and implementing it per project structure. Creating, enhancing, debugging, and running test cases. Collating and monitoring the defect management process. Managing changes and executing regression tests. Interacting with customers to resolve issues.",
    },
    {
      position: "IT Analyst",
      company: "Tata Consultancy Services",
      duration: "10/2020 - 09/2021",
      description:
        "Worked as a Software Functional Tester. Reviewed software requirements and prepared relevant test scenarios. Executed tests on software usability and demand. Analyzed test results on database impacts, errors or bugs, and usability. Prepared reports on all aspects related to software testing and reported to the design team. Interacted with clients to understand product requirements. Participated in design reviews.",
    },
    {
      position: "Data Science & Business Analytics Intern",
      company: "The Sparks Foundation",
      duration: "07/2021 - 07/2021",
      description:
        "Virtual internship with The Sparks Foundation on the topic 'Data Science & Business Analytics'.",
    },
    {
      position: "Placement Coordinator",
      company: "Arka Jain University",
      duration: "09/2019 - 02/2020",
      description:
        "Served as Placement Coordinator for BCA students, assisting with participation and preparation for company recruitment drives. Organized workshops on resume building, interview skills, and job application processes. Facilitated communication between students and prospective employers. Provided one-on-one counseling to address individual student concerns.",
    },
    {
      position: "Internship Trainee",
      company: "Integrated Software Enterprises",
      duration: "05/2019 - 07/2019",
      description:
        "Worked on a project using ASP.NET framework with SQL Server as backend.",
    },
  ],
  skills: [
    { name: "Python", proficiency: "90%" },
    { name: "Selenium", proficiency: "90%" },
    { name: "Automation Testing", proficiency: "90%" },
    { name: "Pytest", proficiency: "85%" },
    { name: "API Testing", proficiency: "80%" },
    { name: "Manual Testing", proficiency: "85%" },
    { name: "JIRA", proficiency: "85%" },
    { name: "Git", proficiency: "80%" },
    { name: "GCP", proficiency: "75%" },
    { name: "MySQL / SQL Server", proficiency: "75%" },
    { name: "Java", proficiency: "70%" },
    { name: "Web Development", proficiency: "70%" },
    { name: "Bootstrap", proficiency: "70%" },
    { name: "Prompt Engineering", proficiency: "70%" },
    { name: "Vibe Coding", proficiency: "70%" },
    { name: "Anaconda", proficiency: "65%" },
    { name: "Data Science", proficiency: "60%" },
    { name: "Cyber Security", proficiency: "50%" },
  ],
  certifications: [
    { name: "Eduhub Tech Conference" },
    { name: "Programming Foundations: Software Testing/QA" },
    { name: "Digital: Python Foundation" },
    { name: "Certificate of Participation in Codegoda 2022 Programming Competition" },
    { name: "Wifi Network Hacking" },
  ],
  honors: [
    { title: "iAppreciate Q2 '24", description: "Quarterly recognition award at Happiest Minds Technologies" },
  ],
  publications: [
    { title: "PyShrink: Python Projects, Minus the Junk", description: "A Python project sanitizer & packager built with a POM-style framework architecture." },
    { title: "PhoneTracer ⚡ OSINT Phone Number Metadata Toolkit", description: "An OSINT toolkit for extracting metadata from phone numbers." },
  ],
  featured_projects: [
    {
      name: "edu-mail-auto-generator",
      description: "Automatically generate an edu-mail for you in less than 10 minutes using Python and Selenium.",
      stars: 119,
      language: "Python",
      url: "https://github.com/nitinkumar30/edu-mail-auto-generator",
      topics: ["automation", "selenium", "python"],
    },
    {
      name: "auto-book-covid-vaccine-slots",
      description: "Booking vaccine slots automatically whenever a slot is ready using Python and Selenium.",
      stars: 3,
      language: "Python",
      url: "https://github.com/nitinkumar30/auto-book-covid-vaccine-slots",
      topics: ["automation", "covid-19", "python"],
    },
    {
      name: "number-recognition-using-python",
      description: "Handwriting digit recognition with ML, dataset, and GUI using Tkinter.",
      stars: 3,
      language: "Python",
      url: "https://github.com/nitinkumar30/number-recognition-using-python",
      topics: ["machine-learning", "digit-recognizer", "python"],
    },
    {
      name: "keylogger",
      description: "Keylogger made in Python with a shell script for relevant output.",
      stars: 3,
      language: "Python",
      url: "https://github.com/nitinkumar30/keylogger",
      topics: ["cyber-security", "python"],
    },
    {
      name: "hawk",
      description: "Network, recon and offensive-security tool for Linux systems.",
      stars: 2,
      language: "Shell",
      url: "https://github.com/nitinkumar30/hawk",
      topics: ["security", "recon", "network"],
    },
    {
      name: "control-pc-remotely",
      description: "Control your PC remotely using this mini-project with just 2 files.",
      stars: 2,
      language: "Python",
      url: "https://github.com/nitinkumar30/control-pc-remotely",
      topics: ["networking", "python", "remote"],
    },
    {
      name: "auto-search-job-openings",
      description: "Automatically search job openings from various sites using Python.",
      stars: 2,
      language: "Python",
      url: "https://github.com/nitinkumar30/auto-search-job-openings",
      topics: ["automation", "job-search", "python"],
    },
    {
      name: "phonetracer",
      description: "OSINT Phone Number Metadata Toolkit for phone number reconnaissance.",
      stars: 1,
      language: "Python",
      url: "https://github.com/nitinkumar30/phonetracer",
      topics: ["osint", "security", "python"],
    },
    {
      name: "Black-Coder",
      description: "First blog project built with Python Flask framework for user-friendly websites.",
      stars: 2,
      language: "CSS",
      url: "https://github.com/nitinkumar30/Black-Coder",
      topics: ["flask", "blog", "web-development"],
    },
    {
      name: "ransomware-using-python",
      description: "A ransomware script demonstrating file encryption and verification processes in Python.",
      stars: 1,
      language: "Python",
      url: "https://github.com/nitinkumar30/ransomware-using-python",
      topics: ["cyber-security", "encryption", "python"],
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
    address: "Pune, Maharashtra, India",
    phone: "+91 9113797199",
    email: "nitinkumarpythonic@gmail.com",
    map_url: "https://goo.gl/maps/zbQ7zrj9UhyXE4yU6",
  },
  social_links: {
    github: "https://github.com/nitinkumar30",
    twitter: "https://twitter.com/nitinkumar30",
    linkedin: "https://www.linkedin.com/in/nitin30kumar/",
    instagram: "https://www.instagram.com/nitinkumar30.py/",
  },
  website_metadata: {
    title: "Nitin S Kumar",
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
