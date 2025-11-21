import React, { useState } from "react";
import { FileResponse } from "@/types/project.types";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
} from "@heroicons/react/24/outline";
import { cn } from "@/utils/helpers";

interface ImageGalleryProps {
  images: FileResponse[];
  mainImageUrl?: string;
  className?: string;
}

export const ImageGallery: React.FC<ImageGalleryProps> = ({
  images,
  mainImageUrl,
  className,
}) => {
  const [selectedIndex, setSelectedIndex] = useState(0);

  // Combine main image with project images
  const allImages = mainImageUrl
    ? [
        { id: 0, downloadUrl: mainImageUrl, originalName: "Main Image" },
        ...images,
      ]
    : images;

  if (allImages.length === 0) {
    return (
      <div
        className={cn(
          "w-full h-[400px] bg-gray-200 rounded-xl flex items-center justify-center",
          className
        )}
      >
        <p className="text-gray-500">No images available</p>
      </div>
    );
  }

  const currentImage = allImages[selectedIndex];

  const goToPrevious = () => {
    setSelectedIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const goToNext = () => {
    setSelectedIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <div className={cn("space-y-4", className)}>
      {/* Main Image */}
      <div className="relative aspect-w-16 aspect-h-9 group">
        <img
          src={currentImage.downloadUrl}
          alt={currentImage.originalName}
          className="w-full h-[400px] object-cover rounded-xl"
        />

        {/* Navigation Arrows */}
        {allImages.length > 1 && (
          <>
            <button
              onClick={goToPrevious}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Previous image"
            >
              <ChevronLeftIcon className="h-6 w-6" />
            </button>
            <button
              onClick={goToNext}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity"
              aria-label="Next image"
            >
              <ChevronRightIcon className="h-6 w-6" />
            </button>
          </>
        )}

        {/* Image Counter */}
        {allImages.length > 1 && (
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/50 text-white px-3 py-1 rounded-full text-sm">
            {selectedIndex + 1} / {allImages.length}
          </div>
        )}
      </div>

      {/* Thumbnail Gallery */}
      {allImages.length > 1 && (
        <div className="flex gap-2 overflow-x-auto pb-2">
          {allImages.map((image, index) => (
            <button
              key={image.id || index}
              onClick={() => setSelectedIndex(index)}
              className={cn(
                "flex-shrink-0 w-24 h-24 rounded-lg overflow-hidden border-2 transition-all",
                selectedIndex === index
                  ? "border-primary-600 ring-2 ring-primary-200"
                  : "border-transparent hover:border-gray-300"
              )}
            >
              <img
                src={image.downloadUrl}
                alt={image.originalName}
                className="w-full h-full object-cover"
              />
            </button>
          ))}
        </div>
      )}
    </div>
  );
};

