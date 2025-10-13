"use client";
import { useRouter } from "next/navigation";
import { deleteComment } from "@/services/apiComment";
import { useState } from "react";
import Swal from "sweetalert2";

interface DeleteCommentButtonProps {
  id: number;
}

export default function DeleteCommentButton({ id }: DeleteCommentButtonProps) {
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
      await deleteComment(id.toString());

      router.refresh();
    } catch (error) {
      console.error("Error deleting komentar:", error);
      Swal.fire({
        title: "Error",
        text: "Terjadi kesalahan saat menghapus komentar.",
        icon: "error",
        confirmButtonText: "OK",
      });
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
