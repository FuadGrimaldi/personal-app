import React, { useState } from "react";

const educations = [
  {
    title: "Bachelor of Informatics Engineering",
    institution: "Institut Teknologi Nasional Bandung",
    period: "2022 – Sekarang",
    location: "Bandung, Indonesia",
    gpa: "3.87 (current)",
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
      "Assistant in 3 different lab courses",
      "Built full-stack IoT-based incubator system",
      "Active in student organization (HMIF)",
    ],
  },
  {
    title: "Backend Developer Bootcamp",
    institution: "GITS Academy x SMKDEV",
    period: "June 2024 – September 2024",
    location: "Online",
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
];

const certifications = [
  {
    name: "AWS Cloud Practitioner",
    title: "AWS Certified Cloud Practitioner",
    link: "https://aws.amazon.com/certification/certified-cloud-practitioner/",
    year: 2023,
  },
  {
    name: "FreeCodeCamp",
    title: "Responsive Web Design",
    link: "https://www.freecodecamp.org/certification/fuad/responsive-web-design",
    year: 2022,
  },
  {
    name: "Dicoding",
    title: "Belajar Membuat Aplikasi Web dengan React",
    link: "https://www.dicoding.com/certificates/XYZ",
    year: 2022,
  },
  {
    name: "Dicoding",
    title: "Belajar Membuat Aplikasi Web dengan React",
    link: "https://www.dicoding.com/certificates/XYZ",
    year: 2022,
  },
  {
    name: "Dicoding",
    title: "Belajar Membuat Aplikasi Web dengan React",
    link: "https://www.dicoding.com/certificates/XYZ",
    year: 2022,
  },
];

const EducationCertSection = () => {
  const [activeTab, setActiveTab] = useState<"education" | "certification">(
    "education"
  );

  return (
    <section>
      {/* Switch Button */}
      <div className="flex justify-center mb-10">
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
          onClick={() => setActiveTab("certification")}
          className={`px-4 py-2 rounded-r-full border ${
            activeTab === "certification"
              ? "bg-[#131D4F] text-white"
              : "bg-gray-100 text-gray-700"
          }`}
        >
          Certifications
        </button>
      </div>

      {/* Content */}
      {activeTab === "education" ? (
        <div className="grid md:grid-cols-2 gap-8 mb-10">
          {educations.map((edu, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-md p-6 bg-white"
            >
              <h3 className="text-xl font-semibold">{edu.title}</h3>
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
        </div>
      ) : (
        <div className="grid md:grid-cols-5 grid-cols-2 gap-8">
          {certifications.map((cert, index) => (
            <div
              key={index}
              className="border border-gray-200 rounded-lg shadow-md p-6 bg-white"
            >
              <h3 className="text-lg font-semibold text-black">{cert.title}</h3>
              <p className="text-sm text-gray-700">{cert.name}</p>
              <p className="text-sm text-gray-500">Year: {cert.year}</p>
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
        </div>
      )}
    </section>
  );
};

export default EducationCertSection;
