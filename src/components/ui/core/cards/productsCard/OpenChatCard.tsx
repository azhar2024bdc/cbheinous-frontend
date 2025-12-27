/* eslint-disable no-unused-vars */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { MessageSquare, Pin, Trash } from "lucide-react";
import Image from "next/image";

interface ProductCardProps {
  id: string;
  image: string;
  title: string;
  author: string;
  cartCount: number;
  onCartClick?: (id: string) => void;
  onPin?: (id: string) => void;
  onRemove?: (id: string) => void;
}

export const OpenChatCard = ({
  id,
  image,
  title,
  author,
  cartCount,
  onCartClick,
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
    <div className="w-full max-w-[280px] bg-white rounded-3xl shadow-sm hover:shadow-md transition-shadow overflow-hidden border border-gray-100">
      {/* Header with avatar and author */}
      <div className="p-4 pb-3 flex items-center gap-3">
        <div className="w-10 h-10 rounded-full overflow-hidden bg-gray-200 flex-shrink-0">
          <Image
            src={image}
            alt={author}
            width={40}
            height={40}
            className="w-full h-full object-cover"
            unoptimized
          />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-gray-900 font-medium text-sm truncate">{author}</p>
        </div>
        <div className="relative flex-shrink-0" ref={menuRef}>
          <div
            onClick={() => setIsMenuOpen(!isMenuOpen)}
            className="text-gray-400 cursor-pointer hover:text-gray-600 p-1"
          >
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
              <circle cx="10" cy="5" r="1.5" />
              <circle cx="10" cy="10" r="1.5" />
              <circle cx="10" cy="15" r="1.5" />
            </svg>
          </div>

          {isMenuOpen && (
            <div className="absolute top-8 right-0 w-32 bg-black/90 rounded-lg shadow-xl z-30 overflow-hidden backdrop-blur-sm">
              <button
                onClick={handlePin}
                className="w-full px-4 py-3 text-white hover:bg-white/10 transition-colors flex items-center gap-3 text-sm"
              >
                <Pin className={`w-4 h-4 ${isPinned ? 'fill-current' : ''}`} />
                {isPinned ? 'Unpin' : 'Pin'}
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

      {/* Question/Title */}
      <div className="px-4 pb-3">
        <p className="text-gray-900 text-sm leading-relaxed">{title}</p>
      </div>

      {/* Comment count */}
      <div className="px-4 pb-3">
        <div className="flex items-center gap-1.5 text-gray-500">
          <MessageSquare className="w-4 h-4" />
          <span className="text-sm">{cartCount}</span>
        </div>
      </div>

      {/* Comment Button */}
      <div className="px-4 pb-4">
        <button
          onClick={() => onCartClick?.(id)}
          className="w-full bg-purple-100 hover:bg-purple-200 text-purple-700 font-medium text-sm py-3 rounded-2xl transition-colors"
        >
          Comment
        </button>
      </div>
    </div>
  );
};