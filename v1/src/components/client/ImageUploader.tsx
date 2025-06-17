"use client";

import React, { useRef } from "react";

interface ImageUploaderProps {
  onImageLoad: (file: File) => void;
  isProcessing: boolean;
  error: string | null;
}

export default function ImageUploader({
  onImageLoad,
  isProcessing,
  error,
}: ImageUploaderProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      onImageLoad(file);
    }
  };

  const handleClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-3">
        <div className="section-icon bg-gradient-to-r from-instagram-pink to-instagram-purple">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
            />
          </svg>
        </div>
        Upload Image
      </h2>

      <div className="relative group">
        <input
          ref={fileInputRef}
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className="hidden"
          disabled={isProcessing}
        />

        <div
          onClick={handleClick}
          className={`upload-zone group-hover:border-instagram-pink group-hover:bg-pink-50 ${
            isProcessing ? "opacity-50 cursor-not-allowed" : "cursor-pointer"
          }`}
        >
          <div className="flex flex-col items-center justify-center pt-5 pb-6">
            <svg
              className="w-8 h-8 sm:w-10 sm:h-10 mb-3 text-gray-400 group-hover:text-instagram-pink transition-colors"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12"
              />
            </svg>

            <p className="mb-2 text-sm sm:text-base text-gray-500 group-hover:text-instagram-pink transition-colors">
              <span className="font-semibold">
                {isProcessing ? "Processing..." : "Click to upload"}
              </span>
              {!isProcessing && " or drag and drop"}
            </p>

            <p className="text-xs text-gray-500">PNG, JPG, JPEG (MAX. 10MB)</p>
          </div>
        </div>

        {error && (
          <div className="mt-3 p-3 bg-red-50 border border-red-200 rounded-lg">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}
      </div>
    </div>
  );
}
