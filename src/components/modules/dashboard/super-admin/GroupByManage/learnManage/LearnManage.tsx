/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable no-unused-vars */
"use client";

import { LearnCard } from "@/components/ui/core/cards/productsCard/LearnCard";

import { ReplyModal } from "@/components/ui/core/Modals/ReplyModal";
import { ConfigProvider, Divider } from "antd";
import { Clock } from "lucide-react";
import Image from "next/image";

import React from "react";
import { toast } from "sonner";

const LearnManage = () => {
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
    {
      id: "3",
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
      id: "4",
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
    setId(id);
  };

  const handleShowComments = (id: string) => {
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
        <h2 className="text-[32px] font-semibold">Group By Manage</h2>
        <p>Manage Active Group Deals and Participants</p>

        <div className="flex gap-2 mt-10 ">
          <div className="flex-1 max-h-[600px] overflow-y-auto">
            <div className="space-y-3 max-w-full gap-x-4">
              {products.map((product) => (
                <LearnCard
                  key={product.id}
                  {...product}
                  onCartClick={handleShowComments}
                  onDetailsClick={handleShowDetails}
                />
              ))}
            </div>
          </div>

          <div className="flex-1 max-h-[600px] overflow-y-auto">
            {id && (
              <>
                <Image
                  src={products[Number(id) - 1].image}
                  alt={products[Number(id) - 1].title}
                  width={500}
                  height={500}
                  className="w-full  object-contain rounded-lg"
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
                          <p className="text-sm text-gray-700">
                            {comment.text}
                          </p>

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
              </>
            )}
          </div>

       
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

export default LearnManage;
