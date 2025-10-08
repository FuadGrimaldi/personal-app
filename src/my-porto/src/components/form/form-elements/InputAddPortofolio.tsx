"use client";
import React, { useState } from "react";
import ComponentCard from "../../Common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import FileInput from "../input/FileInput";
import RichTextEditor from "@/components/Ui/Editor/RichTextEditor";
import { createPortofolio } from "@/services/apiPortofolio";
import { useRouter } from "next/navigation";

export default function DefaultAdd() {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", message);
    if (file) {
      formData.append("projectImage", file); // pastikan nama field sesuai dengan backend
    }

    await createPortofolio(formData);
    router.push("/dashboard/project");
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
          className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
        >
          Submit
        </button>
      </form>
    </ComponentCard>
  );
}
