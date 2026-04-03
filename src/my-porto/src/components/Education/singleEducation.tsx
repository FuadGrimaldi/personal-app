import React, { useState } from "react";
import { motion } from "framer-motion";

const educations = [
  {
    title: "Bachelor of Informatics Engineering",
    institution: "Institut Teknologi Nasional Bandung",
    period: "2022 – Sekarang",
    location: "Bandung, Indonesia",
    gpa: "3.83 (current)",
    status: "In Progress",
    description:
      "Focused on IoT, database management, web development, machine learning, and cloud computing. Engaged in various assistant teaching roles and practical IoT projects.",
    keyCourses: [
      "Web Programming",
      "Database Systems",
      "Object-Oriented Programming",
      "Machine Learning",
      "IoT Programming",
      "Cloud Computing",
    ],
    achievements: [
      "Assistant in 4 different lab courses",
      "Built full-stack IoT-based incubator system",
      "Active in student organization (HMIF)",
    ],
  },
  {
    title: "Senior High School",
    institution: "SMA Negeri 1 Situraja",
    period: "2019 – 2022",
    location: "Sumedang, Indonesia",
    gpa: "N/A",
    status: "Graduated",
    description:
      "Completed high school with focus in science stream (IPA), actively involved in academic and extracurricular activities.",
    keyCourses: ["Mathematics", "Physics", "Chemistry", "Biology"],
    achievements: ["Graduated with good academic standing"],
  },
];

const nonFormalEdu = [
  {
    title: "Full Stack Developer",
    institution:
      "Dinas Komunikasi dan Informatika, Persandian dan Statistik Kabupaten Sumedang",
    period: "July 2025 – September 2025",
    location: "Sumedang Regency, West Java, Indonesia (On-site)",
    gpa: "Internship",
    status: "Completed",
    description:
      "Developed and redesigned web platforms for local government levels, focusing on multi-tenant architecture and full-stack integration.",
    keyCourses: [
      "Full-Stack Development",
      "MySQL",
      "Multi-tenant Architecture",
      "Communication",
    ],
    achievements: [
      "Developed a sub-district website with full-stack approach and server deployment",
      "Redesigned village website using a multi-tenant architecture with a shared-table approach",
      "Collaborated with stakeholders from Diskominfo, village, and sub-district offices",
    ],
  },
  {
    title: "AWS re/Start Cloud Trainee",
    institution: "Orbit Future Academy",
    period: "July 2025 – September 2025",
    location: "Remote",
    gpa: "Apprenticeship",
    status: "Certified (Batch 12)",
    description:
      "Intensive 12-week program focused on cloud computing, infrastructure management, and DevOps fundamentals using AWS services.",
    keyCourses: [
      "Cloud Computing",
      "Amazon Web Services (AWS)",
      "Linux",
      "Python",
      "DevOps",
    ],
    achievements: [
      "Gained hands-on experience with core AWS services (EC2, S3, IAM, VPC)",
      "Developed skills in shell automation and Infrastructure as Code (IaC)",
      "Built an understanding of networking concepts and cloud security",
    ],
  },
  {
    title: "Project-Based Virtual Intern: Backend Developer",
    institution: "Evermos x Rakamin Academy",
    period: "July 2025 – August 2025",
    location: "Remote",
    gpa: "Internship",
    status: "Completed",
    description:
      "Focused on backend development workflows using Golang, covering API development, automation, and database operations.",
    keyCourses: ["Go (Programming Language)", "REST APIs", "MySQL", "Git"],
    achievements: [
      "Built a mini project using Golang API",
      "Completed backend development tasks covering deployment processes and workflows",
      "Strengthened problem-solving and team collaboration skills",
    ],
  },
  {
    title: "Backend Developer Bootcamp",
    institution: "GITS Academy x SMKDEV",
    period: "June 2024 – September 2024",
    location: "Hybrid",
    gpa: "Completed",
    status: "Certified",
    description:
      "Intensive bootcamp focusing on backend development using Go (Golang) and frontend using React. Final project includes full integration of frontend and backend systems.",
    keyCourses: [
      "Go (Golang)",
      "React.js",
      "API Integration",
      "Full-Stack Web Development",
    ],
    achievements: [
      "Completed full-stack project with API integration",
      "Mastered modern web development tools",
    ],
  },
  {
    title: "Machine Learning Developer Program",
    institution: "Indosat Ooredoo Digital Camp (IDCAMP) x Dicoding",
    period: "October 2023 – December 2023",
    location: "Online",
    gpa: "Completed",
    status: "Certified",
    description:
      "Comprehensive training in machine learning using Python, focusing on real-world applications such as classification and model deployment using popular ML libraries.",
    keyCourses: [
      "Python for Data Science",
      "Supervised Learning",
      "TensorFlow",
      "Scikit-learn",
    ],
    achievements: [
      "Built classification models with over 95% accuracy",
      "Completed hands-on ML projects using TensorFlow and NumPy",
    ],
  },
  {
    title: "Back-End Developer Learning Path",
    institution: "DBS Foundation Coding Camp x Dicoding",
    period: "February 2023 – May 2023",
    location: "Online",
    gpa: "Completed",
    status: "Certified",
    description:
      "Focused on back-end development using JavaScript and Node.js. Covered database integration, API development, and version control using Git.",
    keyCourses: ["JavaScript", "Node.js", "Database Management", "RESTful API"],
    achievements: [
      "Developed fully functional backend application with CRUD operations",
      "Demonstrated Git proficiency and teamwork",
    ],
  },
];

const certifications = [
  {
    name: "Orbit Future Academy",
    title: "Sertifikat kelulusan AWS re/Start batch 12",
    link: "https://www.linkedin.com/in/fuad-grimaldi/overlay/Position/2876254151/treasury/?profileId=ACoAAEUCStsBzTqdMa8cleg-gPerr0_xXtQ9nC4",
    year: "2025",
  },
  {
    name: "AWS Educate",
    title: "AWS Educate Introduction to Generative AI - Training Badge",
    link: "https://www.credly.com/badges/213c3f56-81bd-4951-b148-ba79b66fac9e/linked_in_profile",
    year: "2025",
  },
  {
    name: "Gits ID x SMKDEV",
    title: "Sertifikat Peserta Bootcamp Backend Developer",
    link: "https://www.linkedin.com/in/fuad-grimaldi/overlay/1751545667573/single-media-viewer/?profileId=ACoAAEUCStsBzTqdMa8cleg-gPerr0_xXtQ9nC4",
    year: "2024",
  },
  {
    name: "Dicoding",
    title: "Belajar Dasar Visualisasi Data",
    link: "https://www.dicoding.com/certificates/EYX4V8VNJZDL",
    year: "Issued Nov 2023 · Expires Nov 2026",
  },
  {
    name: "Dicoding",
    title: "Belajar Machine Learning untuk Pemula",
    link: "https://www.dicoding.com/certificates/0LZ06N60NZ65",
    year: "Issued Nov 2023 · Expires Nov 2026",
  },
  {
    name: "Dicoding",
    title: "Memulai Pemrograman dengan Python",
    link: "https://www.dicoding.com/certificates/1RXYL7LVKPVM",
    year: "Issued Nov 2023 · Expires Nov 2026",
  },
  {
    name: "Dicoding",
    title: "Belajar Dasar Structured Query Language (SQL)",
    link: "https://www.dicoding.com/certificates/81P2N6NW8XOY",
    year: "Issued Oct 2023 · Expires Oct 2026",
  },
  {
    name: "Dicoding",
    title: "Memulai Dasar Pemrograman untuk Menjadi Pengembang Software",
    link: "https://www.dicoding.com/certificates/6RPN191N5X2M",
    year: "Issued Oct 2023 · Expires Oct 2026",
  },
  {
    name: "Dicoding",
    title: "Cloud Practitioner Essentials (Belajar Dasar AWS Cloud)",
    link: "https://www.dicoding.com/certificates/RVZKO53GQPD5",
    year: "Issued Jul 2023 · Expires Jul 2026",
  },
  {
    name: "Dicoding",
    title: "Belajar Membuat Aplikasi Back-End untuk Pemula",
    link: "https://www.dicoding.com/certificates/QLZ9KM37MZ5D",
    year: "Issued Sep 2022 · Expires Sep 2025",
  },
  {
    name: "Dicoding",
    title: "Belajar Dasar Pemrograman JavaScript",
    link: "https://www.dicoding.com/certificates/1RXYMJ38MXVM",
    year: "Issued Aug 2022 · Expires Aug 2025",
  },
  {
    name: "Dicoding",
    title: "Memulai Pemrograman Dengan Java",
    link: "https://www.dicoding.com/certificates/JLX1GKK5NZ72",
    year: "Issued Aug 2022 · Expires Aug 2025",
  },
];

const EducationCertSection = () => {
  const [activeTab, setActiveTab] = useState<
    "education" | "certification" | "nonFormalEdu"
  >("education");

  return (
    <section>
      {/* Switch Button */}
      <motion.div
        className="relative flex justify-center mb-10 z-3"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 1 }}
      >
        <button
          onClick={() => setActiveTab("education")}
          className={`px-4 py-2 rounded-l-full border ${
            activeTab === "education"
              ? "bg-[#131D4F] text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Formal Education
        </button>
        <button
          onClick={() => setActiveTab("nonFormalEdu")}
          className={`px-4 py-2 border ${
            activeTab === "nonFormalEdu"
              ? "bg-[#131D4F] text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Experience
        </button>
        <button
          onClick={() => setActiveTab("certification")}
          className={`px-4 py-2 rounded-r-full border ${
            activeTab === "certification"
              ? "bg-[#131D4F] text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Certifications
        </button>
      </motion.div>

      {/* Content */}
      {activeTab === "education" ? (
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {educations.map((edu, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-md p-6 bg-white"
            >
              <h3 className="text-xl font-semibold text-gray-600">
                {edu.title}
              </h3>
              <p className="text-lg text-gray-600">
                {edu.institution} · {edu.period}
              </p>
              <p className="text-lg text-gray-600">{edu.location}</p>
              <p className="mt-1 text-lg font-medium text-green-600">
                GPA: {edu.gpa} · {edu.status}
              </p>
              <p className="mt-4 text-lg text-gray-700">{edu.description}</p>

              <div className="mt-4">
                <p className="font-medium text-gray-800">Key Courses:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {edu.keyCourses.map((course, i) => (
                    <span
                      key={i}
                      className="bg-[#EFE4D2] text-lg px-2 py-1 rounded-xl hover:bg-[#D6CFC0] transition-colors duration-200 text-gray-800"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="font-medium text-gray-800">
                  Notable Achievements:
                </p>
                <ul className="list-disc ml-5 mt-2 text-lg text-gray-700">
                  {edu.achievements.map((ach, j) => (
                    <li key={j}>{ach}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>
      ) : activeTab === "nonFormalEdu" ? (
        <motion.div
          className="grid md:grid-cols-2 gap-8 mb-10"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {nonFormalEdu.map((edu, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-md p-6 bg-white"
            >
              <h3 className="text-xl font-semibold text-gray-600">
                {edu.title}
              </h3>
              <p className="text-lg text-gray-600">
                {edu.institution} · {edu.period}
              </p>
              <p className="text-lg text-gray-600">{edu.location}</p>
              <p className="mt-1 text-lg font-medium text-green-600">
                GPA: {edu.gpa} · {edu.status}
              </p>
              <p className="mt-4 text-lg text-gray-700">{edu.description}</p>

              <div className="mt-4">
                <p className="font-medium text-gray-800">Key Courses:</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {edu.keyCourses.map((course, i) => (
                    <span
                      key={i}
                      className="bg-[#EFE4D2] text-lg px-2 py-1 rounded-xl hover:bg-[#D6CFC0] transition-colors duration-200 text-gray-800"
                    >
                      {course}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-4">
                <p className="font-medium text-gray-800">
                  Notable Achievements:
                </p>
                <ul className="list-disc ml-5 mt-2 text-lg text-gray-700">
                  {edu.achievements.map((ach, j) => (
                    <li key={j}>{ach}</li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="relative z-3 grid md:grid-cols-5 grid-cols-2 gap-8"
          initial={{ scale: 0.8, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1 }}
        >
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-md lg:p-6 p-2 bg-white"
            >
              <h3 className="text-base font-semibold text-gray-600">
                {cert.title}
              </h3>
              <p className="text-sm text-gray-700">{cert.name}</p>
              <p className="text-sm text-gray-400">Year: {cert.year}</p>
              <a
                href={cert.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-500 underline mt-2 inline-block"
              >
                View Certificate
              </a>
            </div>
          ))}
        </motion.div>
      )}
    </section>
  );
};

export default EducationCertSection;
