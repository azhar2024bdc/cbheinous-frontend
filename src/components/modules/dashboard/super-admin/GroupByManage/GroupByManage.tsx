/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { ProductCard } from "@/components/ui/core/cards/productsCard/productsCard";
import { ReplyModal } from "@/components/ui/core/Modals/ReplyModal";
import { ConfigProvider, Divider } from "antd";
import { Clock } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import React from "react";
import { toast } from "sonner";

const GroupByManage = () => {
  const [activeTab, setActiveTab] = React.useState(0);
  const [id, setId] = React.useState("");
  const [isReplyModalOpen, setIsReplyModalOpen] = React.useState(false);
  const [commnetId, setCommentId] = React.useState(0);
  const products = [
    {
      id: "1",
      image:
        "https://images.unsplash.com/photo-1620916566398-39f1143ab7be?w=400&h=300&fit=crop",
      title: "Vitamin C Serum",
      currentPrice: 46,
      originalPrice: 46,
      discount: 40,
      timeLeft: "0d 4h 46m",
      cartCount: 34,
    },
    {
      id: "2",
      image:
        "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=400&h=300&fit=crop",
      title: "Vitamin C Serum",
      currentPrice: 46,
      originalPrice: 46,
      discount: 40,
      timeLeft: "0d 4h 46m",
      cartCount: 34,
    },
  ];

  const comments = [
    {
      id: 1,
      user: "Admin",
      timestamp: "2m",
      text: "Great product! Limited stock available.",
      likes: 5,
      avatar: "A",
    },
    {
      id: 2,
      user: "Admin",
      timestamp: "5m",
      text: "Don't miss out on this amazing deal!",
      likes: 3,
      avatar: "A",
    },
    {
      id: 3,
      user: "Rifat Hadi",
      timestamp: "10m",
      text: "Really excited about this product. Can't wait to get it!",
      likes: 8,
      avatar: "R",
    },
    {
      id: 4,
      user: "Admin",
      timestamp: "15m",
      text: "Thanks for your interest! Hurry up, only few spots left.",
      likes: 2,
      avatar: "A",
    },
    {
      id: 5,
      user: "Rifat Hadi",
      timestamp: "20m",
      text: "Just joined the group buy. Looking forward to it!",
      likes: 6,
      avatar: "R",
    },
    {
      id: 6,
      user: "Sarah Chen",
      timestamp: "25m",
      text: "The quality looks amazing from the pictures. Has anyone received this before?",
      likes: 4,
      avatar: "S",
    },
    {
      id: 7,
      user: "Admin",
      timestamp: "30m",
      text: "Welcome everyone! This is a high-quality product with excellent reviews.",
      likes: 10,
      avatar: "A",
    },
    {
      id: 8,
      user: "Mike Johnson",
      timestamp: "35m",
      text: "How long until the group buy closes?",
      likes: 2,
      avatar: "M",
    },
    {
      id: 9,
      user: "Admin",
      timestamp: "40m",
      text: "Check the timer at the top! Act fast to secure your spot.",
      likes: 3,
      avatar: "A",
    },
    {
      id: 10,
      user: "Emma Wilson",
      timestamp: "45m",
      text: "This is such a good deal! Already told my friends about it.",
      likes: 7,
      avatar: "E",
    },
  ];

  const handleShowDetails = (id: string) => {
    setActiveTab(2);
    setId(id);
  };

  const handleShowComments = (id: string) => {
    setActiveTab(1);
    setId(id);
  };

  const handleLike = (commentId: number) => {
    // Handle like logic here
  };

  const handleReply = (commentId: number) => {
    // Handle reply logic here
    setIsReplyModalOpen(true);
    setCommentId(commentId);
  };

  const handleCommentSubmit = (id: string, comment: string) => {
    toast.success(id + " " + comment);
  };

  return (
    <div>
      <div className="">
        <div className="flex items-center justify-between">
          <div className="">
            <h2 className="text-[32px] font-semibold">Group By Manage</h2>
            <p>Manage Active Group Deals and Participants</p>
          </div>
          <Link
            className="bg-primary text-white font-semibold rounded-full h-10 flex justify-center items-center px-3"
            href={"/dashboard/super-admin/group-buy-management/create-new"}
          >
            <button className="">Create Group Buy</button>
          </Link>
        </div>

        <div className="flex gap-2 mt-10 ">
          <div className="flex-1 max-h-[600px] overflow-y-auto">
            <div className="flex flex-wrap max-w-full gap-x-4">
              {products.map((product) => (
                <ProductCard
                  key={product.id}
                  {...product}
                  onCartClick={handleShowComments}
                  onDetailsClick={handleShowDetails}
                />
              ))}
            </div>
          </div>

          {activeTab === 1 && (
            <div className="flex-1 max-h-[600px] overflow-y-auto">
              <Image
                src={products[Number(id) - 1].image}
                alt={products[Number(id) - 1].title}
                width={500}
                height={500}
                className="w-full h-48 object-cover rounded-lg"
                unoptimized
                priority
              />

              <div className="mt-4 flex items-center gap-1 text-secondary text-xs font-medium mb-4">
                <Clock className="w-4 h-4" />
                <span>{products[Number(id) - 1].timeLeft}</span>
              </div>

              <div className="border-t-[1px] border-secondary"></div>

              <div className="flex items-center my-3 gap-x-3">
                <div>
                  <h6 className="text-[16px] font-normal">Original Price</h6>
                  <p className="line-through text-gray-500">
                    ${products[Number(id) - 1].originalPrice}
                  </p>
                </div>

                <ConfigProvider
                  theme={{
                    components: {
                      Divider: {
                        colorSplit: "#e85385",
                      },
                    },
                  }}
                >
                  <Divider type="vertical" className="h-7" />
                </ConfigProvider>

                <div>
                  <h6 className="text-[16px] font-normal">Group buy price</h6>
                  <p className="text-secondary font-semibold">
                    ${products[Number(id) - 1].currentPrice}
                  </p>
                </div>
              </div>

              <div className="border-t-[1px] border-secondary"></div>

              <div className="mt-4 space-y-4">
                <h3 className="text-lg font-semibold">Comments</h3>

                <div className="space-y-3 ">
                  {comments.map((comment) => (
                    <div
                      key={comment.id}
                      className="flex gap-3 p-3 bg-gray-50 rounded-lg"
                    >
                      <div className="w-10 h-10 rounded-full bg-secondary flex items-center justify-center text-white font-semibold flex-shrink-0">
                        {comment.user.charAt(0).toUpperCase()}
                      </div>

                      <div className="flex-1">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-medium text-sm">
                            {comment.user}
                          </span>
                          <span className="text-xs text-gray-500">
                            {comment.timestamp}
                          </span>
                        </div>
                        <p className="text-sm text-gray-700">{comment.text}</p>

                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => handleLike(comment.id)}
                            className="text-xs text-gray-500 hover:text-secondary"
                          >
                            Like
                          </button>
                          <button
                            onClick={() => handleReply(comment.id)}
                            className="text-xs text-gray-500 hover:text-secondary"
                          >
                            Reply
                          </button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          )}

          {/* Product Comments */}
          {activeTab === 2 && (
            <div className="flex-1 max-h-[600px] overflow-y-auto">
              <div className=" border-b border-gray-200">
                <div className=" mx-auto  py-3 flex items-center justify-start gap-8 text-sm">
                  <div>
                    <span className="text-purple-600 font-medium">234</span>
                    <span className="text-purple-600 ml-1">
                      Click to Catalog links
                    </span>
                  </div>
                  <div>
                    <span className="text-purple-600 font-medium">32</span>
                    <span className="text-purple-600 ml-1">
                      Click to Submit Order
                    </span>
                  </div>
                  <div>
                    <span className="text-purple-600 font-medium">432</span>
                    <span className="text-purple-600 ml-1">
                      People joined to Chat
                    </span>
                  </div>
                </div>
              </div>

              {/* Main Content */}
              <div className=" mx-auto  py-6">
                <div className="">
                  <div className="">
                    <h1 className="text-2xl font-semibold text-gray-900 mb-4">
                      Group Buy
                    </h1>

                    <p className="text-gray-700 text-sm leading-relaxed mb-6">
                      Discover the secrets of radiant, glass-like skin through
                      the 10-Step Korean Skincare Routine. This step-by-step
                      guide helps you understand how to properly layer and apply
                      skincare products for the best results. From gentle
                      cleansing to deep hydration, each step is designed to
                      nourish, protect, and rejuvenate your skin. Learn how
                      consistent care, quality ingredients, and mindful
                      application can transform your daily routine into a
                      self-care ritual that brings lasting glow and confidence.
                    </p>

                    <div className="mb-4">
                      <h2 className="text-base font-semibold text-gray-900 mb-3">
                        Key Feature
                      </h2>

                      <div className="space-y-1 text-sm text-gray-700">
                        <div>Argon oil infused</div>
                        <div>Repairs split ends</div>
                        <div>Intense moisture</div>
                        <div>Salon quality</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      <ReplyModal
        id={commnetId}
        isOpen={isReplyModalOpen}
        onClose={() => setIsReplyModalOpen(false)}
        onSubmit={handleCommentSubmit}
      />
    </div>
  );
};

export default GroupByManage;
