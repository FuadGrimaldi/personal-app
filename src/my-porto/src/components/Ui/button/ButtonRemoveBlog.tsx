"use client";
import { useRouter } from "next/navigation";
import { useState } from "react";
import Swal from "sweetalert2";
import { deleteBlog } from "@/services/apiBlog";

interface DeleteBlogButtonProps {
  blogId: number;
}

export default function DeleteBlogButton({ blogId }: DeleteBlogButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirm = await Swal.fire({
      title: "Yakin ingin hapus?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Ya",
      cancelButtonText: "Batal",
    });
    if (!confirm.isConfirmed) return;

    setLoading(true);

    try {
      const res = await deleteBlog(blogId.toString());

      if (res.meta.code != 200) {
        throw new Error("Gagal menghapus project");
      }

      router.refresh();
    } catch (error) {
      console.error("Error deleting project:", error);
      alert("Terjadi kesalahan saat menghapus project.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <button
      onClick={handleDelete}
      disabled={loading}
      className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600 transition disabled:opacity-50 cursor-pointer"
    >
      {loading ? "Menghapus..." : "Hapus"}
    </button>
  );
}
