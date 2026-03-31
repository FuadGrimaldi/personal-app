"use client";
import React, { useState, useEffect } from "react";
import ComponentCard from "../../Common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import FileInput from "../input/FileInput";
import RichTextEditor from "@/components/Ui/Editor/RichTextEditor";
import { getPortofolioById, updatePortofolio } from "@/services/apiPortofolio";
import { useRouter } from "next/navigation";

export default function DefaultInputs({ id }: { id: string }) {
  const [message, setMessage] = useState("");
  const [title, setTitle] = useState("");
  const [type, setType] = useState("");
  const [featured, setFeatured] = useState("");
  const [file, setFile] = useState<File | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchData() {
      const res = await getPortofolioById(id);
      if (res?.data) {
        setTitle(res.data.title || "");
        setMessage(res.data.description || "");
        setType(res.data.type || "");
        setFeatured(res.data.featured || "");
      }
    }
    fetchData();
  }, [id]);

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", message);
    formData.append("type", type);
    formData.append("featured", featured);
    if (file) {
      formData.append("projectImage", file); // pastikan nama field sesuai dengan backend
    }

    await updatePortofolio(id, formData);
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
          <Label>Type</Label>
          <Input
            type="text"
            defaultValue={type}
            onChange={(e) => setType(e.target.value)}
          />
        </div>
        <div>
          <Label>Featured</Label>
          <select
            value={featured}
            onChange={(e) => setFeatured(e.target.value)}
            className="w-full px-3 py-2 border border-gray-300 rounded-md text-sm"
          >
            <option value="">Select an option</option>
            <option value="Y">Yes</option>
            <option value="N">No</option>
          </select>
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
          Submit
        </button>
      </form>
    </ComponentCard>
  );
}
