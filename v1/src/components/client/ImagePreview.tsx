"use client";

import React from "react";

interface ImagePreviewProps {
  processedImageUrl: string | null;
  isProcessing: boolean;
  error: string | null;
}

export default function ImagePreview({
  processedImageUrl,
  isProcessing,
  error,
}: ImagePreviewProps) {
  const renderContent = () => {
    if (error) {
      return (
        <div className="text-center text-red-600 p-8">
          <svg
            className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <p className="text-sm sm:text-base font-medium">Error</p>
          <p className="text-xs sm:text-sm mt-2">{error}</p>
        </div>
      );
    }

    if (isProcessing) {
      return (
        <div className="flex flex-col items-center justify-center text-instagram-purple p-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-instagram-purple mb-4"></div>
          <p className="text-sm font-medium">Processing image...</p>
        </div>
      );
    }

    if (processedImageUrl) {
      return (
        <div className="flex items-center justify-center p-4">
          <div className="relative max-w-full max-h-full">
            <img
              src={processedImageUrl}
              alt="Processed Instagram image"
              className="max-w-full max-h-96 rounded-lg shadow-lg"
              style={{
                backgroundColor: "white",
                border: "2px solid #e5e7eb",
              }}
            />
            <div className="absolute -bottom-2 -right-2 bg-green-500 text-white text-xs px-2 py-1 rounded-full">
              ✓ Ready
            </div>
          </div>
        </div>
      );
    }

    return (
      <div className="text-center text-gray-500 p-8">
        <svg
          className="w-12 h-12 sm:w-16 sm:h-16 mx-auto mb-4 opacity-50"
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
        <p className="text-sm sm:text-base">
          Your cropped image will appear here
        </p>
        <p className="text-xs sm:text-sm mt-2 opacity-75">
          Upload an image to get started
        </p>
      </div>
    );
  };

  const getBorderClass = () => {
    if (error) return "border-red-400";
    if (isProcessing) return "border-instagram-purple/30";
    if (processedImageUrl) return "border-green-400";
    return "border-dashed border-gray-300 bg-gray-100";
  };

  return (
    <div className="glass-effect rounded-3xl p-6 sm:p-8 shadow-2xl">
      <h2 className="text-xl sm:text-2xl font-semibold text-gray-800 mb-6 flex items-center gap-3">
        <div className="section-icon bg-gradient-to-r from-instagram-blue to-instagram-purple">
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
              d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
            />
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
            />
          </svg>
        </div>
        Preview
      </h2>

      <div
        className={`
          min-h-64 sm:min-h-80 flex items-center justify-center rounded-2xl border-2 transition-all duration-300
          ${getBorderClass()}
        `}
      >
        {renderContent()}
      </div>
    </div>
  );
}
