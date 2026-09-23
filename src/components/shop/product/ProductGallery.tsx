"use client";
//
import Image from "next/image";
import { ChevronLeft, ChevronRight, Maximize2 } from "lucide-react";
import { useState } from "react";
import { useDialog } from "@/hooks/client/useDialog";
// 
type ProductGalleryProps = {
  productName: string;
  images: string[];
};

const fallbackImage = "/meta/logo.png";

export default function ProductGallery({
  productName,
  images,
}: ProductGalleryProps) {
  const availableImages = images.filter(Boolean);
  const galleryImages = availableImages.length
    ? availableImages
    : [fallbackImage];
  const [activeIndex, setActiveIndex] = useState(0);
  const { openDialog } = useDialog();
  const activeImage = galleryImages[activeIndex] || fallbackImage;

  const selectImage = (index: number) => setActiveIndex(index);
  const moveImage = (direction: number) => {
    setActiveIndex(
      (index) =>
        (index + direction + galleryImages.length) % galleryImages.length,
    );
  };

  return (
    <div className="space-y-4">
      <div className="group relative aspect-square overflow-hidden rounded-2xl border border-[#dcebdc] bg-[#f6fbf4]">
        <Image
          src={activeImage}
          alt={`${productName} product image ${activeIndex + 1}`}
          fill
          priority
          sizes="(max-width: 1024px) 100vw, 54vw"
          className="object-cover"
          onError={(event) => {
            event.currentTarget.src = fallbackImage;
          }}
        />
        <button
          type="button"
          onClick={() =>
            openDialog({
              children: (
                <div className="relative h-[75vh] w-[min(90vw,900px)]">
                  <Image
                    src={activeImage}
                    alt={`${productName} full-size product image`}
                    fill
                    sizes="30vw"
                    className="object-contain"
                  />
                </div>
              ),
            })
          }
          aria-label="Open product image fullscreen"
          className="absolute right-4 top-4 rounded-full bg-white/90 p-3 text-[#0f3d2e] shadow-sm transition hover:bg-white"
        >
          <Maximize2 className="size-4" />
        </button>
        {galleryImages.length > 1 && (
          <>
            <button
              type="button"
              onClick={() => moveImage(-1)}
              aria-label="Previous product image"
              className="absolute left-4 top-1/2 rounded-full bg-white/90 p-2 text-[#0f3d2e] shadow-sm"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              type="button"
              onClick={() => moveImage(1)}
              aria-label="Next product image"
              className="absolute right-4 top-1/2 rounded-full bg-white/90 p-2 text-[#0f3d2e] shadow-sm"
            >
              <ChevronRight className="size-5" />
            </button>
          </>
        )}
      </div>

      <div className="grid grid-cols-4 gap-3">
        {galleryImages.map((image, index) => (
          <button
            key={`${image}-${index}`}
            type="button"
            onClick={() => selectImage(index)}
            aria-label={`View ${productName} image ${index + 1}`}
            aria-pressed={activeIndex === index}
            className={`relative aspect-square overflow-hidden rounded-xl border-2 bg-[#f6fbf4] ${activeIndex === index ? "border-[#1f7a1f]" : "border-transparent"}`}
          >
            <Image
              src={image}
              alt={`${productName} thumbnail ${index + 1}`}
              fill
              sizes="120px"
              className="object-cover"
            />
          </button>
        ))}
      </div>
    </div>
  );
}
