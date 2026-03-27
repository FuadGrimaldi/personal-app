"use client";
import React, { useState, useEffect } from "react";
import ComponentCard from "../../Common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import FileInput from "../input/FileInput";
import RichTextEditor from "@/components/Ui/Editor/RichTextEditor";
import { useRouter } from "next/navigation";
import { getBlogByid, updateBlog } from "@/services/apiBlog";

export default function DefaultInputsBlog({ id }: { id: string }) {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [id_user, setIdUser] = useState(0);
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await getBlogByid(id);
      if (res?.data) {
        setTitle(res.data.title || "");
        setMessage(res.data.description || "");
        setType(res.data.type || "");
        setIdUser(res.data.id_user || 0);
      }
    }
    fetchData();
  }, [id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const slugify = (text: string) => {
    return text
      .toString()
      .toLowerCase()
      .trim()
      .replace(/\s+/g, "-") // Ganti spasi dengan tanda hubung
      .replace(/[^\w\-]+/g, "") // Hapus karakter yang tidak diinginkan
      .replace(/\-\-+/g, "-"); // Ganti multiple tanda hubung dengan satu
  };

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("id_user", id_user.toString());
    formData.append("title", title);
    formData.append("description", message);
    formData.append("type", type);
    formData.append("slug", slugify(title)); // Generate slug dari title
    if (file) {
      formData.append("blog", file); // pastikan nama field sesuai dengan backend
    }

    await updateBlog(id, formData);
    router.push("/dashboard/blog");
  };

  return (
    <ComponentCard title="Default Inputs">
      <form onSubmit={handlerSubmit} className="space-y-6">
        <div>
          <Label>ID User</Label>
          <Input
            type="text"
            defaultValue={id_user}
            onChange={(e) => setIdUser(Number(e.target.value))}
            disabled
          />
        </div>
        <div>
          <Label>Title</Label>
          <Input
            type="text"
            defaultValue={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div>
          <Label>Type</Label>
          <Input
            type="text"
            defaultValue={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>

        <div>
          <Label>Description</Label>
          <RichTextEditor
            initialData={message}
            onChange={(value) => setMessage(value)} // langsung simpan ke state
          />
        </div>

        <div>
          <Label>Upload file</Label>
          <FileInput onChange={handleFileChange} className="custom-class" />
        </div>

        <button
          type="submit"
          className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Save
        </button>
      </form>
    </ComponentCard>
  );
}
