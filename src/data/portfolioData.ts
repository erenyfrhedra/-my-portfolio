import { SkillCategory, Project, EducationItem, TrainingProgram } from '../types';

// دالة تلقائية لضبط مسار الصورة أياً كان شكل الرابط المكتوب
export const resolveImageUrl = (url?: string): string => {
  if (!url || typeof url !== 'string') return '/portrait.jpg';
  const trimmed = url.trim();
  if (trimmed.startsWith('http://') || trimmed.startsWith('https://') || trimmed.startsWith('data:')) {
    return trimmed;
  }
  // استبدال الشرطات المائلة للويندوز وتصحيح كتابة مجلد public إذا كُتب بالخطأ
  let clean = trimmed.replace(/\\/g, '/');
  if (clean.startsWith('/public/')) clean = clean.replace('/public/', '/');
  if (clean.startsWith('public/')) clean = clean.replace('public/', '/');
  if (!clean.startsWith('/')) clean = '/' + clean;
  return clean;
};

export const PERSONAL_INFO = {
  name: "Ereny Elkomos Hedra",
  title: "AI & Data Science | Machine Learning Engineer",
  // 📸 رابط صورتك الشخصية المعتمدة
  profileImage: "/WhatsApp Image 2026-08-18 at 4.47.26 PM.jpg",
  introduction: "AI & Data Science professional focused on building practical, data-driven solutions using Python and Machine Learning. Skilled in NumPy, Pandas, Scikit-learn, data preprocessing, visualization, and model evaluation. I enjoy transforming data and ideas into meaningful insights and intelligent solutions. Currently expanding my expertise in Machine Learning, Deep Learning, NLP, and Computer Vision through hands-on projects and continuous learning.",
  email: "erenyfr.hedra@gmail.com",
  phone: "01207873040",
  linkedin: "https://www.linkedin.com/in/ereny-elkomos-hedra/",
  github: "https://github.com/erenyfrhedra",
  location: "Assiut, Egypt",
  social: {
    github: "https://github.com/erenyfrhedra",
    linkedin: "https://www.linkedin.com/in/ereny-elkomos-hedra/"
  }
};

export const ABOUT_CONTENT = {
  title: "About Me",
  text: "I focus on Artificial Intelligence, Data Science, and Machine Learning, with hands-on experience in Python, data preprocessing, visualization, and model evaluation. I work with tools such as NumPy, Pandas, and Scikit-learn to explore data and develop practical machine learning solutions. My experience also includes Deep Learning, NLP, Computer Vision, and Microsoft Azure AI through specialized training and hands-on projects."
};

export const SKILL_CATEGORIES: SkillCategory[] = [
  {
    id: "programming",
    name: "Programming",
    skills: ["Python", "C++"]
  },
  {
    id: "data-science",
    name: "Data Science",
    skills: ["NumPy", "Pandas"]
  },
  {
    id: "data-visualization",
    name: "Data Visualization",
    skills: ["Matplotlib", "Seaborn"]
  },
  {
    id: "ai-algorithms",
    name: "AI & Algorithms",
    skills: ["Scikit-learn", "A*", "Minimax", "Greedy Best-First Search"]
  },
  {
    id: "programming-concepts",
    name: "Programming Concepts",
    skills: ["Object-Oriented Programming (OOP)"]
  },
  {
    id: "tools",
    name: "Tools",
    skills: ["Git", "GitHub", "Jupyter Notebook", "Visual Studio Code", "Google Colab"]
  },
  {
    id: "web-technologies",
    name: "Web Technologies",
    skills: ["HTML", "CSS"]
  },
  {
    id: "presentations-design",
    name: "Presentations & Design",
    skills: ["Microsoft PowerPoint", "Canva", "Google Slides", "Gamma"]
  },
  {
    id: "languages",
    name: "Languages",
    skills: ["Arabic — Native", "English — Good"]
  }
];

export const TRAINING_DATA: TrainingProgram = {
  organization: "Digital Egypt Pioneers Initiative (DEPI) – MCIT",
  program: "AI & Data Science – Microsoft Machine Learning Engineer",
  date: "07/2026 – Present",
  format: "Hybrid",
  description: "Training focused on Artificial Intelligence, Data Science, and Machine Learning using Microsoft technologies. Covered Python Programming, Statistics and Linear Algebra, Data Preprocessing and Visualization, Machine Learning, Deep Learning, Natural Language Processing, Computer Vision, Azure AI, and MLOps. Gained practical experience through hands-on labs and a Capstone Project, developing AI solutions and working with real-world data.",
  topics: [
    "Python",
    "Statistics",
    "Linear Algebra",
    "Data Preprocessing",
    "Data Visualization",
    "Machine Learning",
    "Deep Learning",
    "Natural Language Processing",
    "Computer Vision",
    "Azure AI",
    "MLOps"
  ]
};

export const PROJECTS: Project[] = [
  {
    id: "heart-disease-prediction",
    title: "Heart Disease Prediction & AI Diagnostic System",
    technologies: [
      "Python",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Matplotlib",
      "Seaborn",
      "Jupyter Notebook"
    ],
    description: "Built an ML pipeline on 303 patient records with 13 features, including data preprocessing and visualization.",
    details: [
      "Compared 5 classification algorithms using 4 evaluation metrics.",
      "Developed an interactive patient risk predictor using Jupyter Widgets."
    ],
    results: {
      accuracy: "90.16%",
      precision: "93.33%",
      recall: "87.50%",
      f1Score: "90.32%"
    },
    metrics: {
      accuracy: "90.16%",
      precision: "93.33%",
      recall: "87.50%",
      f1Score: "90.32%"
    },
    featured: true,
    github: "https://github.com/erenyfrhedra",
    githubUrl: "https://github.com/erenyfrhedra"
  },
  {
    id: "tic-tac-toe",
    title: "Tic-Tac-Toe Game",
    technologies: [
      "Python",
      "Minimax",
      "Tkinter"
    ],
    description: "Developed a Python Tic-Tac-Toe game using the Minimax algorithm for optimal AI decision-making.",
    features: [
      "Tkinter GUI",
      "3×3 game board",
      "Player vs AI mode",
      "Automatic AI moves",
      "8 winning combinations",
      "Win, loss, draw, and restart logic"
    ],
    featured: false,
    github: "https://github.com/erenyfrhedra",
    githubUrl: "https://github.com/erenyfrhedra"
  },
  {
    id: "puzzle-solver",
    title: "8-Puzzle AI Solver",
    technologies: [
      "Python",
      "A*",
      "Greedy Best-First Search"
    ],
    description: "Developed a Python-based solver using A* and Greedy Best-First Search to solve the 8-Puzzle problem.",
    features: [
      "A* Search",
      "Greedy Best-First Search",
      "Manhattan Distance heuristic",
      "Misplaced Tiles heuristic"
    ],
    comparison: [
      "Execution time",
      "Solution depth",
      "Nodes explored"
    ],
    featured: false,
    github: "https://github.com/erenyfrhedra",
    githubUrl: "https://github.com/erenyfrhedra"
  }
];

export const EDUCATION_DATA: EducationItem = {
  degree: "Bachelor of Computer Science",
  major: "Software Engineering",
  university: "Assiut University – Faculty of Computers and Artificial Intelligence",
  date: "10/2023 – Present",
  location: "Assiut, Egypt",
  coursework: [
    "Data Structures",
    "Algorithms",
    "Object-Oriented Programming (OOP)",
    "Database Systems",
    "Software Engineering"
  ]
};
