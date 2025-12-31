"use client";

import Image from 'next/image';
import React from 'react';

// Type definitions
type OfferStatus = 'Pending' | 'Progress' | 'Approved' | 'Reject';

interface PropertyOffer {
  serialNo: string;
  address: string;
  amount: number;
  offerDate: string;
  status: OfferStatus;
  images?: string[];
}

// Reusable OfferCard Component
interface OfferCardProps {
  offer: PropertyOffer;
}

const OfferCard: React.FC<OfferCardProps> = ({ offer }) => {
  const [currentImageIndex, setCurrentImageIndex] = React.useState(0);

  const getStatusStyles = (status: OfferStatus) => {
    const styles = {
      Pending: 'bg-yellow-50 text-yellow-700 border-yellow-200',
      Progress: 'bg-orange-50 text-orange-700 border-orange-200',
      Approved: 'bg-green-50 text-green-700 border-green-200',
      Reject: 'bg-red-50 text-red-700 border-red-200',
    };
    return styles[status];
  };

  const formatAmount = (amount: number) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 0,
    }).format(amount);
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    });
  };

  const hasImages = offer.images && offer.images.length > 0;
  const currentImage = hasImages ? offer?.images?.[currentImageIndex] : null;

  const handlePrevImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) =>
        prev === 0 ? offer.images!.length - 1 : prev - 1
      );
    }
  };

  const handleNextImage = () => {
    if (hasImages) {
      setCurrentImageIndex((prev) =>
        prev === offer.images!.length - 1 ? 0 : prev + 1
      );
    }
  };

  return (
    <div className="bg-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow duration-200 overflow-hidden">
      {/* Property Image Gallery */}
      <div className="relative h-48 bg-gray-200 overflow-hidden group">
        {currentImage ? (
          <>
            <Image
              src={currentImage}
              alt={`${offer.address} - Image ${currentImageIndex + 1}`}
              className="w-full h-full object-cover"
              width={0}
              height={0}
              sizes="100vw"
              style={{ width: "100%" }}
            />
            
            {/* Navigation Arrows - Only show if multiple images */}
            {offer.images!.length > 1 && (
              <>
                <button
                  onClick={handlePrevImage}
                  className="absolute left-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  aria-label="Previous image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
                  </svg>
                </button>
                <button
                  onClick={handleNextImage}
                  className="absolute right-2 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 rounded-full p-2 opacity-0 group-hover:opacity-100 transition-opacity shadow-lg"
                  aria-label="Next image"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" />
                  </svg>
                </button>

                {/* Image Counter */}
                <div className="absolute bottom-3 left-1/2 -translate-x-1/2 bg-black/60 text-white text-xs px-2 py-1 rounded-full backdrop-blur-sm">
                  {currentImageIndex + 1} / {offer.images!.length}
                </div>

                {/* Dots Indicator */}
                <div className="absolute bottom-3 left-3 flex gap-1">
                  {offer.images!.map((_, index) => (
                    <button
                      key={index}
                      onClick={() => setCurrentImageIndex(index)}
                      className={`w-1.5 h-1.5 rounded-full transition-all ${
                        index === currentImageIndex
                          ? 'bg-white w-4'
                          : 'bg-white/50 hover:bg-white/75'
                      }`}
                      aria-label={`Go to image ${index + 1}`}
                    />
                  ))}
                </div>
              </>
            )}
          </>
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200">
            <svg
              className="w-16 h-16 text-gray-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
              />
            </svg>
          </div>
        )}
        <span
          className={`absolute top-3 right-3 px-3 py-1 rounded-full text-xs font-medium border backdrop-blur-sm ${getStatusStyles(
            offer.status
          )}`}
        >
          {offer.status}
        </span>
      </div>

      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex-1">
            <span className="text-sm font-medium text-gray-500 mb-2 block">
              {offer.serialNo}
            </span>
            <h3 className="text-lg font-semibold text-gray-900 mb-1">
              {offer.address}
            </h3>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <p className="text-sm text-gray-500 mb-1">Amount</p>
            <p className="text-xl font-bold text-gray-900">
              {formatAmount(offer.amount)}
            </p>
          </div>
          <div>
            <p className="text-sm text-gray-500 mb-1">Offer Date</p>
            <p className="text-lg font-semibold text-gray-700">
              {formatDate(offer.offerDate)}
            </p>
          </div>
        </div>
      </div>

      {/* <div className="px-6 py-3 bg-gray-50 border-t border-gray-100 flex gap-2">
        <button className="flex-1 px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors">
          View Details
        </button>
        <button className="flex-1 px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors">
          Take Action
        </button>
      </div> */}
    </div>
  );
};

// Main component with sample data
const MyOfferList: React.FC = () => {
  const offers: PropertyOffer[] = [
    {
      serialNo: '#1025',
      address: 'W 13th St, New York, NY 10011',
      amount: 7000000,
      offerDate: '2025-06-10',
      status: 'Pending',
      images: [
        'https://images.unsplash.com/photo-1560448204-e02f11c3d0e2?w=800&q=80',
        'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&q=80',
        'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&q=80',
      ],
    },
    {
      serialNo: '#1025',
      address: 'W 13th St, New York, NY 10011',
      amount: 7000000,
      offerDate: '2025-06-10',
      status: 'Progress',
      images: [
        'https://images.unsplash.com/photo-1580587771525-78b9dba3b914?w=800&q=80',
        'https://images.unsplash.com/photo-1600607687939-ce8a6c25118c?w=800&q=80',
      ],
    },
    {
      serialNo: '#1025',
      address: 'W 13th St, New York, NY 10011',
      amount: 7000000,
      offerDate: '2025-06-10',
      status: 'Approved',
      images: [
        'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&q=80',
        'https://images.unsplash.com/photo-1600566753190-17f0baa2a6c3?w=800&q=80',
        'https://images.unsplash.com/photo-1600573472591-ee6b68d14c68?w=800&q=80',
        'https://images.unsplash.com/photo-1600607687644-c7171b42498f?w=800&q=80',
      ],
    },
    {
      serialNo: '#1025',
      address: 'W 13th St, New York, NY 10011',
      amount: 7000000,
      offerDate: '2025-06-10',
      status: 'Reject',
    },
  ];

  return (
    <div className="min-h-screen  ">
      <div className="max-w-7xl mx-auto">
        {/* <div className="mb-6">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Property Offers
          </h1>
          <p className="text-gray-600">
            Manage and track your property offers
          </p>
        </div> */}

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer, index) => (
            <OfferCard key={index} offer={offer} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MyOfferList;