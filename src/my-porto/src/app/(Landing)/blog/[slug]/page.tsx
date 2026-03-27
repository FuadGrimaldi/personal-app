import ComingSoon from "@/components/Information/ComingSoon";

type Params = Promise<{ slug: string }>;

export default async function DetailBlog({ params }: { params: Params }) {
  const { slug } = await params;
  return (
    <main>
      <div className="relative">
        <div className="px-6 lg:px-[120px] pb-6 pt-[100px] ">
          <h1 className="text-3xl font-bold text-[#131D4F] mb-4">
            Blog Detail: {slug}
          </h1>
          <p className="text-gray-600 mb-6">
            This is a placeholder for the blog detail page. The content will be
            dynamically loaded based on the slug.
          </p>
          <div className="py-[100px]">
            <ComingSoon />
          </div>
        </div>
      </div>
    </main>
  );
}
