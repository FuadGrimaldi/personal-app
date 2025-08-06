import { getPortofolio } from "@/services/apiPortofolio";
import Image from "next/image";
import SectionHeader from "../Common/SectionHeader";
import Link from "next/link";

interface Portfolio {
  id: number;
  title: string;
  projectImage: string;
  description: string;
}

export default async function ListProject() {
  const res = await getPortofolio();
  const data: Portfolio[] = res?.data || [];
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  const limitWords = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  return (
    <div className="z-1 min-h-screen mt-[40px]">
      {/* Animated Background Gradient */}

      <div className="relative z-2 backdrop-blur-sm">
        <SectionHeader
          headerInfo={{
            title: "------",
            color: "text-[#EFE4D2]",
            colorTitle: "text-[#EFE4D2]",
            subtitle: "Portofolio",
            description:
              "Technical Projects that I have and continue to develop.",
          }}
        />

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 pb-12">
          {data.map((project, index) => (
            <div
              key={project.id}
              className="group bg-white/80 backdrop-blur-lg rounded-2xl shadow-lg border border-white/20 overflow-hidden hover:shadow-2xl hover:border-white/40 transition-all duration-500 hover:-translate-y-2 animate-fade-in-up"
              style={{
                animationDelay: `${index * 100}ms`,
              }}
            >
              {/* Gradient border effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-[#254d70]/20 via-purple-500/20 to-pink-500/20 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 -z-10"></div>

              {/* Image Container */}
              <div className="relative h-48 w-full overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200">
                <Image
                  fill
                  src={`${baseUrl}/${project.projectImage}`}
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  alt={project.title}
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  unoptimized={true}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-all duration-500" />

                {/* Floating gradient overlay */}
                <div className="absolute inset-0 bg-gradient-to-br from-[#254d70]/10 to-purple-500/10 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>

              {/* Content */}
              <div className="p-6">
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:bg-gradient-to-r group-hover:from-[#254d70] group-hover:via-purple-600 group-hover:to-pink-600 group-hover:bg-clip-text group-hover:text-transparent transition-all duration-500">
                  {project.title}
                </h3>
                <p className="text-gray-600 text-sm leading-relaxed mb-6">
                  {limitWords(project.description, 20)}
                </p>

                {/* Action Button */}
                <div className="flex items-center justify-between">
                  <Link
                    href={`/project/${project.id}`}
                    className="group/btn relative px-4 py-2 bg-gradient-to-r from-[#254d70] to-purple-600 text-white font-medium text-sm rounded-lg overflow-hidden transition-all duration-300 hover:shadow-lg hover:shadow-[#254d70]/25"
                  >
                    <span className="relative z-10">View Details</span>
                    <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 translate-x-full group-hover/btn:translate-x-0 transition-transform duration-300"></div>
                  </Link>
                  <div className="w-10 h-10 bg-gradient-to-br from-[#254d70]/10 to-purple-500/10 rounded-full flex items-center justify-center group-hover:from-[#254d70]/20 group-hover:to-purple-500/20 transition-all duration-300 group-hover:scale-110">
                    <svg
                      className="w-5 h-5 text-[#254d70] group-hover:translate-x-1 transition-all duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 5l7 7-7 7"
                      />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Empty State */}
        {data.length === 0 && (
          <div className="text-center py-16 animate-fade-in-up animation-delay-400">
            <div className="w-32 h-32 mx-auto bg-gradient-to-br from-[#254d70]/10 to-purple-500/10 rounded-full flex items-center justify-center mb-6 animate-pulse">
              <svg
                className="w-16 h-16 text-[#254d70]"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"
                />
              </svg>
            </div>
            <h3 className="text-2xl font-bold bg-gradient-to-r from-[#254d70] to-purple-600 bg-clip-text text-transparent mb-3">
              No projects yet
            </h3>
            <p className="text-gray-600 text-lg">
              Projects will appear here once theyre added to your portfolio.
            </p>
          </div>
        )}
      </div>
      {/* <Footer /> */}
    </div>
  );
}
