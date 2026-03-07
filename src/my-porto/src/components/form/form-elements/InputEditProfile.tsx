"use client";
import React, { useState, useEffect } from "react";
import ComponentCard from "../../Common/ComponentCard";
import Label from "../Label";
import Input from "../input/InputField";
import FileInput from "../input/FileInput";
import RichTextEditor from "@/components/Ui/Editor/RichTextEditor";
import { getProfile, updateUsers } from "@/services/apiUser";
import { useRouter } from "next/navigation";

interface Profile {
  id: number;
  username: string;
  name: string;
  age: number;
  phone: string;
  job: string;
  country: string;
  province: string;
  city: string;
  address_details: string;
  description: string;
}

export default function DefaultInputProfile() {
  const router = useRouter();

  const [profile, setProfile] = useState<Profile | null>(null);
  const [file, setFile] = useState<File | null>(null);

  useEffect(() => {
    async function fetchData() {
      const res = await getProfile();
      if (res?.data) {
        setProfile(res.data);
      }
    }
    fetchData();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!profile) return;

    setProfile({
      ...profile,
      [e.target.name]: e.target.value,
    });
  };

  const handleDescription = (value: string) => {
    if (!profile) return;

    setProfile({
      ...profile,
      description: value,
    });
  };

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0] || null;
    setFile(selectedFile);
  };

  const handlerSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!profile) return;

    const formData = new FormData();

    Object.entries(profile).forEach(([key, value]) => {
      formData.append(key, String(value));
    });

    if (file) {
      formData.append("avatar", file);
    }
    const userId = String(profile.id);

    await updateUsers(userId, formData);

    router.push("/dashboard/profile");
  };

  if (!profile) return <p>Loading...</p>;

  return (
    <ComponentCard title="Edit Profile">
      <form onSubmit={handlerSubmit} className="space-y-6">
        <div>
          <Label>Username</Label>
          <Input
            type="text"
            name="username"
            defaultValue={profile.username}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Name</Label>
          <Input
            type="text"
            name="name"
            defaultValue={profile.name}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Age</Label>
          <Input
            type="number"
            name="age"
            defaultValue={profile.age}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Phone</Label>
          <Input
            type="text"
            name="phone"
            defaultValue={profile.phone}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Job</Label>
          <Input
            type="text"
            name="job"
            defaultValue={profile.job}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Country</Label>
          <Input
            type="text"
            name="country"
            defaultValue={profile.country}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Province</Label>
          <Input
            type="text"
            name="province"
            defaultValue={profile.province}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>City</Label>
          <Input
            type="text"
            name="city"
            defaultValue={profile.city}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Address</Label>
          <Input
            type="text"
            name="address_details"
            defaultValue={profile.address_details}
            onChange={handleChange}
          />
        </div>

        <div>
          <Label>Description</Label>
          <RichTextEditor
            initialData={profile.description}
            onChange={handleDescription}
          />
        </div>

        <div>
          <Label>Avatar</Label>
          <FileInput onChange={handleFileChange} className="custom-class" />
        </div>

        <button
          type="submit"
          className="cursor-pointer px-4 py-2 bg-gray-900 text-white rounded-lg font-medium hover:bg-gray-700"
        >
          Update Profile
        </button>
      </form>
    </ComponentCard>
  );
}
