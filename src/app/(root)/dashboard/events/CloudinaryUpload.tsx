// components/CloudinaryUpload.tsx
"use client";

import React, { useState, startTransition } from "react";
import { useActionState } from "react";
import { CloudinaryResponse, uploadImage } from "@/utils/server-actions";

interface CloudinaryUploadProps {
  value?: string;
  onChange: (url: string) => void;
}

export default function CloudinaryUpload({ value, onChange }: CloudinaryUploadProps) {
  const [preview, setPreview] = useState<string | null>(value || null);
  const [isUploading, setIsUploading] = useState<boolean>(false);

  // Server Action for uploading
  const uploadWithFormData = async (prevState: any, formData: FormData) => {
    setIsUploading(true); // Start the uploading state before the form action

    try {
      const result = await uploadImage(formData);

      if (result.success && result.url) {
        setPreview(result.url);
        onChange(result.url);
      }

      return result;
    } catch (error) {
      return { success: false, message: "File upload failed" };
    } finally {
      setIsUploading(false);
    }
  };

  const [state, formAction] = useActionState(uploadWithFormData, {
    success: false,
    message: "",
    url: "",
  });

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    // Set uploading state before startTransition
    setIsUploading(true);

    // Wrap formAction inside startTransition to prevent blocking UI
    startTransition(() => {
      formAction(data);
    });
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();

    const file = e.dataTransfer.files[0];
    if (!file) return;

    const data = new FormData();
    data.append("file", file);

    // Set uploading state before startTransition
    setIsUploading(true);

    // Wrap formAction inside startTransition to prevent blocking UI
    startTransition(() => {
      formAction(data);
    });
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
  };

  const handleRemove = () => {
    setPreview(null);
    onChange("");
  };

  return (
    <div className="mb-4">
      <label className="block mb-2">Main Image</label>

      {/* Drag & Drop Area */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        className={`border-2 border-dashed p-6 text-center rounded cursor-pointer ${
          isUploading ? "bg-blue-500 bg-opacity-10" : "bg-white/10"
        }`}
      >
        {preview ? (
          <div className="relative inline-block">
            <img src={preview} alt="Uploaded preview" className="max-h-40 mx-auto rounded shadow" />
            <button
              type="button"
              onClick={handleRemove}
              className="absolute top-0 right-0 bg-red-500 hover:bg-red-600 text-white rounded-full w-6 h-6 flex items-center justify-center text-sm -top-2 -right-2"
            >
              ×
            </button>
          </div>
        ) : isUploading ? (
          <>
            <p>Uploading...</p>
            <div className="mt-3 flex justify-center">
              {/* Loading Spinner */}
              <div className="w-8 h-8 border-4 border-t-transparent border-white rounded-full animate-spin"></div>
            </div>
          </>
        ) : (
          <>
            <p>Drag an image here or click to select</p>
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={handleFileChange}
              disabled={isUploading}
              className="hidden"
              id="cloudinary-upload-input"
            />
            <label
              htmlFor="cloudinary-upload-input"
              className="mt-2 inline-block px-4 py-2 bg-blue-600 hover:bg-blue-700 transition rounded cursor-pointer"
            >
              Browse
            </label>
          </>
        )}
      </div>

      {/* Hidden Input for Form Submission */}
      <input type="hidden" name="mainImage" value={preview || ""} />

      {/* Error Message */}
      {state.message && <p className="text-red-400 mt-2">{state.message}</p>}
    </div>
  );
}
