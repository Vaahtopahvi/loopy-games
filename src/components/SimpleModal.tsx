import React from "react";
import { X } from "lucide-react";

interface SimpleModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

export function SimpleModal({ isOpen, onClose, children, title }: SimpleModalProps) {
  if (!isOpen) return null;

  return (
    <>
      {/* darken the background */}
      <div
        className="fixed inset-0 bg-black/50 z-40"
      />

      {/* modal itself */}
      <div className="fixed inset-0 flex items-center justify-center z-50 p-4" onClick={onClose}>
        <div className="bg-gray-900 rounded-lg shadow-xl max-w-md w-full relative" onClick={(e) => e.stopPropagation()}>
          {/* close button position */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-400 hover:text-white transition"
          >
            <X size={24} />
          </button>

          {/* content */}
          <div className="p-6">
            {title && (
              <h2 className="text-2xl font-bold text-white mb-4">{title}</h2>
            )}
            {children}
          </div>
        </div>
      </div>
    </>
  );
}
