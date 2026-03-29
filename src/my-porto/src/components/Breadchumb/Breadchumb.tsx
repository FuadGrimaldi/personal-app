import Link from "next/link";

type BreadcrumbType = {
  to: string;
  label: string;
};

interface BreadcrumbProps {
  links: Array<BreadcrumbType>;
}

function Breadcrumb({ links }: BreadcrumbProps) {
  const truncateContent = (content: string, maxLength: number = 30) => {
    if (!content) return "";
    const plainText = content.replace(/<[^>]*>/g, ""); // hapus tag HTML
    return plainText.length > maxLength
      ? plainText.substring(0, maxLength) + "..."
      : plainText;
  };
  return (
    <nav
      className="relative py-2 text-white text-sm flex mb-4"
      aria-label="Breadcrumb"
    >
      <ol className="list-none p-0 inline-flex items-center">
        {links.map((link, index) => (
          <li key={link.to}>
            <span className={`${index === 0 ? "hidden" : "px-2"} `}>/</span>
            <Link
              href={link.to}
              className={
                index === links.length - 1
                  ? "text-[#EFE4D2] hover:text-blue-400 lg:text-[16px] text-sm"
                  : "text-[#EFE4D2] hover:text-blue-400 lg:text-[16px] text-sm"
              }
            >
              {truncateContent(link.label)}
              {links.length === 1 && <span className={`px-2`}>/</span>}
            </Link>
          </li>
        ))}
      </ol>
    </nav>
  );
}

export default Breadcrumb;
