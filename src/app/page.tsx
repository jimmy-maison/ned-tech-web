'use client';

import React, { useRef, useState } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { TbBrandNextjs, TbDatabase } from "react-icons/tb";
import { SiBun } from "react-icons/si";
import { FaRegCopy, FaCheck } from "react-icons/fa";

const techStack = [
  {
    id: "nextjs",
    name: "Next.js",
    description: "The React framework for production. SSR, SSG, and more for a rich user experience.",
    longDescription: "Next.js enables you to create full-stack Web applications by extending the latest React features, and integrating powerful Rust-based JavaScript tooling for the fastest builds. It offers server-side rendering and static site generation, route pre-fetching, image optimization, and internationalization support out of the box, making it a go-to for performant and scalable applications.",
    advantages: [
      "Optimized for Performance",
      "Excellent Developer Experience",
      "Versatile Rendering Methods",
      "Strong Community & Ecosystem"
    ],
    color: "#0070f3",
    icon: TbBrandNextjs 
  },
  {
    id: "elysiajs",
    name: "ElysiaJS",
    description: "Ergonomic, fast, and type-safe backend framework for Bun & Node.js, built for high performance.",
    longDescription: "ElysiaJS is designed for simplicity and performance, offering an intuitive API for building backend services. It leverages the speed of Bun and provides end-to-end type safety, leading to more robust and maintainable code. Its focus on developer ergonomics and high throughput makes it ideal for modern, demanding applications.",
    advantages: [
      "Blazing Fast Performance",
      "End-to-End Type Safety",
      "Developer-Friendly API",
      "Built for Bun & Node.js"
    ],
    color: "#f7df1e", 
    icon: SiBun
  },
  {
    id: "drizzleorm",
    name: "Drizzle ORM",
    description: "Modern TypeScript ORM that stays close to SQL, providing excellent type safety for database operations.",
    longDescription: "Drizzle ORM provides a SQL-like query builder with full TypeScript support, ensuring type safety down to the database level. It avoids the complexities of traditional ORMs by staying close to SQL, offering a more intuitive and efficient way to interact with your database. Its lightweight nature and focus on raw performance make it a great choice for any project.",
    advantages: [
      "Type-Safe SQL Queries",
      "Lightweight & Performant",
      "Intuitive SQL-like Syntax",
      "Excellent DX with TypeScript"
    ],
    color: "#84cc16", 
    icon: TbDatabase
  }
];

const ParallaxSection = ({ tech }: { tech: typeof techStack[0] }) => {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'] 
  });

  const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
  const y = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [50, 0, 0, -50]);
  const scale = useTransform(scrollYProgress, [0, 0.3], [0.8, 1]);
  const rotate = useTransform(scrollYProgress, [0, 1], [0, 15]);
  const x = useTransform(scrollYProgress, [0, 1], [-50, 50]);
  const bgScale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);
  const TechIcon = tech.icon; 

  return (
    <motion.section 
      ref={targetRef} 
      className="min-h-[60vh] md:min-h-[70vh] py-16 md:py-20 px-4 sm:px-6 md:px-8 flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 relative overflow-hidden"
      style={{ y, opacity, scale, x }}
    >
      <motion.div className="md:w-1/2 space-y-4 md:space-y-6">
        <h2 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-4" style={{ color: tech.color }}>{tech.name}</h2>
        <p className="text-base sm:text-lg text-gray-300 leading-relaxed">
          {tech.longDescription}
        </p>
        <div className="mt-6">
          <h4 className="text-2xl font-semibold mb-3 text-gray-100">Key Advantages:</h4>
          <ul className="space-y-2">
            {tech.advantages.map((adv, i) => (
              <motion.li 
                key={i} 
                className="flex items-center text-gray-300"
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ delay: i * 0.1 + 0.5 }}
              >
                <svg className="w-4 h-4 sm:w-5 sm:h-5 mr-2 sm:mr-3 shrink-0" style={{ color: tech.color }} fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
                <span className="text-sm sm:text-base">{adv}</span>
              </motion.li>
            ))}
          </ul>
        </div>
      </motion.div>
      <motion.div 
        className="md:w-1/3 flex items-center justify-center p-8"
        initial={{ opacity: 0, scale: 0.5 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.3 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{ rotate }}
      >
        <TechIcon className="w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 opacity-80 group-hover:opacity-100 transition-opacity duration-300" style={{ color: tech.color }} />
      </motion.div>
       <motion.div
        className="absolute -z-10 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-64 h-64 sm:w-96 sm:h-96 md:w-[600px] md:h-[600px] rounded-full opacity-10"
        style={{ backgroundColor: tech.color, scale: bgScale }}
      />
    </motion.section>
  );
};

const Page = () => {
  const [npmCopied, setNpmCopied] = useState(false);

  const handleNpmCopy = () => {
    navigator.clipboard.writeText("npx create-ned-tech test-project")
      .then(() => {
        setNpmCopied(true);
        setTimeout(() => setNpmCopied(false), 2000); 
      })
      .catch(err => {
        console.error("Failed to copy: ", err);
      });
  };

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.9 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        type: 'spring',
        stiffness: 80,
        damping: 15
      },
    },
  };

  const cardHoverVariants = {
    hover: {
      scale: 1.03,
      boxShadow: "0px 15px 35px -10px rgba(0, 0, 0, 0.4)", 
      transition: { duration: 0.3, type: "spring", stiffness: 200, damping: 15 }
    }
  };

  const cardHoverWithTiltVariants = {
    hover: (color: string) => ({
      scale: 1.05,
      rotateX: 6,
      rotateY: 10,
      boxShadow: `0px 15px 30px -10px ${color}55`,
      borderColor: color,
      transition: { duration: 0.2, type: "spring", stiffness: 200, damping: 12 }
    }),
    rest: {
      scale: 1,
      rotateX: 0,
      rotateY: 0,
      boxShadow: "0px 8px 15px -3px rgba(0, 0, 0, 0.1), 0px 4px 6px -2px rgba(0, 0, 0, 0.05)",
      borderColor: "rgba(255, 255, 255, 0.1)",
      transition: { duration: 0.3, type: "spring", stiffness: 100, damping: 15 }
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-purple-900 to-gray-900 text-white flex flex-col items-center p-4 selection:bg-pink-500 selection:text-white overflow-x-hidden animate-gradient-xy">
      <header className="absolute top-0 left-0 p-4 md:p-8 w-full flex justify-between items-center z-50 backdrop-blur-sm bg-gray-900/30">
        <motion.h1 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="text-xl sm:text-2xl md:text-4xl font-bold tracking-tight"
        >
          Next <span className="text-blue-400">•</span> Elysia <span className="text-yellow-400">•</span> Drizzle
        </motion.h1>
      </header>

      <main className="flex flex-col items-center justify-center w-full flex-1 px-4 md:px-20 text-center mt-24 md:mt-32">
        <motion.div
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, delay: 0.5, type: 'spring', stiffness: 50 }}
          className="mb-12 md:mb-20"
        >
          <h2 className="text-4xl sm:text-5xl md:text-7xl font-extrabold mb-3 sm:mb-4 leading-tight">
            Build <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-500">Awesome</span> Full-Stack Apps.
          </h2>
          <p className="text-base sm:text-lg md:text-xl text-gray-300 max-w-xs sm:max-w-md md:max-w-3xl mx-auto">
            Unleash the combined power of Next.js, ElysiaJS, and Drizzle ORM for unparalleled performance and developer experience.
          </p>
        </motion.div>

        <motion.section
          className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8 max-w-6xl w-full mb-12 md:mb-16 perspective-[1000px]"
          variants={containerVariants}
          initial="hidden"
          animate="visible"
        >
          {techStack.map((tech) => {
            const TechIcon = tech.icon; 
            return (
              <motion.div
                key={tech.id}
                className="group bg-gray-800 p-6 md:p-8 rounded-xl shadow-lg flex flex-col items-center text-center cursor-pointer transform transition-all duration-300 border border-transparent"
                variants={cardHoverWithTiltVariants}
                whileHover="hover"
                initial="rest"
                custom={tech.color}
              >
                <motion.div whileHover={{ scale: 1.1, rotate: -4 }} transition={{ type: 'spring', stiffness: 300, damping: 10}}>
                  <TechIcon className="w-10 h-10 sm:w-12 sm:h-12 mb-4 sm:mb-5 group-hover:scale-110 transition-transform duration-300" style={{ color: tech.color }}/>
                </motion.div>
                <h3 className={`text-2xl sm:text-3xl font-bold mb-2 sm:mb-3`} style={{ color: tech.color }}>{tech.name}</h3>
                <p className="text-gray-300 text-xs sm:text-sm leading-relaxed px-1 sm:px-0">{tech.description}</p>
              </motion.div>
            );
          })}
        </motion.section>

        <motion.div 
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0}}
          transition={{ duration: 0.5, delay: techStack.length * 0.2 + 0.6 }} 
        >
          <div
            className="font-mono text-xs sm:text-base text-left bg-gray-800 border border-gray-700 rounded-lg p-3 sm:p-4 shadow-xl sm:shadow-2xl cursor-pointer hover:border-pink-500 transition-colors duration-300 flex items-center justify-between group relative max-w-md sm:max-w-xl md:max-w-2xl mx-auto"
            onClick={handleNpmCopy}
          >
            <div className="flex-grow overflow-x-auto whitespace-nowrap scrollbar-hide">
              <span className="text-green-400">$</span> <span className="text-gray-300">npx create-ned-tech test-project</span>
            </div>
            <button 
              aria-label={npmCopied ? "Copied" : "Copy to clipboard"} 
              className="text-gray-400 hover:text-pink-400 transition-colors duration-200 p-1 -ml-1 sm:-mr-1 flex-shrink-0"
            >
              {npmCopied ? <FaCheck className="w-4 h-4 sm:w-5 sm:h-5 text-green-500 animate-pulse" /> : <FaRegCopy className="w-4 h-4 sm:w-5 sm:h-5" />}
            </button>
          </div>
        </motion.div>
        
        <div className="w-full max-w-7xl mx-auto mt-12 md:mt-16"> 
          {techStack.map((tech) => (
            <ParallaxSection key={`parallax-${tech.id}`} tech={tech} />
          ))}
        </div>

      </main>

      <footer className="w-full text-center p-6 md:p-10 mt-auto border-t border-gray-700 border-opacity-50">
        <p className="text-gray-500 text-sm">&copy; {new Date().getFullYear()} Next-Elysia-Drizzle Stack. Crafted with Passion.</p>
      </footer>
    </div>
  );
};

export default Page;