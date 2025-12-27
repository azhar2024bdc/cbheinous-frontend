/* eslint-disable no-unused-vars */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Pin, Trash } from "lucide-react";
import Image from "next/image";
import { likeIcon, messsageIcon } from "@/assets/icons/ioncs";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  timeLeft: string;
  cartCount: number;
  onDetailsClick?: (id: string) => void;
  onCartClick?: (id: string) => void;
  onPin?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export const LearnCard = ({
  id,
  image,
  title,

  discount,

  cartCount,
  onDetailsClick,

  onPin,
  onRemove,
}: ProductCardProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
        setIsMenuOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handlePin = () => {
    setIsPinned(!isPinned);
    setIsMenuOpen(false);
    onPin?.(id);
  };

  const handleRemove = () => {
    setIsMenuOpen(false);
    onRemove?.(id);
  };

  return (
    <div className="w-full   bg-white rounded-2xl  transition-shadow  ">
      <div className="p-4">
        <div className="flex items-center gap-2">
          <div className="relative">
            <Image
              src={image}
              alt={title}
              width={500}
              height={500}
              className="w-full h-32 object-cover"
              unoptimized
              priority
            />
            {discount && (
              <div className="absolute top-2 right-2 bg-secondary text-white text-xs font-semibold px-2.5 py-1 rounded-full">
                Save {discount}%
              </div>
            )}
            {isPinned && (
              <div className="absolute top-2 left-2 bg-primary text-white p-1.5 rounded-full shadow-lg">
                <Pin className="w-3 h-3 fill-current" />
              </div>
            )}
          </div>
          <div className="flex-1">
            <div className="flex items-start justify-between gap-3 mb-3">
              <h3 className="text-gray-900 font-normal text-sm leading-snug flex-1">
                {title}
              </h3>
              <div className="relative flex-shrink-0" ref={menuRef}>
                <div
                  onClick={() => setIsMenuOpen(!isMenuOpen)}
                  className="text-gray-400 cursor-pointer hover:text-gray-600 p-1"
                >
                  <svg
                    className="w-4 h-4"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <circle cx="10" cy="5" r="1.5" />
                    <circle cx="10" cy="10" r="1.5" />
                    <circle cx="10" cy="15" r="1.5" />
                  </svg>
                </div>

                {isMenuOpen && (
                  <div className="absolute top-8 right-0 w-32 bg-black/90 rounded-lg shadow-xl z-30  backdrop-blur-sm">
                    <button
                      onClick={handlePin}
                      className="w-full px-4 py-3 text-white hover:bg-white/10 transition-colors flex items-center gap-3 text-sm"
                    >
                      <Pin
                        className={`w-4 h-4 ${isPinned ? "fill-current" : ""}`}
                      />
                      {isPinned ? "Unpin" : "Pin"}
                    </button>
                    <button
                      onClick={handleRemove}
                      className="w-full px-4 py-3 text-white hover:bg-red-500/20 transition-colors flex items-center gap-3 text-sm"
                    >
                      <Trash className="w-4 h-4" />
                      Remove
                    </button>
                  </div>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center gap-4">
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <div className="">{likeIcon}</div>
                  <span>{cartCount}</span>
                </div>
                <div className="flex items-center gap-1 text-gray-500 text-xs">
                  <div className="">{messsageIcon}</div>
                  <span>{cartCount}</span>
                </div>
              </div>

              <button
                onClick={() => onDetailsClick?.(id)}
                className="text-gray-600 hover:text-gray-900 text-xs font-medium transition-colors"
              >
                Learn more...
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
