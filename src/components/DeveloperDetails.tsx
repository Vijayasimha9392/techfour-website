import React, { useEffect, useState } from "react";
import { useParams } from "@tanstack/react-router";
import { getDeveloper } from "@/data/team";
import type { Developer, DeveloperId } from "@/types";
import { DeveloperAvatar } from "./DeveloperAvatar";
import { Button } from "./ui/button";
import { Section, SectionHeading } from "./ui/section";
import { SocialIconLinks } from "./ui/smart-link";
import { TechBadgeList } from "./ui/tech-badge";

export function DeveloperDetails() {
  const { id } = useParams({ from: "/developers/$id" });
  const [developer, setDeveloper] = useState<Developer | null>(null);
  const [resumeUrl, setResumeUrl] = useState<string>("");

  useEffect(() => {
    if (id) {
      const dev = getDeveloper(id as DeveloperId);
      setDeveloper(dev);
      // Combine the base path with the relative resume path
      const basePath = import.meta.env.BASE_URL || "/";
      setResumeUrl(dev.resume ? `${basePath}${dev.resume.replace(/^\/+/, "")}` : "");
    }
  }, [id]);

  if (!developer) {
    return <div>Loading...</div>;
  }

  return (
    <Section id="developer-details" labelledBy="developer-title" className="border-t border-border">
      <SectionHeading
        id="developer-title"
        eyebrow={developer.role}
        title={developer.name}
        description={developer.intro}
      />
      <div className="mt-14 grid gap-8 lg:grid-cols-2">
        <div>
          <DeveloperAvatar dev={developer} className="size-70" />
          <div className="mt-6">
            <p className="font-mono text-[11px] uppercase tracking-[0.18em] text-muted-foreground">
              Specialization
            </p>
            <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
              {developer.specialization}
            </p>
          </div>
          <TechBadgeList items={developer.technologies} className="mt-6" />
          <div className="mt-8 flex flex-wrap items-center justify-between gap-4 border-t border-border pt-6">
            <SocialIconLinks links={developer.links} name={developer.name} />
          </div>
        </div>
        <div>
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Resume</h2>
          {resumeUrl && (
            <div className="mt-4">
              {/* Use the full path for the embed */}
              <embed src={resumeUrl} type="application/pdf" width="100%" height="600px" />
              <Button asChild variant="outline" className="mt-4">
                <a href={resumeUrl} download>
                  Download Resume
                </a>
              </Button>
            </div>
          )}
        </div>
      </div>
      <div className="mt-14">
        <h2 className="text-xl font-semibold tracking-tight text-foreground">Why Hire Me?</h2>
        <div className="mt-6 prose max-w-none">
          {developer.id === "vijayasimha" && (
            <div>
              <p className="text-lg">
                I am a motivated Software Engineer with 8 months of professional experience in Java Full Stack Development at Virinchi Technologies. I have hands-on experience building and maintaining backend applications using Java, Spring Boot, REST APIs, and MySQL, along with frontend technologies such as JavaScript, React.js, HTML, and CSS.
              </p>
              <p className="mt-4">
                I believe I can be a valuable addition to your team because I bring a combination of practical development experience, problem-solving skills, adaptability, and a strong willingness to learn.
              </p>
              <h3 className="mt-6 text-xl font-semibold">What I Bring to Your Team:</h3>
              <ul className="mt-2 list-disc pl-6">
                <li><strong>Strong Java Fundamentals:</strong> Good understanding of Core Java, Object-Oriented Programming (OOP), and backend development concepts.</li>
                <li><strong>Backend Development:</strong> Practical experience developing and integrating RESTful APIs using Java and Spring Boot.</li>
                <li><strong>Database Management:</strong> Experience working with MySQL, SQL queries, database schemas, and query optimization.</li>
                <li><strong>Full Stack Development:</strong> Familiarity with React.js, JavaScript, HTML, and CSS for building user-friendly applications.</li>
                <li><strong>Real-World Project Experience:</strong> Worked on appointment, billing, pharmacy, prescription, and role-management modules, contributing to API development, debugging, and frontend-backend integration.</li>
                <li><strong>Problem-Solving Mindset:</strong> Ability to analyze issues, troubleshoot bugs, improve application performance, and write maintainable code.</li>
                <li><strong>Continuous Learning:</strong> Actively improving my knowledge of Spring Security, Microservices, Cloud Technologies, and Generative AI.</li>
              </ul>
              <h3 className="mt-6 text-xl font-semibold">Why Choose Me?</h3>
              <p className="mt-2">
                I don't just want to write code; I want to understand problems, build practical solutions, and contribute to products that create real value. I am adaptable, responsible, open to feedback, and committed to continuous improvement.
              </p>
              <p className="mt-4">
                I am looking for an opportunity where I can apply my existing skills, take ownership of responsibilities, learn from experienced developers, and grow into a strong Software Engineer while contributing to the organization's success.
              </p>
              <p className="mt-4 font-bold">Let's Build Something Great Together!</p>
            </div>
          )}
          {developer.id === "shekar" && (
            <div>
              <p className="text-lg">
                I am a dedicated .NET Developer with experience in building structured backend systems, Web APIs, and database-driven applications using C# and ASP.NET Core. My expertise includes designing and implementing RESTful APIs, working with SQL Server, and creating scalable solutions for enterprise applications.
              </p>
              <p className="mt-4">
                I believe I can contribute significantly to your team by leveraging my technical skills, attention to detail, and commitment to delivering high-quality software solutions.
              </p>
              <h3 className="mt-6 text-xl font-semibold">What I Bring to Your Team:</h3>
              <ul className="mt-2 list-disc pl-6">
                <li><strong>Backend Development:</strong> Experience building and maintaining backend systems using C# and ASP.NET Core.</li>
                <li><strong>API Development:</strong> Hands-on experience with RESTful APIs, GraphQL, and Web API design.</li>
                <li><strong>Database Management:</strong> Proficient in SQL Server, Entity Framework Core, Dapper, and stored procedures.</li>
                <li><strong>Enterprise Applications:</strong> Experience developing enterprise-level applications with a focus on scalability and maintainability.</li>
                <li><strong>Testing and Quality:</strong> Familiarity with xUnit for writing unit tests and ensuring code quality.</li>
                <li><strong>Problem-Solving:</strong> Strong analytical skills to troubleshoot issues and optimize application performance.</li>
                <li><strong>Continuous Learning:</strong> Actively expanding my knowledge in cloud technologies, DevOps practices, and modern .NET features.</li>
              </ul>
              <h3 className="mt-6 text-xl font-semibold">Why Choose Me?</h3>
              <p className="mt-2">
                I am committed to delivering clean, efficient, and well-documented code. My ability to work collaboratively, communicate effectively, and adapt to new technologies makes me a strong fit for any development team.
              </p>
              <p className="mt-4">
                I am eager to take on new challenges, learn from experienced developers, and contribute to innovative projects that make a real impact.
              </p>
              <p className="mt-4 font-bold">Let's Build Something Exceptional Together!</p>
            </div>
          )}
          {developer.id === "dinesh" && (
            <div>
              <p className="text-lg">
                I am an AI & Data Engineer with expertise in building intelligent applications, from RAG-powered LLM chatbots and LangGraph multi-agent workflows to machine learning models and predictive analytics systems. My background includes Python, LangChain, LangSmith, and a variety of AI and data science tools.
              </p>
              <p className="mt-4">
                I believe I can bring significant value to your team by combining my technical expertise with a passion for innovation and problem-solving.
              </p>
              <h3 className="mt-6 text-xl font-semibold">What I Bring to Your Team:</h3>
              <ul className="mt-2 list-disc pl-6">
                <li><strong>AI and Machine Learning:</strong> Experience with LangGraph, LangChain, and building RAG-powered applications.</li>
                <li><strong>Data Engineering:</strong> Proficient in Python, SQL, and data preprocessing for machine learning pipelines.</li>
                <li><strong>Predictive Analytics:</strong> Experience developing and deploying predictive models using Random Forest, LSTM, and other algorithms.</li>
                <li><strong>Full Stack AI Applications:</strong> Building end-to-end AI solutions with Streamlit, FAISS, and other tools.</li>
                <li><strong>Problem-Solving:</strong> Strong analytical skills to tackle complex problems and optimize AI models.</li>
                <li><strong>Continuous Learning:</strong> Actively exploring new AI technologies, deep learning frameworks, and data science best practices.</li>
              </ul>
              <h3 className="mt-6 text-xl font-semibold">Why Choose Me?</h3>
              <p className="mt-2">
                I am passionate about leveraging AI to create innovative solutions that drive real-world impact. My ability to work across the AI stack, from data engineering to model deployment, allows me to contribute effectively to any project.
              </p>
              <p className="mt-4">
                I thrive in collaborative environments and am committed to continuous learning and improvement. I am excited to bring my skills and enthusiasm to your team and help build cutting-edge AI solutions.
              </p>
              <p className="mt-4 font-bold">Let's Innovate and Create the Future Together!</p>
            </div>
          )}
          {developer.id === "manikanta" && (
            <div>
              <p className="text-lg">
                I am a DevOps Engineer focused on automating software delivery processes, ensuring seamless CI/CD pipelines, and optimizing cloud infrastructure. My expertise includes Docker, Kubernetes, Jenkins, and cloud technologies like AWS and Azure.
              </p>
              <p className="mt-4">
                I believe I can add significant value to your team by streamlining deployment workflows, improving system reliability, and implementing best practices for DevOps and cloud engineering.
              </p>
              <h3 className="mt-6 text-xl font-semibold">What I Bring to Your Team:</h3>
              <ul className="mt-2 list-disc pl-6">
                <li><strong>CI/CD Pipelines:</strong> Experience designing and implementing automated CI/CD pipelines using Jenkins and other tools.</li>
                <li><strong>Containerization:</strong> Proficient in Docker and Kubernetes for deploying and managing containerized applications.</li>
                <li><strong>Cloud Engineering:</strong> Hands-on experience with AWS, Azure, and cloud infrastructure as code using Terraform.</li>
                <li><strong>Infrastructure Automation:</strong> Expertise in automating infrastructure provisioning and configuration management with Ansible.</li>
                <li><strong>Monitoring and Logging:</strong> Experience setting up monitoring and logging solutions using Prometheus and Grafana.</li>
                <li><strong>Problem-Solving:</strong> Strong ability to troubleshoot and optimize system performance and reliability.</li>
                <li><strong>Continuous Learning:</strong> Actively expanding my knowledge in emerging DevOps tools, security practices, and cloud technologies.</li>
              </ul>
              <h3 className="mt-6 text-xl font-semibold">Why Choose Me?</h3>
              <p className="mt-2">
                I am committed to delivering efficient, scalable, and reliable DevOps solutions. My hands-on experience and problem-solving skills enable me to optimize workflows and improve system performance.
              </p>
              <p className="mt-4">
                I thrive in collaborative environments and am passionate about implementing best practices to enhance software delivery and system reliability. I am eager to contribute my expertise to your team and help drive innovation.
              </p>
              <p className="mt-4 font-bold">Let's Optimize and Innovate Together!</p>
            </div>
          )}
        </div>
      </div>
      {developer.projects && developer.projects.length > 0 && (
        <div className="mt-14">
          <h2 className="text-xl font-semibold tracking-tight text-foreground">Projects</h2>
          <div className="mt-6 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {developer.projects.map((project) => (
              <div key={project.id} className="border border-border rounded-lg p-4">
                <h3 className="text-lg font-medium">{project.title}</h3>
                <p className="mt-2 text-sm text-muted-foreground">{project.description}</p>
                <TechBadgeList items={project.technologies} className="mt-4" />
                <div className="mt-4 flex gap-2">
                  {project.repoUrl && (
                    <Button asChild variant="outline" size="sm">
                      <a href={project.repoUrl} target="_blank" rel="noopener noreferrer">
                        View Code
                      </a>
                    </Button>
                  )}
                  {project.demoUrl && (
                    <Button asChild variant="outline" size="sm">
                      <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                        View Demo
                      </a>
                    </Button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </Section>
  );
}
