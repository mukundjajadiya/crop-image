"use client";

import React, { useState, useRef, useCallback } from "react";
import {
  InstagramCropperService,
  CropperConfig,
} from "@/services/InstagramCropperService";
import ImageUploader from "./ImageUploader";
import FormatSelector from "./FormatSelector";
import ModeSelector from "./ModeSelector";
import ImagePreview from "./ImagePreview";

interface ImageCropperProps {
  className?: string;
}

export default function ImageCropper({ className = "" }: ImageCropperProps) {
  const [image, setImage] = useState<HTMLImageElement | null>(null);
  const [processedImageUrl, setProcessedImageUrl] = useState<string | null>(
    null
  );
  const [aspectRatio, setAspectRatio] = useState<number>(1);
  const [fitMode, setFitMode] = useState<"fit" | "fill">("fit");
  const [isProcessing, setIsProcessing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const cropperServiceRef = useRef<InstagramCropperService | null>(null);

  // Initialize service on client side
  React.useEffect(() => {
    cropperServiceRef.current = new InstagramCropperService();
  }, []);

  const handleImageLoad = useCallback(
    async (file: File) => {
      try {
        setError(null);
        setIsProcessing(true);

        const loadedImage = await InstagramCropperService.loadImageFromFile(
          file
        );
        setImage(loadedImage);

        // Auto-process with current settings
        if (cropperServiceRef.current) {
          const config: CropperConfig = { aspectRatio, fitMode };
          const processed = await cropperServiceRef.current.processImage(
            loadedImage,
            config
          );
          setProcessedImageUrl(processed);
        }
      } catch (err) {
        setError(err instanceof Error ? err.message : "Failed to load image");
      } finally {
        setIsProcessing(false);
      }
    },
    [aspectRatio, fitMode]
  );

  const handleFormatChange = useCallback(
    async (newAspectRatio: number) => {
      setAspectRatio(newAspectRatio);

      if (image && cropperServiceRef.current) {
        try {
          setIsProcessing(true);
          const config: CropperConfig = {
            aspectRatio: newAspectRatio,
            fitMode,
          };
          const processed = await cropperServiceRef.current.processImage(
            image,
            config
          );
          setProcessedImageUrl(processed);
        } catch (err) {
          setError("Failed to process image");
        } finally {
          setIsProcessing(false);
        }
      }
    },
    [image, fitMode]
  );

  const handleModeChange = useCallback(
    async (newFitMode: "fit" | "fill") => {
      setFitMode(newFitMode);

      if (image && cropperServiceRef.current) {
        try {
          setIsProcessing(true);
          const config: CropperConfig = { aspectRatio, fitMode: newFitMode };
          const processed = await cropperServiceRef.current.processImage(
            image,
            config
          );
          setProcessedImageUrl(processed);
        } catch (err) {
          setError("Failed to process image");
        } finally {
          setIsProcessing(false);
        }
      }
    },
    [image, aspectRatio]
  );

  const handleDownload = useCallback(() => {
    if (processedImageUrl && cropperServiceRef.current) {
      cropperServiceRef.current.downloadImage(processedImageUrl);

      // Auto-clear after download
      setTimeout(() => {
        setImage(null);
        setProcessedImageUrl(null);
        setError(null);
      }, 100);
    }
  }, [processedImageUrl]);

  const handleReset = useCallback(() => {
    setImage(null);
    setProcessedImageUrl(null);
    setError(null);
    setAspectRatio(1);
    setFitMode("fit");
  }, []);

  return (
    <div
      className={`grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 ${className}`}
    >
      {/* Controls Panel */}
      <div className="glass-effect rounded-3xl p-6 sm:p-8 shadow-2xl">
        <div className="space-y-6 sm:space-y-8">
          {/* File Upload Section */}
          <ImageUploader
            onImageLoad={handleImageLoad}
            isProcessing={isProcessing}
            error={error}
          />

          {/* Instagram Format Selection */}
          <FormatSelector
            value={aspectRatio}
            onChange={handleFormatChange}
            disabled={isProcessing}
          />

          {/* Fit Mode Selection */}
          <ModeSelector
            value={fitMode}
            onChange={handleModeChange}
            disabled={isProcessing}
          />

          {/* Generate Button */}
          <button
            onClick={handleDownload}
            disabled={!processedImageUrl || isProcessing}
            className="btn-instagram group disabled:opacity-50 disabled:cursor-not-allowed"
          >
            <svg
              className="w-5 h-5 sm:w-6 sm:h-6 group-hover:rotate-180 transition-transform duration-500"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4"
              />
            </svg>
            {isProcessing ? "Processing..." : "Generate & Download"}
          </button>

          {/* Reset Button */}
          {(image || error) && (
            <button
              onClick={handleReset}
              className="w-full py-3 px-6 bg-gray-500 hover:bg-gray-600 text-white font-semibold rounded-xl transition-colors duration-300"
            >
              Reset
            </button>
          )}
        </div>
      </div>

      {/* Preview Panel */}
      <ImagePreview
        processedImageUrl={processedImageUrl}
        isProcessing={isProcessing}
        error={error}
      />
    </div>
  );
}
