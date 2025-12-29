"use client"


import React, { useState } from 'react';

export default function OfferManage() {
  const [selectedAction, setSelectedAction] = useState<string | null>(null);

  const handleAction = (action: string) => {
    setSelectedAction(action);
    alert(`You have chosen to ${action} the offer.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-4 md:p-8">
      <div className="max-w-2xl mx-auto">
        <div className="bg-white rounded-xl shadow-sm p-6 md:p-8">
          {/* Property Address Section */}
          <div className="mb-6">
            <h2 className="text-xl font-semibold mb-4">Property Address</h2>
            
            <div className="space-y-3">
              {/* Property Address */}
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-700">Property Address :</span>
                <span className="text-sm text-gray-600 text-right">1102 Flatline Ct, Waukesha, WI 53188, USA</span>
              </div>

              {/* Owner's Name */}
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-700">Owner's Name :</span>
                <span className="text-sm text-gray-600">Michael A</span>
              </div>

              {/* Offer Price */}
              <div className="flex justify-between items-start">
                <span className="text-sm font-medium text-gray-700">Offer Price :</span>
                <span className="text-sm font-semibold text-orange-500">$750.00.00</span>
              </div>
            </div>
          </div>

          <hr className="my-6 border-gray-200" />

          {/* Message Section */}
          <div className="bg-gray-50 rounded-lg p-6 mb-6">
            <p className="text-sm text-gray-600 text-center leading-relaxed">
              You've received a verified offer for your property. Please review the details below and choose whether to Accept, Reject or Negotiate the offer.
            </p>
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-3 gap-3">
            <button
              onClick={() => handleAction('reject')}
              className="px-4 py-3 border-2 border-red-500 text-red-500 font-medium rounded-lg hover:bg-red-50 transition-colors focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-offset-2"
            >
              Reject
            </button>
            
            <button
              onClick={() => handleAction('accept')}
              className="px-4 py-3 bg-green-600 text-white font-medium rounded-lg hover:bg-green-700 transition-colors focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            >
              Accept
            </button>
            
            <button
              onClick={() => handleAction('negotiate')}
              className="px-4 py-3 border-2 border-yellow-500 text-yellow-600 font-medium rounded-lg hover:bg-yellow-50 transition-colors focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2"
            >
              Negotiate
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

