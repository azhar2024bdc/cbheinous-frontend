
/* eslint-disable no-unused-vars */
"use client";

import React, { useState, useRef, useEffect } from "react";
import { Clock, Pin, Trash } from "lucide-react";
import Image from "next/image";
import { messsageIcon } from "@/assets/icons/ioncs";

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

export const ProductCard = ({
  id,
  image,
  title,
  currentPrice,
  originalPrice,
  discount,
  timeLeft,
  cartCount,
  onDetailsClick,
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
    <div className="w-[300px] bg-white rounded-2xl shadow-lg overflow-hidden">
      <div className="relative">
        <Image
          src={image}
          alt={title}
          width={500}
          height={500}
          className="w-full h-48 object-cover"
          unoptimized
          priority
        />
        {discount && (
          <div className="absolute top-3 right-3 bg-secondary text-white text-xs font-semibold px-3 py-1 rounded-full">
            Save {discount}%
          </div>
        )}
        {isPinned && (
          <div className="absolute top-3 left-3 bg-yellow-500 text-white p-1.5 rounded-full shadow-lg">
            <Pin className="w-4 h-4 fill-current" />
          </div>
        )}
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between mb-2">
          <h3 className="text-gray-800 font-medium text-sm">{title}</h3>
          <div className="relative" ref={menuRef}>
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 cursor-pointer hover:text-gray-600"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
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

        <div className="flex items-center gap-2 mb-3">
          <span className="text-xl font-bold text-gray-900">
            ${currentPrice}
          </span>
          {originalPrice && (
            <span className="text-sm text-gray-400 line-through">
              ${originalPrice}
            </span>
          )}
        </div>

        {timeLeft && (
          <div className="flex items-center gap-1 text-secondary text-xs font-medium mb-4">
            <Clock className="w-4 h-4" />
            <span>{timeLeft}</span>
          </div>
        )}

        <div className="flex gap-2">
          <button
            onClick={() => onDetailsClick?.(id)}
            className="flex-1 bg-[#F5E6FD] text-primary font-medium text-sm py-2.5 rounded-xl hover:bg-pink-100 transition-colors"
          >
            Details
          </button>
          <button
            onClick={() => onCartClick?.(id)}
            className="flex-1 bg-[#EBC5FF] text-secondary font-medium text-sm py-2.5 rounded-xl hover:from-pink-500 hover:to-purple-500 transition-all flex items-center justify-center gap-2"
          >
            <p>{messsageIcon}</p>
            {cartCount && <span>{cartCount}</span>}
          </button>
        </div>
      </div>
    </div>
  );
};