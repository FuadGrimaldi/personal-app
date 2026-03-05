import {
  Table,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from "../Ui/table";
import Link from "next/link";
import { getUser } from "@/services/apiUser";

// Define the TypeScript interface
interface Users {
  id: number;
  email: string;
  username: string;
  name: string;
  age: string;
  avatar: string;
  role: string;
  phone: string;
  job: string;
  country: string;
  province: string;
  city: string;
  address_details: string;
  description: string;
}

export default async function TabelUser() {
  const res = await getUser();
  const data: Users[] = res?.data || [];
  return (
    <div className="relative z-4">
      <div className="overflow-hidden rounded-2xl border border-gray-200 bg-white px-4 pb-3 pt-4 sm:px-6">
        {/* Header */}
        <div className="flex flex-col gap-3 mb-4 sm:flex-row sm:items-center sm:justify-between">
          <h3 className="text-lg font-semibold text-gray-800">User</h3>
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
            <TableHeader className="bg-gray-200 border-y border-gray-100">
              <TableRow>
                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[180px]"
                >
                  Name
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[200px]"
                >
                  Email
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[80px]"
                >
                  Age
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[150px]"
                >
                  Job
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[200px]"
                >
                  Location
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[220px]"
                >
                  Address
                </TableCell>

                <TableCell
                  isHeader
                  className="py-3 font-medium text-gray-600 text-left min-w-[120px]"
                >
                  Option
                </TableCell>
              </TableRow>
            </TableHeader>

            <TableBody className="divide-y divide-gray-100">
              {data.map((user: Users) => (
                <TableRow
                  key={user.id}
                  className="hover:bg-gray-50 transition-colors duration-200"
                >
                  {/* NAME */}
                  <TableCell className="py-3 font-medium text-gray-800">
                    {user.name}
                  </TableCell>

                  {/* EMAIL */}
                  <TableCell className="py-3 text-gray-600">
                    {user.email}
                  </TableCell>

                  {/* AGE */}
                  <TableCell className="py-3 text-gray-600">
                    {user.age || "-"}
                  </TableCell>

                  {/* JOB */}
                  <TableCell className="py-3 text-gray-600">
                    {user.job || "-"}
                  </TableCell>

                  {/* LOCATION */}
                  <TableCell className="py-3 text-gray-600">
                    {[user.city, user.province, user.country]
                      .filter(Boolean)
                      .join(", ") || "-"}
                  </TableCell>

                  {/* ADDRESS */}
                  <TableCell className="py-3 text-gray-600 max-w-[250px]">
                    <p className="truncate">{user.address_details || "-"}</p>
                  </TableCell>

                  {/* OPTION */}
                  <TableCell className="py-3">
                    <div className="flex gap-2">
                      <Link
                        href={`/dashboard/users/edit/${user.id}`}
                        className="px-3 py-1 rounded bg-blue-500 text-white text-xs hover:bg-blue-600 transition"
                      >
                        Edit
                      </Link>

                      <button className="px-3 py-1 rounded bg-red-500 text-white text-xs hover:bg-red-600 transition">
                        Delete
                      </button>
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
