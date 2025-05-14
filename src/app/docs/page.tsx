"use client"

import React, { useState } from 'react';
import { FaRegCopy, FaCheck } from "react-icons/fa";
import { HiOutlineCommandLine, HiOutlineSparkles, HiOutlineRocketLaunch, HiOutlineCog, HiOutlineExclamationCircle } from "react-icons/hi2";
import { HiOutlineDatabase } from 'react-icons/hi';

const CopyButton = ({ text, id, copiedStates, setCopiedStates }: { text: string, id: string, copiedStates: Record<string, boolean>, setCopiedStates: React.Dispatch<React.SetStateAction<Record<string, boolean>>> }) => {
  const handleCopy = async (e: React.MouseEvent | React.KeyboardEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    try {
      await navigator.clipboard.writeText(text);
      setCopiedStates(prev => ({ ...prev, [id]: true }));
      setTimeout(() => setCopiedStates(prev => ({ ...prev, [id]: false })), 2500);
    } catch (err) {
      console.error("Failed to copy command: ", err);
    }
  };

  return (
    <div
      role="button"
      tabIndex={0}
      onClick={(e) => handleCopy(e)}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          handleCopy(e);
        }
      }}
      className="p-2 rounded-md hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-pink-500 focus:ring-opacity-60 cursor-pointer select-none"
      aria-label="Copy command"
      style={{ WebkitUserSelect: 'none', userSelect: 'none' }}
    >
      {copiedStates[id] ? (
        <FaCheck className="text-green-400 h-5 w-5" />
      ) : (
        <FaRegCopy className="text-gray-400 h-5 w-5" />
      )}
    </div>
  );
};

const DocsPage = () => {
  const [copiedStates, setCopiedStates] = useState<Record<string, boolean>>({});

  const CommandStep = ({ description, command, id, note, expectedOutcome }: { description: string, command: string, id: string, note?: string, expectedOutcome?: string }) => (
    <div className="mb-8 md:mb-10">
      <p className="text-gray-200 mb-3 text-lg md:text-xl leading-relaxed">{description}</p>
      <div className="bg-gray-900 rounded-lg overflow-hidden shadow-xl border border-gray-700/50">
        <div className="flex items-center justify-between px-5 py-3 bg-gray-800 border-b border-gray-700">
          <span className="text-sm font-semibold text-gray-400 uppercase tracking-wider">Command</span>
          <CopyButton text={command} id={id} copiedStates={copiedStates} setCopiedStates={setCopiedStates} />
        </div>
        <pre className="p-5 text-base md:text-lg font-mono text-purple-300 overflow-x-auto bg-gray-800/30">
          <code>{command}</code>
        </pre>
      </div>
      {note && (
        <p className="mt-3 text-sm md:text-base text-gray-400 italic">
          <HiOutlineExclamationCircle className="inline h-5 w-5 mr-1 mb-0.5 text-yellow-400"/>Note: {note}
        </p>
      )}
      {expectedOutcome && (
        <div className="mt-4 p-4 bg-green-800/20 border border-green-700/50 rounded-md">
          <h4 className="font-semibold text-green-300 mb-1 text-md">Expected Outcome:</h4>
          <p className="text-sm md:text-base text-green-200/90">{expectedOutcome}</p>
        </div>
      )}
    </div>
  );

  const Section = ({ title, icon: Icon, intro, children }: { title: string, icon: React.ElementType, intro: string, children: React.ReactNode }) => (
    <section className="mb-16 md:mb-20 p-8 md:p-10 bg-gray-800 bg-opacity-70 rounded-xl shadow-2xl backdrop-blur-md border border-gray-700/80 hover:shadow-pink-500/10 transition-shadow duration-300">
      <div className="flex items-center mb-6 md:mb-8">
        <Icon className="h-10 w-10 md:h-12 md:w-12 mr-4 text-pink-500" />
        <h2 className="text-3xl md:text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-400 via-purple-400 to-cyan-400">{title}</h2>
      </div>
      <p className="text-gray-200 mb-8 md:mb-10 text-lg md:text-xl leading-relaxed">{intro}</p>
      {children}
    </section>
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-950 to-gray-900 text-white flex flex-col items-center p-4 md:p-8 selection:bg-pink-600 selection:text-white overflow-x-hidden">
      <header className="w-full max-w-6xl mx-auto py-12 md:py-20 text-center">
        <h1 className="text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight mb-6">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-500 to-orange-400">
            Comprehensive Developer Guide
          </span>
        </h1>
        <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
          Your step-by-step instructions to get the project environment fully operational, from database setup to production launch.
        </p>
      </header>

      <main className="w-full max-w-6xl mx-auto flex-1 px-2 md:px-4">
        <Section
          title="0. Prerequisites"
          icon={HiOutlineCog}
          intro="Before you begin, please ensure you have the following software installed and configured on your system. These tools are essential for the development and deployment of this project."
        >
          <ul className="list-disc list-inside space-y-3 text-lg text-gray-300 pl-2">
            <li><strong>Node.js:</strong> Version 18.x or higher. (Check with <code>node -v</code>)</li>
            <li><strong>npm:</strong> Version 9.x or higher, usually comes with Node.js. (Check with <code>npm -v</code>)</li>
            <li><strong>Docker:</strong> Latest stable version for running containerized services like PostgreSQL. (Check with <code>docker --version</code>)</li>
            <li><strong>Git:</strong> For version control and cloning the repository. (Check with <code>git --version</code>)</li>
          </ul>
          <p className="mt-6 text-md text-gray-400">If you're missing any of these, please install them from their official websites. Ensure Docker Desktop is running before proceeding with database setup.</p>
        </Section>

        <Section
          title="1. Start Postgres Database"
          icon={HiOutlineDatabase}
          intro="This project utilizes a PostgreSQL database managed via Docker. Docker ensures a consistent and isolated database environment across different machines. The following steps will guide you through starting the database container."
        >
          <CommandStep
            id="db-step1"
            description="First, navigate into the 'docker' directory located at the root of your project. This directory contains the 'docker-compose.yml' file, which defines the configuration for our PostgreSQL service, including image, ports, and volumes."
            command="cd docker"
            expectedOutcome="Your terminal prompt should now reflect that you are inside the 'docker' directory."
          />
          <CommandStep
            id="db-step2"
            description="Execute this command to build (if it's the first time or if changes were made to the Dockerfile/image) and start the PostgreSQL service defined in 'docker-compose.yml'. The '-d' (detached) flag runs the container in the background, so your terminal remains free."
            command="docker compose up -d"
            note="If you omit the '-d' flag (i.e., 'docker compose up'), the container logs will stream directly to your terminal. You can stop it with Ctrl+C. To check if the container is running in detached mode, use 'docker ps'."
            expectedOutcome="You should see messages indicating that the Postgres container is being created/started. If successful, 'docker ps' will list 'ned-tech-web-db-1' (or similar) as running."
          />
        </Section>

        <Section
          title="2. Run Database Migrations"
          icon={HiOutlineCommandLine}
          intro="Once the database container is running, you need to apply the database schema migrations. Migrations are version-controlled changes to your database structure, ensuring it aligns with the application's data models."
        >
          <CommandStep
            id="migrate-step1"
            description="Return to the root directory of your project. This command executes the development database migration script defined in your 'package.json'. It typically uses an ORM tool (like Drizzle ORM) to apply pending migration files to the database schema, creating tables and columns as needed."
            command="npm run db:dev-migrate"
            note="Ensure you are in the project's root directory (you might need to 'cd ..' if you are still in the 'docker' directory). Also, verify that your '.env' file has the correct database connection string (DB_URL). Migrations might fail if the database is not accessible or if there are errors in the migration files."
            expectedOutcome="The terminal should output logs from the migration tool, indicating which migration files are being applied. A success message usually appears at the end, confirming that the database schema is up to date."
          />
        </Section>

        <Section
          title="3. Start Development Server"
          icon={HiOutlineSparkles}
          intro="With the database prepared, you can now start the local development server. This server allows you to view your application in a browser, and it typically includes features like hot module replacement (HMR) for a fast development feedback loop."
        >
          <CommandStep
            id="dev-step1"
            description="This command, executed from the project root, starts the Next.js development server. It compiles the application, watches for file changes, and serves the content, usually on port 3000."
            command="npm run dev"
            note="The terminal will display the local URL (e.g., http://localhost:3000) where the application is accessible. Any changes you make to the frontend or backend code (that Next.js handles) should automatically trigger a recompilation and browser refresh."
            expectedOutcome="You will see output in the terminal indicating that the server has started successfully, often including the local address (e.g., 'ready - started server on 0.0.0.0:3000, url: http://localhost:3000'). Opening this URL in your browser should display the application."
          />
        </Section>

        <Section
          title="4. Build & Run for Production"
          icon={HiOutlineRocketLaunch}
          intro="When you are ready to deploy your application to a live environment, you must first create an optimized production build. This build is then served by a production-ready server."
        >
          <CommandStep
            id="prod-build"
            description="This command, run from the project root, triggers the Next.js production build process. It compiles your application into highly optimized static assets (HTML, CSS, JavaScript) and server-side code. The output is typically placed in the '.next' directory."
            command="npm run build"
            note="The build process can take some time, especially for larger applications, as it involves various optimizations like code splitting, minification, and tree-shaking. Ensure there are no build errors reported in the terminal."
            expectedOutcome="The terminal will show the build progress and, upon completion, often provides a summary of the generated page types (static, server-rendered, etc.). A '.next' folder will be created or updated in your project root."
          />
          <CommandStep
            id="prod-start"
            description="After a successful build, this command starts the Next.js production server. This server is designed for performance and stability, serving the optimized assets generated by the build process."
            command="npm run start"
            note="This command should be used in your deployment environment (e.g., on a server or PaaS). It typically runs on a specific port (often 3000 by default, but configurable). Unlike the development server, it does not watch for file changes."
            expectedOutcome="The terminal will indicate that the production server has started, along with the URL it's listening on. The application should now be accessible via this URL, running in its optimized production mode."
          />
        </Section>
      </main>

      <footer className="w-full max-w-6xl mx-auto py-12 md:py-16 mt-12 md:mt-20 text-center text-gray-400 border-t border-gray-700/80">
        <p className="text-base mb-2">© {new Date().getFullYear()} © 2025 Next-Elysia-Drizzle Stack. Crafted with Passion.</p>
        <p className="text-sm">This guide provides essential setup steps. For advanced configurations, troubleshooting, or architectural details, please consult the project README or specific module documentation.</p>
      </footer>
    </div>
  );
};

export default DocsPage;