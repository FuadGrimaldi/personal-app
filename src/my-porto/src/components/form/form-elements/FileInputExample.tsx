"use client";
import React from "react";

import FileInput from "../input/FileInput";
import Label from "../Label";

export default function FileInputExample() {
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
    }
  };

  return (
    <div>
      <Label>Upload file</Label>
      <FileInput onChange={handleFileChange} className="custom-class" />
    </div>
  );
}
