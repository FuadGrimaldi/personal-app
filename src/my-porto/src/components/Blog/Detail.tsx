import React from "react";
import { getBlogBySlug } from "@/services/apiBlog";
import Image from "next/image";
import parse from "html-react-parser";
import { User, Heart } from "lucide-react";
// import Breadcrumb from "../Breadchumb/Breadchumb";
import Link from "next/link";
import Breadcrumb from "../Breadchumb/Breadchumb";

interface BlogDetail {
  id: number;
  title: string;
  idUser: number;
  type: string;
  slug: string;
  description: string;
  image: string;
  createdAt: string;
  updatedAt: string;
}

interface BlogDetailPageProps {
  blogSlug: string;
}

export default async function BlogDetail({ blogSlug }: BlogDetailPageProps) {
  let blog: BlogDetail | null = null;
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  try {
    const res = await getBlogBySlug(blogSlug);
    blog = res?.data || null;
  } catch (error: unknown) {
    if (
      typeof error === "object" &&
      error !== null &&
      "response" in error &&
      typeof (error as { response?: { status?: number } }).response?.status ===
        "number" &&
      (error as { response?: { status?: number } }).response?.status === 404
    ) {
      console.warn("Blog not found:", blogSlug);
    } else {
      console.error("Unexpected error:", error);
      throw error;
    }
  }
  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("id-ID", {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  if (!blog) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-gray-100">
        {/* Floating Background Elements */}
        <div className="fixed inset-0 overflow-hidden pointer-events-none">
          <div className="absolute top-20 left-10 w-64 h-64 bg-gradient-to-br from-[#254d70]/5 to-transparent rounded-full blur-3xl animate-float"></div>
          <div className="absolute top-60 right-20 w-96 h-96 bg-gradient-to-br from-gray-300/10 to-transparent rounded-full blur-3xl animate-float-delayed"></div>
          <div className="absolute bottom-20 left-1/3 w-80 h-80 bg-gradient-to-br from-[#254d70]/3 to-transparent rounded-full blur-3xl animate-float-slow"></div>
        </div>

        <section className="z-10">
          <h1 className="text-3xl font-semibold text-gray-900 mb-3">
            Blog Not Found
          </h1>
          <p className="text-gray-600 mb-8 max-w-md mx-auto leading-relaxed">
            The blog youre looking for doesnt exist or may have been removed.
          </p>
        </section>
      </div>
    );
  }

  return (
    <div className="relative z-1 min-h-screen px-6 lg:px-[120px] pb-6 lg:pt-[70px] pt-[50px]">
      <div className="mx-auto pt-16 lg:pt-22">
        <div>
          <div className="lg:flex items-center justify-between w-full pt-3 lg:pt-0">
            {/* LEFT */}
            <div>
              <Link
                href="/blog"
                className="group inline-flex items-center px-3 py-2 bg-[#EFE4D2] text-slate-600 rounded-lg hover:bg-[#EFE4D2] transition-all duration-500 relative overflow-hidden"
              >
                <svg
                  className="w-5 h-5 mr-3 transition-transform group-hover:-translate-x-2 duration-300"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M10 19l-7-7m0 0l7-7m-7 7h18"
                  />
                </svg>
                <span className="font-medium lg:text-sm text-[12px]">
                  Back to Blog
                </span>
              </Link>
            </div>

            {/* RIGHT */}
            <div className="justify-center">
              <Breadcrumb
                links={[
                  { to: "/", label: "Home" },
                  { to: "/blog", label: "Blog" },
                  { to: "#", label: blog.title },
                ]}
              />
            </div>
          </div>
        </div>
        <div className=" rounded-2xl pt-4 ">
          <div className="w-full mx-auto">
            <div>
              <div className="min-h-screen">
                <div className="container mx-auto">
                  <div className=" overflow-hidden">
                    <div className="relative w-full h-[300px] lg:h-[600px]">
                      <Image
                        src={`${baseUrl}/${blog.image}`}
                        alt={blog.title}
                        fill
                        className="object-cover w-full h-full rounded-xl"
                        style={{ objectPosition: "center" }}
                        priority
                        unoptimized
                        sizes="(max-width: 768px) 100vw, 800px"
                      />
                    </div>

                    <div>
                      <h1 className="text-2xl lg:text-4xl font-bold text-[#EFE4D2] mt-6 mb-4">
                        {blog.title}
                      </h1>
                    </div>
                    <div className="w-16 h-1 bg-gradient-to-r from-[#254d70] to-[#EFE4D2] mb-3 rounded-full"></div>

                    {/* Content */}
                    <div>
                      <div className="prose prose-lg max-w-none  text-[#EFE4D2] leading-relaxed">
                        {parse(blog.description)}
                      </div>

                      {/* Informasi Tambahan */}
                      {(blog.createdAt || blog.createdAt) && (
                        <div className="mt-8 px-2 py-4 bg-[#faf4eb] rounded-lg">
                          <div className="grid grid-rows-1 lg:grid-cols-2 gap-4">
                            <div className="bg-[#faf4eb] p-4 rounded-lg shadow hover:bg-[#EFE4D2]">
                              <div className="flex items-center">
                                <User className="w-5 h-5 mr-2 text-[#954C2E]" />
                                <div>
                                  <span className="font-medium text-[#954C2E] text-left">
                                    Admin
                                  </span>
                                  <div className="text-[#954C2E] text-sm">
                                    {formatDate(blog.createdAt)}
                                  </div>
                                </div>
                              </div>
                            </div>
                            <div className="bg-[#faf4eb] p-4 rounded-lg shadow hover:bg-[#EFE4D2]">
                              <div className="flex items-center">
                                <Heart className="w-5 h-5 mr-2 text-[#954C2E]" />
                                <div>
                                  <span className="font-medium text-[#954C2E] text-left">
                                    Like
                                  </span>
                                  <div className="text-[#954C2E] text-sm">
                                    0
                                  </div>
                                </div>
                              </div>
                            </div>
                          </div>
                          {/* <div className="w-full flex justify-center py-6">
                            {blog.title && (
                              <Link
                                href={blog.title}
                                target="_blank"
                                rel="noopener noreferrer"
                                aria-label="Lihat lokasi kegiatan di Google Maps"
                                className="bg-white p-4 rounded-full shadow-md flex items-center gap-3 hover:bg-blue-500 transition-colors group"
                              >
                                <MapPin className="w-5 h-5 text-[#954C2E] group-hover:text-white" />
                                <div className="flex flex-col leading-tight">
                                  <span className="font-medium text-gray-700  group-hover:text-white">
                                    Klik Map
                                  </span>
                                </div>
                              </Link>
                            )}
                          </div> */}
                        </div>
                      )}
                    </div>
                    {/* <CommentSection
                      blogId={blog.id}
                      kecamatanId={blog.kecamatan_id}
                    /> */}
                  </div>
                </div>
              </div>
            </div>

            {/* Decorative Element */}
            <div className="mt-8 text-center">
              <div className="inline-flex items-center space-x-2 text-gray-400">
                <div className="w-8 h-px bg-[#954C2E]"></div>
                <div className="w-2 h-2 bg-[#954C2E] rounded-full"></div>
                <div className="w-8 h-px bg-[#954C2E]"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
