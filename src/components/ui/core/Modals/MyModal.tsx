"use client";

import React from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  className?: string;
  height?: string;
}

function MyModal({ isOpen, children, className, height }: ModalProps) {
  if (!isOpen) return null;

  return (
    <div className={`fixed inset-0 z-50 flex items-center justify-center ${className}`}>
      {/* Mask is decorative only — no onClick handler */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm pointer-events-auto" />

      {/* Modal content is above the mask */}
      <div
        className={`relative bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-4 ${height} overflow-y-auto p-6 transition-all duration-200 z-10`}
        // no stopPropagation needed because mask has no click handler
      >
        {children}
        {/* Example close button (call onClose explicitly if you want a close control) */}
        {/* <button onClick={onClose} className="mt-4 px-4 py-2 rounded bg-gray-100">Close</button> */}
      </div>
    </div>
  );
}

export default MyModal;
