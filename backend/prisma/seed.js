// prisma/seed.js
import { PrismaClient } from "@prisma/client";
import bcrypt from "bcryptjs";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  // Admin user
  const hash = await bcrypt.hash("rizotic_admin_2024", 12);
  await prisma.adminUser.upsert({
    where: { email: "admin@rizotic.com" },
    update: {},
    create: { email: "admin@rizotic.com", passwordHash: hash, name: "Rizotic Admin" },
  });

  // Services
  const services = [
    {
      slug: "ai-ml-solutions",
      name: "AI/ML Solutions",
      icon: "fa-brain",
      colorClass: "from-orange-500 to-red-500",
      accentColor: "#ff6b35",
      description: "Advanced artificial intelligence and machine learning solutions tailored to solve complex business challenges.",
      features: ["Predictive Analytics & Forecasting", "Computer Vision Systems", "Natural Language Processing", "Anomaly Detection Systems", "Recommendation Engines", "AI-powered Decision Support"],
      order: 1,
    },
    {
      slug: "iot-robotics",
      name: "IoT & Smart Devices",
      icon: "fa-satellite-dish",
      colorClass: "from-blue-500 to-blue-700",
      accentColor: "#3498db",
      description: "Custom IoT product development — PCB design, firmware, embedded systems, and smart connected devices across every sector.",
      features: ["Custom PCB Design & Prototyping", "Firmware & Embedded Development", "IoT Sensor & Actuator Integration", "IIoT & Smart Factory 4.0", "Smart Agriculture & Healthcare IoT", "Cloud Connectivity & Remote Monitoring"],
      order: 2,
    },
    {
      slug: "software-services",
      name: "Software Services",
      icon: "fa-laptop-code",
      colorClass: "from-purple-500 to-purple-700",
      accentColor: "#9b59b6",
      description: "Custom software development and digital transformation solutions for modern businesses.",
      features: ["Enterprise Software Development", "Mobile & Web Applications", "Cloud Solutions & Migration", "API Development & Integration", "Legacy System Modernization", "Quality Assurance & Testing"],
      order: 3,
    },
    {
      slug: "devops",
      name: "DevOps Services",
      icon: "fa-server",
      colorClass: "from-teal-500 to-green-600",
      accentColor: "#1abc9c",
      description: "Comprehensive DevOps solutions for efficient software delivery and infrastructure management.",
      features: ["CI/CD Pipeline Implementation", "Cloud Infrastructure Management", "Containerization & Orchestration", "Infrastructure as Code", "Monitoring & Logging Solutions", "Security & Compliance"],
      order: 4,
    },
    {
      slug: "erp-solutions",
      name: "ERP Solutions",
      icon: "fa-database",
      colorClass: "from-green-500 to-teal-600",
      accentColor: "#16a085",
      description: "Comprehensive Enterprise Resource Planning systems to streamline and integrate core business processes.",
      features: ["Financial & Accounting Management", "Supply Chain & Inventory Control", "Human Resource Management", "Customer Relationship Management", "Business Intelligence & Reporting", "Custom ERP Implementation"],
      order: 5,
    },
    {
      slug: "mobile-development",
      name: "Mobile App Development",
      icon: "fa-mobile-alt",
      colorClass: "from-purple-600 to-pink-600",
      accentColor: "#8e44ad",
      description: "Innovative mobile applications for iOS and Android platforms to engage customers and streamline operations.",
      features: ["Native iOS & Android Development", "Cross-Platform Apps (React Native/Flutter)", "Enterprise Mobile Solutions", "UI/UX Design & Prototyping", "App Store Optimization & Deployment", "Maintenance & Support Services"],
      order: 6,
    },
  ];

  for (const service of services) {
    await prisma.service.upsert({
      where: { slug: service.slug },
      update: service,
      create: service,
    });
  }

  // Industries
  const industries = [
    { slug: "manufacturing", name: "Manufacturing", icon: "fa-industry", description: "Smart factory solutions, predictive maintenance, quality control automation, and production optimization.", order: 1 },
    { slug: "healthcare", name: "Healthcare", icon: "fa-heartbeat", description: "Medical IoT devices, patient monitoring systems, AI diagnostics, and hospital automation solutions.", order: 2 },
    { slug: "agriculture", name: "Agriculture", icon: "fa-tractor", description: "Precision farming, automated irrigation, crop monitoring drones, and yield prediction systems.", order: 3 },
    { slug: "logistics", name: "Logistics & Supply Chain", icon: "fa-truck", description: "Warehouse automation, inventory management, route optimization, and smart tracking systems.", order: 4 },
    { slug: "retail", name: "Retail & E-commerce", icon: "fa-shopping-cart", description: "Personalized shopping experiences, inventory management, AI recommendations, and automated checkout systems.", order: 5 },
    { slug: "education", name: "Education & EdTech", icon: "fa-graduation-cap", description: "Smart classrooms, learning management systems, AI tutors, and personalized learning platforms.", order: 6 },
    { slug: "smart-cities", name: "Smart Cities & Real Estate", icon: "fa-building", description: "Building automation, energy management, smart security, and property management solutions.", order: 7 },
    { slug: "banking", name: "Banking & Finance", icon: "fa-university", description: "Fraud detection, algorithmic trading, customer service automation, and digital banking solutions.", order: 8 },
  ];

  for (const industry of industries) {
    await prisma.industry.upsert({
      where: { slug: industry.slug },
      update: industry,
      create: industry,
    });
  }

  console.log("✅ Seed complete!");
}

main().catch(console.error).finally(() => prisma.$disconnect());
