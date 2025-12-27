"use client";

import React, { useState } from "react";
import { AlertTriangle, Info, CheckCircle, XCircle, X } from "lucide-react";

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => Promise<void>;
  title?: string;
  message?: string;
  confirmText?: string;
  cancelText?: string;
  variant?: "default" | "danger" | "warning";
  showIcon?: boolean;
  confirmButtonVariant?: "primary" | "danger" | "success" | "warning";
  size?: "sm" | "md" | "lg";
  preventClose?: boolean;
}

export const ConfirmModal = ({
  isOpen,
  onClose,
  onConfirm,
  title = "Confirm Action",
  message = "Are you sure you want to proceed?",
  confirmText = "Confirm",
  cancelText = "Cancel",
  variant = "default",
  showIcon = true,
  confirmButtonVariant = "primary",
  size = "md",
  preventClose = false,
}: ConfirmModalProps) => {
  const [isLoading, setIsLoading] = useState(false);

  if (!isOpen) return null;

  const handleConfirm = async () => {
    setIsLoading(true);
    try {
      await onConfirm();
      onClose();
    } catch (error) {
      console.error("Confirmation error:", error);
    } finally {
      setIsLoading(false);
    }
  };

  //   const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
  //     if (e.target === e.currentTarget && !preventClose) {
  //       onClose();
  //     }
  //   };

  const variants = {
    default: { icon: Info, color: "text-blue-500", bg: "bg-blue-50" },
    danger: { icon: AlertTriangle, color: "text-red-500", bg: "bg-red-50" },
    warning: {
      icon: AlertTriangle,
      color: "text-yellow-500",
      bg: "bg-yellow-50",
    },
    success: { icon: CheckCircle, color: "text-green-500", bg: "bg-green-50" },
    error: { icon: XCircle, color: "text-red-500", bg: "bg-red-50" },
  };

  const sizes = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
    xl: "max-w-xl",
  };

  const buttonVariants = {
    primary: "bg-blue-600 hover:bg-blue-700 text-white",
    danger: "bg-red-600 hover:bg-red-700 text-white",
    success: "bg-green-600 hover:bg-green-700 text-white",
    warning: "bg-yellow-600 hover:bg-yellow-700 text-white",
  };

  const Icon = variants[variant].icon;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50 p-4"
      //   onClick={handleBackdropClick}
    >
      <div
        className={`bg-white rounded-lg shadow-xl w-full ${sizes[size]} transform transition-all`}
      >
        {/* Header */}
        <div className="flex items-start justify-between p-6 border-b">
          <div className="flex items-center gap-3">
            {showIcon && (
              <div className={`p-2 rounded-full ${variants[variant].bg}`}>
                <Icon className={`w-6 h-6 ${variants[variant].color}`} />
              </div>
            )}
            <h3 className="text-lg font-semibold text-gray-900">{title}</h3>
          </div>
          {!preventClose && (
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-gray-600 transition-colors"
              disabled={isLoading}
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>

        {/* Body */}
        <div className="p-6">
          <p className="text-gray-600">{message}</p>
        </div>

        {/* Footer */}
        <div className="flex justify-end gap-3 p-6 border-t bg-gray-50">
          <button
            onClick={onClose}
            disabled={isLoading}
            className="px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {cancelText}
          </button>
          <button
            onClick={handleConfirm}
            disabled={isLoading}
            className={`px-4 py-2 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${buttonVariants[confirmButtonVariant]}   `}
          >
            {isLoading ? "Processing..." : confirmText}
          </button>
        </div>
      </div>
    </div>
  );
};

// // Demo Component
// export default function App() {
//   const [modals, setModals] = useState({
//     default: false,
//     danger: false,
//     warning: false,
//     success: false,
//     preventClose: false,
//   });

//   const openModal = (type) => setModals({ ...modals, [type]: true });
//   const closeModal = (type) => setModals({ ...modals, [type]: false });

//   const handleConfirm = (action) => {
//     return new Promise((resolve) => {
//       setTimeout(() => {
//         alert(`${action} confirmed!`);
//         resolve();
//       }, 500);
//     });
//   };

//   return (
//     <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 p-8">
//       <div className="max-w-4xl mx-auto">
//         <div className="text-center mb-12">
//           <h1 className="text-4xl font-bold text-gray-900 mb-2">
//             Reusable Confirmation Modal
//           </h1>
//           <p className="text-gray-600">
//             A flexible modal component with multiple variants and customization options
//           </p>
//         </div>

//         <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//           <button
//             onClick={() => openModal('default')}
//             className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-blue-200"
//           >
//             <div className="flex items-center gap-3 mb-2">
//               <Info className="w-5 h-5 text-blue-500" />
//               <h3 className="font-semibold text-gray-900">Default Modal</h3>
//             </div>
//             <p className="text-sm text-gray-600">Standard confirmation dialog</p>
//           </button>

//           <button
//             onClick={() => openModal('danger')}
//             className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-red-200"
//           >
//             <div className="flex items-center gap-3 mb-2">
//               <AlertTriangle className="w-5 h-5 text-red-500" />
//               <h3 className="font-semibold text-gray-900">Danger Modal</h3>
//             </div>
//             <p className="text-sm text-gray-600">For destructive actions</p>
//           </button>

//           <button
//             onClick={() => openModal('warning')}
//             className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-yellow-200"
//           >
//             <div className="flex items-center gap-3 mb-2">
//               <AlertTriangle className="w-5 h-5 text-yellow-500" />
//               <h3 className="font-semibold text-gray-900">Warning Modal</h3>
//             </div>
//             <p className="text-sm text-gray-600">For cautionary messages</p>
//           </button>

//           <button
//             onClick={() => openModal('success')}
//             className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-green-200"
//           >
//             <div className="flex items-center gap-3 mb-2">
//               <CheckCircle className="w-5 h-5 text-green-500" />
//               <h3 className="font-semibold text-gray-900">Success Modal</h3>
//             </div>
//             <p className="text-sm text-gray-600">For successful confirmations</p>
//           </button>

//           <button
//             onClick={() => openModal('preventClose')}
//             className="p-6 bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow border-2 border-purple-200 md:col-span-2"
//           >
//             <div className="flex items-center gap-3 mb-2">
//               <XCircle className="w-5 h-5 text-purple-500" />
//               <h3 className="font-semibold text-gray-900">Forced Action Modal</h3>
//             </div>
//             <p className="text-sm text-gray-600">Modal that prevents closing without action</p>
//           </button>
//         </div>

//         {/* Usage Example */}
//         <div className="mt-12 p-6 bg-white rounded-lg shadow-md">
//           <h2 className="text-xl font-semibold mb-4 text-gray-900">Usage Example</h2>
//           <pre className="bg-gray-50 p-4 rounded text-sm overflow-x-auto">
// {`<ConfirmModal
//   isOpen={showModal}
//   onClose={() => setShowModal(false)}
//   onConfirm={handleConfirm}
//   title="Delete Item"
//   message="Are you sure you want to delete this item?"
//   confirmText="Delete"
//   cancelText="Cancel"
//   variant="danger"
//   confirmButtonVariant="danger"
//   size="md"
//   showIcon={true}
//   preventClose={false}
// />`}
//           </pre>
//         </div>
//       </div>

//       {/* Modals */}
//       <ConfirmModal
//         isOpen={modals.default}
//         onClose={() => closeModal('default')}
//         onConfirm={() => handleConfirm('Default action')}
//         title="Confirm Action"
//         message="Are you sure you want to proceed with this action?"
//       />

//       <ConfirmModal
//         isOpen={modals.danger}
//         onClose={() => closeModal('danger')}
//         onConfirm={() => handleConfirm('Delete')}
//         title="Delete Item"
//         message="This action cannot be undone. Are you sure you want to delete this item?"
//         confirmText="Delete"
//         variant="danger"
//         confirmButtonVariant="danger"
//       />

//       <ConfirmModal
//         isOpen={modals.warning}
//         onClose={() => closeModal('warning')}
//         onConfirm={() => handleConfirm('Warning acknowledged')}
//         title="Warning"
//         message="This action may have unexpected consequences. Please review before proceeding."
//         confirmText="Proceed"
//         variant="warning"
//         confirmButtonVariant="warning"
//       />

//       <ConfirmModal
//         isOpen={modals.success}
//         onClose={() => closeModal('success')}
//         onConfirm={() => handleConfirm('Success')}
//         title="Complete Action"
//         message="Everything looks good! Click confirm to complete this action."
//         confirmText="Complete"
//         variant="success"
//         confirmButtonVariant="success"
//       />

//       <ConfirmModal
//         isOpen={modals.preventClose}
//         onClose={() => closeModal('preventClose')}
//         onConfirm={() => handleConfirm('Forced action')}
//         title="Action Required"
//         message="You must confirm or cancel this action. Clicking outside won't close this modal."
//         confirmText="I Understand"
//         variant="error"
//         confirmButtonVariant="danger"
//         preventClose={true}
//       />
//     </div>
//   );
// }
