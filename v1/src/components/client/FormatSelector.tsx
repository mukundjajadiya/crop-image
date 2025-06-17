"use client";

import React from "react";
import { InstagramCropperService } from "@/services/InstagramCropperService";

interface FormatSelectorProps {
  value: number;
  onChange: (aspectRatio: number) => void;
  disabled?: boolean;
}

export default function FormatSelector({
  value,
  onChange,
  disabled = false,
}: FormatSelectorProps) {
  const formats = InstagramCropperService.getInstagramFormats();

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(parseFloat(e.target.value));
  };

  return (
    <div className="space-y-4">
      <label
        htmlFor="aspectRatioSelect"
        className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-3"
      >
        <div className="section-icon bg-gradient-to-r from-instagram-purple to-instagram-blue">
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
              d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
            />
          </svg>
        </div>
        Instagram Format
      </label>

      <select
        id="aspectRatioSelect"
        value={value}
        onChange={handleChange}
        disabled={disabled}
        aria-label="Select Instagram format and aspect ratio"
        className="w-full px-4 py-3 sm:py-4 text-sm sm:text-base bg-white border-2 border-gray-200 rounded-xl focus:ring-4 focus:ring-instagram-pink/20 focus:border-instagram-pink transition-all duration-300 appearance-none cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
      >
        {formats.map((format) => (
          <option key={format.value} value={format.value}>
            {format.label}
          </option>
        ))}
      </select>
    </div>
  );
}
