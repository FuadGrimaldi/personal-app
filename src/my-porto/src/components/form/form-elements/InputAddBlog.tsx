"use client";
import React, { useState } from "react";
import ComponentCard from "../../Common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import FileInput from "../input/FileInput";
import RichTextEditor from "@/components/Ui/Editor/RichTextEditor";
import { useRouter } from "next/navigation";
import { createBlog } from "@/services/apiBlog";

export default function DefaultAddBlog() {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

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
    formData.append("title", title);
    formData.append("description", message);
    formData.append("type", type);
    formData.append("slug", slugify(title)); // Generate slug dari title
    if (file) {
      formData.append("blog", file); // pastikan nama field sesuai dengan backend
    }

    await createBlog(formData);
    router.push("/dashboard/blog");
  };

  return (
    <ComponentCard title="Default Inputs">
      <form onSubmit={handlerSubmit} className="space-y-6">
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
