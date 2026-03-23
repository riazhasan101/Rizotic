// src/assets/data/industries.js
export const INDUSTRIES = [
  { slug: "manufacturing", name: "Manufacturing", icon: "🏭", description: "Smart factory solutions, predictive maintenance, quality control automation, and production optimization." },
  { slug: "healthcare", name: "Healthcare", icon: "🏥", description: "Medical IoT devices, patient monitoring systems, AI diagnostics, and hospital automation solutions." },
  { slug: "agriculture", name: "Agriculture", icon: "🌾", description: "Precision farming, automated irrigation, crop monitoring drones, and yield prediction systems." },
  { slug: "logistics", name: "Logistics & Supply Chain", icon: "🚚", description: "Warehouse automation, inventory management, route optimization, and smart tracking systems." },
  { slug: "retail", name: "Retail & E-commerce", icon: "🛒", description: "Personalized shopping experiences, inventory management, AI recommendations, and automated checkout systems." },
  { slug: "education", name: "Education & EdTech", icon: "🎓", description: "Smart classrooms, learning management systems, AI tutors, and personalized learning platforms." },
  { slug: "smart-cities", name: "Smart Cities & Real Estate", icon: "🏙️", description: "Building automation, energy management, smart security, and property management solutions." },
  { slug: "banking", name: "Banking & Finance", icon: "🏦", description: "Fraud detection, algorithmic trading, customer service automation, and digital banking solutions." },
];

// src/assets/data/techstack.js — exported inline for single import convenience
export const TECH_CATEGORIES = [
  {
    label: "AI / ML",
    color: "text-orange-400 border-orange-400/30 bg-orange-400/10",
    items: ["Python", "TensorFlow", "PyTorch", "Scikit-learn", "OpenCV", "HuggingFace"],
  },
  {
    label: "Frontend",
    color: "text-blue-400 border-blue-400/30 bg-blue-400/10",
    items: ["React", "Vue.js", "Next.js", "TypeScript", "Tailwind CSS", "Flutter"],
  },
  {
    label: "Backend",
    color: "text-green-400 border-green-400/30 bg-green-400/10",
    items: ["Node.js", "Python", "Java", "Kotlin", "Swift", "Go"],
  },
  {
    label: "DevOps & Cloud",
    color: "text-purple-400 border-purple-400/30 bg-purple-400/10",
    items: ["Docker", "Kubernetes", "AWS", "Azure", "Google Cloud", "Terraform"],
  },
  {
    label: "Data & Storage",
    color: "text-teal-400 border-teal-400/30 bg-teal-400/10",
    items: ["PostgreSQL", "MongoDB", "Redis", "RabbitMQ", "Elasticsearch"],
  },
  {
    label: "IoT & Robotics",
    color: "text-red-400 border-red-400/30 bg-red-400/10",
    items: ["ROS", "Arduino", "Raspberry Pi", "MQTT", "WebRTC", "React Native"],
  },
];

export const PROCESS_STEPS = [
  { number: "01", title: "Discovery", description: "Deep dive into business requirements, challenges, and objectives to understand the complete context." },
  { number: "02", title: "Strategy", description: "Develop customized solutions and implementation roadmap aligned with your business goals." },
  { number: "03", title: "Development", description: "Agile development with continuous testing and client feedback for optimal outcomes." },
  { number: "04", title: "Deployment", description: "Smooth implementation with comprehensive training and change management support." },
  { number: "05", title: "Support", description: "Ongoing maintenance, optimization, and enhancement to ensure long-term success." },
];
