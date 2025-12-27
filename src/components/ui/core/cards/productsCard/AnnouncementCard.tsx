/* eslint-disable no-unused-vars */
"use client";

import React, { useRef, useState,  } from "react";

import Image from "next/image";
import { Pin, Trash } from "lucide-react";

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

export const AnnouncementCard = ({

  image,
  title,
  discount,
  timeLeft,

}: ProductCardProps) => {

  const [likeCount, setLikeCount] = useState(434);
  const [isLiked, setIsLiked] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isPinned, setIsPinned] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);




const handlePin = () => {
  setIsPinned(!isPinned);
  setIsMenuOpen(false);
};

const handleRemove = () => {
  setIsMenuOpen(false);
};



  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  return (
    <div className="w-[280px] bg-gradient-to-br from-pink-50 to-purple-50 rounded-3xl shadow-md  backdrop-blur-sm z-10">
      <div className="relative p-4">
        <div className="relative rounded-2xl ">
          <Image
            src={image}
            alt={title}
            width={500}
            height={500}
            className="w-full h-40 object-cover"
            unoptimized
            priority
          />
          {discount && (
            <div className="absolute top-2 left-2 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-2.5 py-1 rounded-lg shadow-lg">
              New
            </div>
          )}
       
        </div>
      </div>

      <div className="px-4 pb-4">
        <div className="flex items-start justify-between mb-1">
          <h3 className="text-gray-900 font-semibold text-base leading-tight pr-2">
            {title}
          </h3>
          
        </div>

        <p className="text-gray-600 text-sm mb-3">{timeLeft}</p>

        <p className="text-gray-500 text-xs leading-relaxed mb-4">
          Join us for exclusive workshop, product launches, and special
          discounts!
        </p>

        <div className="flex items-center justify-between">
          <button
            onClick={handleLike}
            className="flex items-center gap-1.5 text-gray-600 hover:text-pink-500 transition-colors"
          >
            <svg
              className="w-5 h-5"
              fill={isLiked ? "currentColor" : "none"}
              stroke="currentColor"
              strokeWidth="2"
              viewBox="0 0 24 24"
            >
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z" />
            </svg>
            <span className="text-sm font-medium">{likeCount}</span>
          </button>

          <div className="relative" ref={menuRef}>
            <div
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-gray-400 cursor-pointer hover:text-gray-600 flex-shrink-0"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <circle cx="10" cy="5" r="1.5" />
                <circle cx="10" cy="10" r="1.5" />
                <circle cx="10" cy="15" r="1.5" />
              </svg>
            </div>

            {isMenuOpen && (
              <div className="absolute bottom-8 right-0 w-32 bg-black/90 rounded-lg shadow-xl z-[999] overflow-hidden backdrop-blur-sm">
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
      </div>
    </div>
  );
};
