"use client";
import React, { useState } from "react";

import TextArea from "../input/TextArea";
import Label from "../Label";

export default function TextAreaInput() {
  const [message, setMessage] = useState("");

  return (
    <div className="space-y-6">
      {/* Default TextArea */}
      <div>
        <Label>Description</Label>
        <TextArea
          value={message}
          onChange={(value) => setMessage(value)}
          rows={6}
        />
      </div>
    </div>
  );
}
