"use client";

import { AnnouncementCard } from "@/components/ui/core/cards/productsCard/AnnouncementCard";

import { Heart, MessageCircle } from "lucide-react";
import Image from "next/image";

import React from "react";

const AnnounceManage = () => {
  const [selectedProduct, setSelectedProduct] = React.useState<string | null>("0");

  const products = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop",
      title: "Summer Beauty Festival 2025",
      currentPrice: 46,
      originalPrice: 46,
      discount: 40,
      timeLeft: "October 25-27, 2025",
      cartCount: 34,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
      title: "Summer Beauty Festival 2026",
      currentPrice: 46,
      originalPrice: 46,
      discount: 40,
      timeLeft: "October 25-27, 2025",
      cartCount: 34,
    },
    {
      id: "3",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop",
      title: "Summer Beauty Festival 2027",
      currentPrice: 46,
      originalPrice: 46,
      discount: 40,
      timeLeft: "October 25-27, 2025",
      cartCount: 34,
    },
    {
      id: "4",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
      title: "Summer Beauty Festival 2028",
      currentPrice: 46,
      originalPrice: 46,
      discount: 40,
      timeLeft: "October 25-27, 2025",
      cartCount: 34,
    },
    {
      id: "5",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop",
      title: "Summer Beauty Festival 2029",
      currentPrice: 46,
      originalPrice: 46,
      discount: 40,
      timeLeft: "October 25-27, 2025",
      cartCount: 34,
    },
    {
      id: "6",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
      title: "Summer Beauty Festival 2025",
      currentPrice: 46,
      originalPrice: 46,
      discount: 40,
      timeLeft: "October 25-27, 2025",
      cartCount: 34,
    },
    {
      id: "7",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop",
      title: "Summer Beauty Festival 2025",
      currentPrice: 46,
      originalPrice: 46,
      discount: 40,
      timeLeft: "October 25-27, 2025",
      cartCount: 34,
    },
    {
      id: "8",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
      title: "Summer Beauty Festival 2025",
      currentPrice: 46,
      originalPrice: 46,
      discount: 40,
      timeLeft: "October 25-27, 2025",
      cartCount: 34,
    },
  ];

  const handleCardClick = (id: string) => {
    setSelectedProduct(id);
  };

  const selectedProductData = products.find((p) => p.id === selectedProduct);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className=" p-6">
        <div className="mb-8">
          <h2 className="text-[32px] font-semibold text-gray-900">Group By Manage</h2>
          <p className="text-gray-600">Manage Active Group Deals and Participants</p>
        </div>

        <div className="flex gap-6">
          {/* Left side - Card Grid */}
          <div className="flex-1">
            <div className="flex flex-wrap gap-4 max-h-[calc(100vh-200px)] overflow-y-auto pr-2">
              {products.map((product) => (
                <div 
                  key={product.id}
                  onClick={() => handleCardClick(product.id)}
                  className="cursor-pointer"
                >
                  <AnnouncementCard
                    {...product}
                    onCartClick={handleCardClick}
                    onDetailsClick={handleCardClick}
                  />
                </div>
              ))}
            </div>
          </div>

          {/* Right side - Product Details */}
          {selectedProductData && (
            <div className="w-[500px] bg-white rounded-2xl shadow-lg p-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {/* Header Image */}
              <div className="relative mb-6">
                <Image
                  src={selectedProductData.image}
                  alt={selectedProductData.title}
                  width={500}
                  height={300}
                  className="w-full h-64 object-cover rounded-xl"
                  unoptimized
                  priority
                />
                <div className="absolute top-3 left-3 bg-gradient-to-r from-purple-500 to-pink-500 text-white text-xs font-bold px-3 py-1 rounded-lg shadow-lg">
                  New
                </div>
              </div>

              {/* Title */}
              <h2 className="text-2xl font-bold text-gray-900 mb-2">
                {selectedProductData.title}
              </h2>

              {/* Date */}
              <p className="text-gray-600 text-sm mb-4">
                {selectedProductData.timeLeft}
              </p>

              {/* Description */}
              <p className="text-gray-700 text-sm leading-relaxed mb-6">
                Discover the secrets of radiant, glass-like skin through the 10-Step Korean Skincare 
                Routine. This step-by-step guide helps you understand how to properly layer and apply 
                skincare products for the best results. From gentle cleansing to deep hydration, each 
                step is designed to nourish, protect, and rejuvenate your skin.
              </p>

              {/* Stats */}
              <div className="border-t border-b border-gray-200 py-4 mb-6">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <Heart className="w-5 h-5 text-pink-500" />
                    <span className="font-semibold text-gray-900">434</span>
                    <span className="text-gray-600">Liked</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MessageCircle className="w-5 h-5 text-purple-500" />
                    <span className="font-semibold text-gray-900">234</span>
                    <span className="text-gray-600">Interested</span>
                  </div>
                </div>
              </div>

              {/* Key Features */}
              <div className="mb-6">
                <h3 className="text-lg font-semibold text-gray-900 mb-3">
                  Event Highlights
                </h3>
                <div className="space-y-2 text-sm text-gray-700">
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Exclusive workshop sessions with beauty experts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Product launches and special discounts</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Interactive skincare demonstrations</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <span className="text-purple-500 mt-1">•</span>
                    <span>Networking with beauty enthusiasts</span>
                  </div>
                </div>
              </div>

      
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AnnounceManage;