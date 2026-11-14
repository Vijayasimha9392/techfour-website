import type { Project } from "@/types";

/**
 * Project portfolio — 12 entries, three per developer.
 *
 * Every entry below is a PLACEHOLDER. To publish a real project:
 *   1. Replace title, description, details, technologies.
 *   2. Add repoUrl / demoUrl (leave "" if not available — the button shows as "not added").
 *   3. Optionally add a thumbnail path (e.g. "/projects/my-project.png" in /public/projects).
 *   4. Set isPlaceholder: false. Set featured: true to highlight it.
 */
const PLACEHOLDER = {
  title: "Add Your Project",
  description: "Replace with the actual project description.",
  details:
    "Replace with the project details: the problem it solves, your role, key features, and what you learned.",
  technologies: [] as string[],
  repoUrl: "",
  demoUrl: "",
  featured: false,
  isPlaceholder: true,
};

export const projects: Project[] = [
  // Vijayasimha Tammineni — Java Full Stack & AI
  {
    id: "java-ai-01",
    ownerId: "vijayasimha",
    track: "java-ai",
    title: "AI Resume Analyzer & Career Intelligence Platform",
    description:
      "An AI-powered career intelligence platform that helps job seekers analyse resumes, evaluate ATS compatibility, discover relevant job opportunities, identify skill gaps, and prepare for interviews.",
    details:
      "Designed to help job seekers get a competitive edge in the application process. The platform analyses uploaded resumes against job descriptions, producing an ATS compatibility score, a skill-gap analysis, and a personalised career roadmap. I built secure authentication and REST APIs using Spring Boot, JWT and Spring Security backed by MySQL, then integrated a React.js front-end for an interactive analysis flow. An AI-powered mock interview module was added to help users practice and improve before real interviews.",
    technologies: [
      "Java",
      "Spring Boot",
      "React.js",
      "MySQL",
      "JWT",
      "Spring Security",
      "JPA/Hibernate",
      "REST APIs",
      "LLM APIs",
    ],
    repoUrl: "",
    demoUrl: "",
    featured: true,
    isPlaceholder: false,
    thumbnail: "/projects/java-ai-01.svg",
  },
  {
    id: "java-ai-02",
    ownerId: "vijayasimha",
    track: "java-ai",
    title: "Event Booking & Management System",
    description:
      "A full-stack event management platform that lets users discover events, reserve tickets, manage bookings, and process payments through a streamlined interface.",
    details:
      "Built to simplify the end-to-end event booking experience for both organisers and attendees. I developed REST APIs covering event creation, scheduling, booking, authentication and payment workflows, with secure user authentication and role-based access control. The React.js front-end provides event discovery and booking management, while the MySQL database was optimised with normalisation, pagination and filtering. I also improved API performance through efficient queries and reduced response payloads.",
    technologies: [
      "Java",
      "Spring Boot",
      "React.js",
      "MySQL",
      "Spring Security",
      "JWT",
      "JPA/Hibernate",
      "REST APIs",
      "Razorpay",
    ],
    repoUrl: "",
    demoUrl: "",
    featured: false,
    isPlaceholder: false,
    thumbnail: "/projects/java-ai-02.svg",
  },
  {
    id: "java-ai-03",
    ownerId: "vijayasimha",
    track: "java-ai",
    title: "Healthcare Management & Workflow Platform",
    description:
      "An enterprise healthcare application designed to streamline patient services, billing, pharmacy operations, prescription management, and administrative workflows through integrated backend services.",
    details:
      "An enterprise-grade system built to consolidate patient services, billing, pharmacy operations, prescription management and approval workflows. I developed and maintained 15+ REST APIs using Java, Spring Boot, JDBC and MySQL, implementing backend workflows for patient services, billing, pharmacy, prescriptions and approvals. Optimised SQL queries and backend processing improved selected API response times by approximately 20%, and reduced response payload size by around 40% for selected workflows. I also integrated front-end modules with backend services and resolved API, database and production issues.",
    technologies: [
      "Java",
      "Spring Boot",
      "Spring MVC",
      "JDBC",
      "MySQL",
      "REST APIs",
      "React.js",
      "Postman",
      "Git",
    ],
    repoUrl: "",
    demoUrl: "",
    featured: false,
    isPlaceholder: false,
    thumbnail: "/projects/java-ai-03.svg",
  },

  // Shekar D — .NET Development
  {
    id: "dotnet-01",
    ownerId: "shekar",
    track: "dotnet",
    title: "LiveWell Patient Management API",
    description:
      "A secure patient management system built for LiveWell Services that centralises patient records, clinical history and treatment plans behind a unified API layer.",
    details:
      "Built while working as a Junior Software Engineer at LiveWell Services Pvt Ltd. The system replaced scattered spreadsheets and manual record-keeping with a structured, auditable platform. I designed the REST endpoints for patient CRUD operations and added a GraphQL layer so clients could query exactly the fields they needed. Database access was handled with both Entity Framework Core and Dapper depending on the read-heavy vs write-heavy workload, and all data changes were tracked through SQL Server stored procedures.",
    technologies: [
      "C#",
      "ASP.NET Core",
      "REST APIs",
      "GraphQL",
      "Entity Framework Core",
      "Dapper",
      "SQL Server",
      "Stored Procedures",
      "xUnit",
      "Swagger",
      "Git",
    ],
    repoUrl: "",
    demoUrl: "",
    featured: true,
    isPlaceholder: false,
    thumbnail: "/projects/dotnet-01.svg",
  },
  {
    id: "dotnet-02",
    ownerId: "shekar",
    track: "dotnet",
    title: "Clinic Appointment Scheduling System",
    description:
      "An automated clinic appointment scheduling platform that manages doctor availability, patient bookings, reminders and queue management.",
    details:
      "Designed to reduce no-shows and front-desk workload at busy clinics. The system lets patients book slots based on real-time doctor availability, sends automated status updates, and maintains a waiting-list queue when slots open up. I modelled the domain with object-oriented classes in C#, exposed the booking flow through ASP.NET Core Web API endpoints, and wrote the core business logic inside SQL Server stored procedures to keep data integrity at the database level. I validated the booking and cancellation flows with a suite of xUnit tests.",
    technologies: [
      "C#",
      "ASP.NET Core",
      "Web API",
      "SQL Server",
      "Stored Procedures",
      "Entity Framework Core",
      "xUnit",
      "Bootstrap",
      "jQuery",
      "HTML",
      "CSS",
      "JavaScript",
      "Git",
    ],
    repoUrl: "",
    demoUrl: "",
    featured: false,
    isPlaceholder: false,
    thumbnail: "/projects/dotnet-02.svg",
  },
  {
    id: "dotnet-03",
    ownerId: "shekar",
    track: "dotnet",
    title: "Healthcare Analytics Dashboard",
    description:
      "A reporting dashboard that turns raw clinical and operational data into actionable insights for clinic managers.",
    details:
      "Aggregated data from multiple tables across the LiveWell database and presented it through a clean web dashboard. I used LINQ and Dapper for flexible data retrieval, modelled the reporting entities with Entity Framework Core, and built REST endpoints consumed by a Bootstrap-based front-end. The dashboard surfaces key metrics such as patient growth, appointment utilisation, treatment-type distribution and revenue trends, with stored procedures handling the heavier aggregations to keep the application layer lean.",
    technologies: [
      "C#",
      "ASP.NET Core",
      "REST APIs",
      "SQL Server",
      "Stored Procedures",
      "Dapper",
      "Entity Framework Core",
      "LINQ",
      "Bootstrap",
      "JavaScript",
      "jQuery",
      "Git",
    ],
    repoUrl: "",
    demoUrl: "",
    featured: false,
    isPlaceholder: false,
    thumbnail: "/projects/dotnet-03.svg",
  },

  // Dinesh Boini — Data Science & Machine Learning
  {
    id: "data-01",
    ownerId: "dinesh",
    track: "data-science",
    title: "RAG-Powered AI Chatbot",
    description:
      "A Retrieval-Augmented Generation chatbot that lets users upload PDF documents and receive context-aware answers through semantic search and vector retrieval.",
    details:
      "Built using LangGraph, LangChain, LangSmith, Hugging Face LLMs and FAISS. The pipeline ingests PDFs, chunks the text, generates embeddings with Sentence Transformers, and indexes them in FAISS for efficient retrieval. A multi-agent tool-calling architecture lets the LLM dynamically pick between document retrieval, web search, stock market data and a calculator based on user intent. Stateful conversations are orchestrated with LangGraph workflows and SQLite checkpointing, giving persistent multi-session memory. The whole thing ships as an interactive Streamlit app with multi-chat management, PDF upload and real-time response streaming.",
    technologies: [
      "Python",
      "LangGraph",
      "LangChain",
      "LangSmith",
      "RAG",
      "Hugging Face",
      "FAISS",
      "Sentence Transformers",
      "Streamlit",
      "SQLite3",
      "LLMs",
    ],
    repoUrl: "",
    demoUrl: "",
    featured: true,
    isPlaceholder: false,
    thumbnail: "/projects/data-01.svg",
  },
  {
    id: "data-02",
    ownerId: "dinesh",
    track: "data-science",
    title: "Resource Crisis Prediction & Intelligent Decision System",
    description:
      "A machine learning pipeline that predicts resource crises from 77,000+ multi-source consumption records and recommends allocation decisions.",
    details:
      "Designed an end-to-end ML data pipeline that processed over 77,000 multi-source consumption records, applying feature engineering and synthetic target generation to improve data readiness by 3x. Trained a Random Forest regression model with 100 estimators, achieving an R-squared of 0.69 on unseen test data. Complemented this with an LSTM deep learning model on sequential time-series data to capture temporal patterns and boost prediction robustness. Applied Label Encoding and Min-Max Scaling in the preprocessing stage, then integrated the model outputs into a decision-support system for predictive resource allocation.",
    technologies: [
      "Python",
      "Random Forest",
      "LSTM",
      "Deep Learning",
      "Machine Learning",
      "Pandas",
      "NumPy",
      "Scikit-learn",
      "Streamlit",
      "Data Preprocessing",
    ],
    repoUrl: "",
    demoUrl: "",
    featured: false,
    isPlaceholder: false,
    thumbnail: "/projects/data-02.svg",
  },
  {
    id: "data-03",
    ownerId: "dinesh",
    track: "data-science",
    title: "Predictive Analytics & Customer Intelligence Platform",
    description:
      "A predictive analytics platform that turns raw business data into actionable customer insights and forecasting models.",
    details:
      "Leveraged Python and the AI + Data Engineering stack to build end-to-end predictive models on business datasets. Performed extensive exploratory data analysis with Pandas, NumPy, Matplotlib and Seaborn to surface hidden patterns, then engineered features that improved model accuracy. Developed classification and forecasting models using classical machine learning algorithms and validated them with rigorous train-test splits and metrics. Wrapped the whole solution in a Streamlit web application so non-technical stakeholders can interact with predictions through an intuitive interface, complete with visualisations and downloadable reports.",
    technologies: [
      "Python",
      "Machine Learning",
      "Pandas",
      "NumPy",
      "Matplotlib",
      "Seaborn",
      "Scikit-learn",
      "Streamlit",
      "Data Analytics",
      "EDA",
    ],
    repoUrl: "",
    demoUrl: "",
    featured: false,
    isPlaceholder: false,
    thumbnail: "/projects/data-03.svg",
  },

  // Manikanta M — DevOps & Cloud Engineering
  {
    id: "devops-01",
    ownerId: "manikanta",
    track: "devops",
    title: "Automated CI/CD Pipeline Infrastructure",
    description:
      "Designed and implemented a robust CI/CD pipeline to automate testing, building, and deployment processes, significantly reducing time-to-market.",
    details:
      "Built a complete CI/CD workflow to ensure rapid and reliable software delivery. Configured automated pipelines using Jenkins to integrate with Git, enabling seamless code delivery from commit to production. Integrated automated testing stages into the pipeline to validate code quality and security automatically before deployment. Used Docker to containerize applications, ensuring environment consistency across development, staging and production. This automation reduced manual deployment efforts by approximately 70% and drastically improved release frequency and reliability while enabling real-time monitoring of pipeline health.",
    technologies: [
      "DevOps",
      "CI/CD",
      "Jenkins",
      "Docker",
      "Git",
      "Linux",
      "Shell Scripting",
    ],
    repoUrl: "",
    demoUrl: "",
    featured: true,
    isPlaceholder: false,
    thumbnail: "/projects/devops-01.svg",
  },
  {
    id: "devops-02",
    ownerId: "manikanta",
    track: "devops",
    title: "Kubernetes Cluster Orchestration & Scaling",
    description:
      "Orchestrated a scalable and highly available Kubernetes cluster to manage containerized microservices, ensuring optimal resource utilization and application reliability.",
    details:
      "Deployed and configured a multi-node Kubernetes cluster to handle complex microservices architectures, ensuring high availability and fault tolerance. Implemented horizontal pod autoscaling (HPA) based on real-time CPU and memory metrics to handle traffic spikes dynamically. Configured ingress controllers and load balancers for efficient, secure traffic routing across services. Developed Helm charts to standardize application deployment and simplify configuration management. Established comprehensive logging and monitoring using Prometheus and Grafana for proactive cluster health analysis and rapid issue resolution.",
    technologies: [
      "DevOps",
      "Kubernetes",
      "Docker",
      "Helm",
      "Prometheus",
      "Grafana",
      "AWS",
      "Load Balancing",
    ],
    repoUrl: "",
    demoUrl: "",
    featured: false,
    isPlaceholder: false,
    thumbnail: "/projects/devops-02.svg",
  },
  {
    id: "devops-03",
    ownerId: "manikanta",
    track: "devops",
    title: "Cloud Infrastructure as Code (IaC) Migration",
    description:
      "Migrated legacy on-premise infrastructure to AWS, utilizing Infrastructure as Code (IaC) to create reproducible and scalable cloud environments.",
    details:
      "Modernized legacy infrastructure by migrating mission-critical applications to AWS, focusing on scalability and disaster recovery. Automated all infrastructure provisioning using Terraform, ensuring consistent, version-controlled, and reproducible cloud environments. Implemented automated configuration management with Ansible to standardize software deployment across all cloud instances. Optimized cloud costs by analyzing usage patterns and implementing right-sizing strategies. Designed a secure and compliant network topology in AWS, comprising VPCs, public/private subnets and granular security group rules to protect sensitive application data.",
    technologies: [
      "DevOps",
      "AWS",
      "Terraform",
      "Ansible",
      "Cloud Computing",
      "Network Security",
      "Disaster Recovery",
    ],
    repoUrl: "",
    demoUrl: "",
    featured: false,
    isPlaceholder: false,
    thumbnail: "/projects/devops-03.svg",
  },
];
