"use client";

import { useEffect, useRef } from "react";
import "quill/dist/quill.snow.css";

import type QuillType from "quill"; // <--- tambahkan di atas

interface EditorProps {
  initialData?: string;
  onChange: (data: string) => void;
}

export default function RichTextEditor({
  initialData = "",
  onChange,
}: EditorProps) {
  const editorRef = useRef<HTMLDivElement>(null);
  const quillInstance = useRef<QuillType | null>(null);

  useEffect(() => {
    // Pastikan hanya jalan di client
    if (typeof window === "undefined") return;

    const loadQuill = async () => {
      const Quill = (await import("quill")).default;

      if (editorRef.current && !quillInstance.current) {
        const quill = new Quill(editorRef.current, {
          theme: "snow",
          placeholder: "Tulis konten artikel di sini...",
          modules: {
            toolbar: [
              [{ header: [1, 2, 3, 4, 5, 6, false] }],
              ["bold", "italic", "underline", "strike"],
              [{ color: [] }, { background: [] }],
              [{ align: [] }],
              [{ list: "ordered" }, { list: "bullet" }],
              ["blockquote", "code-block"],
              ["link", "image"],
              ["clean"],
            ],
          },
        });

        // Isi awal
        quill.root.innerHTML = initialData || "";

        // Listener perubahan
        quill.on("text-change", () => {
          const html = quill.root.innerHTML;
          onChange(html);
        });

        quillInstance.current = quill;
      }
    };

    loadQuill();

    return () => {
      if (quillInstance.current) {
        quillInstance.current.off("text-change");
        quillInstance.current = null;
      }
    };
  }, []); // hanya sekali, agar tidak duplikat

  // Update isi saat `initialData` berubah (misal edit mode)
  useEffect(() => {
    if (quillInstance.current && initialData) {
      const current = quillInstance.current.root.innerHTML;
      if (current !== initialData) {
        quillInstance.current.root.innerHTML = initialData;
      }
    }
  }, [initialData]);

  return (
    <div
      className="quill-editor bg-white text-black min-h-[200px] rounded"
      ref={editorRef}
    >
      <div className="border w-full h-32 px-3 py-2 rounded bg-gray-50 animate-pulse text-gray-400">
        Loading editor...
      </div>
    </div>
  );
}
