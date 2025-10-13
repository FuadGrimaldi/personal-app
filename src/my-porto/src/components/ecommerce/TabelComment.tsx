import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../Ui/table";
import Badge from "../Ui/badge/Badge";
import { getComments } from "@/services/apiComment";
import parse from "html-react-parser";
import DeleteCommentButton from "../Ui/button/ButtonRemoveComment";

// Define the TypeScript interface
interface Comment {
  id: number;
  id_porto: number;
  fullname: string;
  message: string;
  portofolio?: {
    id: number;
    title: string;
    projectImage: string;
  };
}

export default async function TabelComment() {
  const limitWords = (text: string, maxWords: number) => {
    const words = text.split(" ");
    if (words.length <= maxWords) return text;
    return words.slice(0, maxWords).join(" ") + "...";
  };

  const res = await getComments();
  const data: Comment[] = res?.data.comments || [];

  return (
    <div className="relative z-4">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-800">Message</h3>
          <div className="flex flex-wrap gap-2">
            <button className="inline-flex items-center gap-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow hover:bg-blue-500 hover:text-white">
              Filter
            </button>
          </div>
        </div>

        {/* ✅ Responsive Table Wrapper */}
        <div className="overflow-x-auto rounded-lg">
          <Table className="min-w-full border-collapse text-sm ">
            <TableHeader className="bg-gray-200 border-y border-gray-100">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[20px]"
                >
                  No
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[180px]"
                >
                  Name
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[220px]"
                >
                  Message
                </TableCell>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[120px]"
                >
                  Project
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
              {data.map((item, index) => (
                <TableRow
                  key={item.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  <TableCell className="py-3 text-gray-600 text-sm sm:text-base">
                    {index + 1}
                  </TableCell>
                  <TableCell className="py-3 text-gray-600 text-sm sm:text-base">
                    {item.fullname}
                  </TableCell>

                  <TableCell className="py-3 text-gray-600 text-sm">
                    {parse(limitWords(item.message, 10))}
                  </TableCell>

                  <TableCell className="py-3 text-gray-600 text-sm">
                    {item.portofolio ? item.portofolio.title : "N/A"}
                  </TableCell>

                  <TableCell className="py-3">
                    <Badge size="sm" color="success">
                      Active
                    </Badge>
                  </TableCell>
                  <TableCell className="py-3">
                    <div className="flex flex-wrap gap-2">
                      <DeleteCommentButton id={item.id} />
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
