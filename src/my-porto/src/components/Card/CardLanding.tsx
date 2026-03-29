"use client";
import Image from "next/image";

// types/article.ts
interface Article {
  id: number;
  idUser: number;
  title: string;
  slug: string;
  description: string;
  image: string;
  type: string;
  createdAt: string;
  updatedAt: string;
}

// ================== BLOG CARD SINGLE ==================
export const BlogCardSingle = ({ article }: { article: Article }) => {
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const truncateContent = (content: string, max = 50) => {
    const plain = content.replace(/<[^>]*>/g, "");
    return plain.length > max ? plain.slice(0, max) + "..." : plain;
  };

  return (
    <div className="bg-white hover:bg-blue-50 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 overflow-hidden group">
      <div className="flex flex-col md:flex-row h-[400px]">
        {/* IMAGE */}
        <div className="relative md:w-1/2 w-full h-48 md:h-auto">
          <Image
            src={article.image || "/assets/porto/portofolio.png"}
            alt={article.title}
            fill
            className="object-cover group-hover:scale-105 transition"
            unoptimized
          />

          <div className="absolute top-4 right-4 bg-black/50 text-white text-xs px-3 py-1 rounded">
            {article.type || "Blog"}
          </div>
        </div>

        {/* CONTENT */}
        <div className="flex-1 p-6 flex flex-col justify-between">
          <div>
            <div className="flex gap-2 mb-2">
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                {formatDate(article.createdAt)}
              </span>
              <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded">
                admin
              </span>
            </div>

            <h3 className="text-xl font-bold mb-2 line-clamp-2 text-[#131D4F]">
              <a href={`/blog/${article.slug}`}>{article.title}</a>
            </h3>

            <p className="text-gray-600">
              {truncateContent(article.description)}
            </p>
          </div>

          <a
            href={`/blog/${article.slug}`}
            className="text-[#954C2E] text-sm mt-4"
          >
            Baca Selengkapnya →
          </a>
        </div>
      </div>
    </div>
  );
};

// ================== BLOG CARD GRID ==================
export const BlogCard = ({ article }: { article: Article }) => {
  const formatDate = (date: string) =>
    new Date(date).toLocaleDateString("id-ID");

  const truncate = (text: string, max = 50) => {
    const plain = text.replace(/<[^>]*>/g, "");
    return plain.length > max ? plain.slice(0, max) + "..." : plain;
  };

  return (
    <div className="bg-white rounded-xl shadow-md hover:shadow-xl transition overflow-hidden">
      <div className="relative h-32">
        <Image
          src={article.image || "/assets/porto/portofolio.png"}
          alt={article.title}
          fill
          className="object-cover"
          unoptimized
        />
      </div>

      <div className="p-4">
        <div className="text-xs text-gray-500 mb-2">
          {formatDate(article.createdAt)}
        </div>

        <h3 className="font-semibold text-lg mb-2 line-clamp-2 text-[#131D4F]">
          <a href={`/blog/${article.slug}`}>{article.title}</a>
        </h3>

        <p className="text-sm text-gray-600 line-clamp-3">
          {truncate(article.description)}
        </p>
      </div>
    </div>
  );
};
