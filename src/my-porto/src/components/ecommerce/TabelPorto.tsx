import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../Ui/table";
import Badge from "../Ui/badge/Badge";
import Image from "next/image";
import { getPortofolio } from "@/services/apiPortofolio";
import parse from "html-react-parser";
import Link from "next/link";
import DeleteProjectButton from "../Ui/button/ButtonRemovePorto";

// Define the TypeScript interface
interface Portfolio {
  id: number;
  title: string;
  projectImage: string;
  description: string;
}

export default async function TabelPorto() {
  const limitWords = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };
  const res = await getPortofolio();
  const data: Portfolio[] = res?.data || [];
  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  return (
    <div className="relative z-4">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Portofolio</h3>
          <div className="flex flex-wrap gap-2">
            <Link
              href="/dashboard/project/add"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-blue-500 hover:text-white"
            >
              Add
            </Link>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-blue-500 hover:text-white">
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-blue-500 hover:text-white">
              See all
            </button>
          </div>
        </div>

        {/* ✅ Responsive Table Wrapper */}
        <div className="overflow-x-auto rounded-lg">
          <Table className="min-w-full border-collapse text-sm">
            <TableHeader className="bg-gray-50 border-y border-gray-100">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[180px]"
                >
                  Project
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[220px]"
                >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[120px]"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[100px]"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[150px]"
                >
                  Option
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100">
              {data.map((item) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-[50px] w-[50px] overflow-hidden rounded-md flex-shrink-0">
                        <Image
                          fill
                          src={`${baseUrl}/${item.projectImage}`}
                          className="object-cover"
                          alt={item.title}
                          unoptimized={true}
                          sizes="(max-width: 640px) 100vw, 50px"
                        />
                      </div>
                      <p className="font-medium text-gray-800 text-sm sm:text-base">
                        {item.title}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell className="py-3 text-gray-600 text-sm">
                    {parse(limitWords(item.description, 10))}
                  </TableCell>

                  <TableCell className="py-3 text-gray-600 text-sm">
                    Web App
                  </TableCell>

                  <TableCell className="py-3">
                    <Badge size="sm" color="success">
                      Published
                    </Badge>
                  </TableCell>

                  <TableCell className="py-3">
                    <div className="flex flex-wrap gap-2">
                      <Link
                        href={`/dashboard/project/edit/${item.id}`}
                        className="px-3 py-1 rounded bg-blue-500 text-white text-xs sm:text-sm hover:bg-blue-600 transition"
                      >
                        Edit
                      </Link>
                      <DeleteProjectButton projectId={item.id} />
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* ✅ Mobile hint */}
        <p className="text-xs text-gray-400 mt-2 block sm:hidden text-center">
          Swipe &rarr; untuk melihat seluruh kolom
        </p>
      </div>
    </div>
  );
}
