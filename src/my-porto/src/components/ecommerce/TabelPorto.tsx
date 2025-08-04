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
        <div className="flex flex-col gap-2 mb-4 sm:flex-row sm:items-center sm:justify-between ">
          <div>
            <h3 className="text-lg font-semibold text-gray-800">Portofolio</h3>
          </div>
          <div className="flex items-center gap-3">
            <Link
              href="/dashboard/project/add"
              className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800"
            >
              {/* SVG icon */}
              Add
            </Link>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800">
              {/* SVG icon */}
              Filter
            </button>
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2.5 text-theme-sm font-medium text-gray-700 shadow-theme-xs hover:bg-gray-50 hover:text-gray-800">
              See all
            </button>
          </div>
        </div>

        <div className="max-w-full overflow-x-auto">
          <Table>
            <TableHeader className="border-gray-100 border-y">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Project
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Description
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Category
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Status
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-500 text-start text-theme-xs"
                >
                  Option
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100">
              {data.map((item) => (
                <TableRow key={item.id}>
                  <TableCell className="py-3">
                    <div className="flex items-center gap-3">
                      <div className="relative h-[50px] w-[50px] overflow-hidden rounded-md">
                        <Image
                          fill
                          src={`${baseUrl}/${item.projectImage}`}
                          className="object-cover"
                          alt={item.title}
                          unoptimized={true}
                          sizes="(max-width: 640px) 100vw, 50px"
                        />
                      </div>
                      <div>
                        <p className="font-medium text-gray-800 text-theme-sm">
                          {item.title}
                        </p>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm">
                    {limitWords(item.description, 20)}
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm">
                    {/* Hardcoded for now */}
                    Web App
                  </TableCell>
                  <TableCell className="py-3 text-gray-500 text-theme-sm">
                    <Badge size="sm" color="success">
                      Published
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/project/edit/${item.id}`}
                        className="px-3 py-1 rounded bg-blue-500 text-white text-sm hover:bg-blue-600 transition"
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
      </div>
    </div>
  );
}
