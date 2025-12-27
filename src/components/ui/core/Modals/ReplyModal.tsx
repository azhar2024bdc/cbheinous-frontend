/* eslint-disable no-unused-vars */
"use client";

import React, { useState } from "react";
import { X } from "lucide-react";

interface ReplyModalProps {
  id: string | number;
  isOpen: boolean;
  onClose: () => void;
  onSubmit?: (id: string, reply: string) => void;
}

export const ReplyModal = ({
  id,
  isOpen,
  onClose,
  onSubmit,
}: ReplyModalProps) => {
  const [reply, setReply] = useState("");

  const handleSubmit = () => {
    if (reply.trim()) {
      onSubmit?.(id as string, reply);
      setReply("");
      onClose();
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && e.ctrlKey) {
      handleSubmit();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md mx-4">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-xl font-semibold text-gray-800">
            Reply to ID: {id}
          </h2>
          <button
            onClick={onClose}
            className="text-gray-500 hover:text-gray-700 transition-colors"
          >
            <X size={24} />
          </button>
        </div>

        <div className="p-4">
          <div className="mb-4">
            <label
              htmlFor="reply"
              className="block text-sm font-medium text-gray-700 mb-2"
            >
              Your Reply
            </label>
            <textarea
              id="reply"
              value={reply}
              onChange={(e) => setReply(e.target.value)}
              onKeyDown={handleKeyDown}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-none"
              rows={4}
              placeholder="Type your reply here... (Ctrl+Enter to submit)"
              autoFocus
            />
          </div>

          <div className="flex justify-end gap-2">
            <button
              onClick={onClose}
              className="px-4 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 transition-colors"
            >
              Cancel
            </button>
            <button
              onClick={handleSubmit}
              disabled={!reply.trim()}
              className="px-4 py-2 text-white bg-primary rounded-lg hover:bg-primary/50 disabled:opacity-55 disabled:cursor-not-allowed transition-colors"
            >
              Send Reply
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
