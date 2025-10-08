"use client";
import { useRouter } from "next/navigation";
import { deletePortofolio } from "@/services/apiPortofolio";
import { useState } from "react";

interface DeleteProjectButtonProps {
  projectId: number;
}

export default function DeleteProjectButton({
  projectId,
}: DeleteProjectButtonProps) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleDelete = async () => {
    const confirmDelete = confirm(
      "Apakah kamu yakin ingin menghapus project ini?"
    );
    if (!confirmDelete) return;

    setLoading(true);

    try {
      const res = await deletePortofolio(projectId.toString());

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
      className="px-3 py-1 rounded bg-red-500 text-white text-sm hover:bg-red-600 transition disabled:opacity-50"
    >
      {loading ? "Menghapus..." : "Hapus"}
    </button>
  );
}
