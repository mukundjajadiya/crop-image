"use client";

import React from "react";

interface ModeSelectorProps {
  value: "fit" | "fill";
  onChange: (mode: "fit" | "fill") => void;
  disabled?: boolean;
}

const modes = [
  {
    value: "fit" as const,
    label: "Fit Mode",
    description: "Add padding to fit aspect ratio",
  },
  {
    value: "fill" as const,
    label: "Fill Mode",
    description: "Crop image to fill aspect ratio",
  },
];

export default function ModeSelector({
  value,
  onChange,
  disabled = false,
}: ModeSelectorProps) {
  const handleChange = (mode: "fit" | "fill") => {
    if (!disabled) {
      onChange(mode);
    }
  };

  return (
    <div className="space-y-4">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 flex items-center gap-3">
        <div className="section-icon bg-gradient-to-r from-instagram-orange to-instagram-yellow">
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
              d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
            />
          </svg>
        </div>
        Mode
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 sm:gap-4">
        {modes.map((mode) => (
          <label
            key={mode.value}
            className={`radio-option group ${
              disabled ? "opacity-50 cursor-not-allowed" : ""
            } ${
              value === mode.value
                ? "border-instagram-pink bg-gradient-to-br from-pink-50 to-purple-50 shadow-lg ring-2 ring-instagram-pink/20"
                : "border-gray-200 bg-white"
            }`}
            onClick={() => handleChange(mode.value)}
          >
            <input
              type="radio"
              name="fitMode"
              value={mode.value}
              checked={value === mode.value}
              onChange={() => handleChange(mode.value)}
              disabled={disabled}
              className="sr-only"
            />

            <div className="flex items-center w-full">
              <div
                className={`radio-indicator transition-all duration-300 group-hover:border-instagram-pink group-hover:scale-110 ${
                  value === mode.value
                    ? "border-instagram-pink bg-white"
                    : "border-gray-300"
                }`}
              >
                <div
                  className={`radio-dot transition-transform duration-300 ${
                    value === mode.value ? "scale-100" : "scale-0"
                  }`}
                />
              </div>

              <div className="flex-1">
                <div
                  className={`font-semibold text-sm sm:text-base transition-colors ${
                    value === mode.value
                      ? "text-instagram-pink"
                      : "text-gray-800 group-hover:text-instagram-pink"
                  }`}
                >
                  {mode.label}
                </div>
                <div className="text-xs sm:text-sm text-gray-500">
                  {mode.description}
                </div>
              </div>

              <div
                className={`check-icon transition-opacity duration-300 ${
                  value === mode.value ? "opacity-100" : "opacity-0"
                }`}
              >
                <svg
                  className="w-5 h-5 text-instagram-pink"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path
                    fillRule="evenodd"
                    d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
}
