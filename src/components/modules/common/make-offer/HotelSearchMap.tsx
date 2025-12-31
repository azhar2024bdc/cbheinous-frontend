"use client";

import React, { useState, useEffect, useRef } from 'react';
import { X, ChevronLeft, ChevronRight, MapPin, Star, Loader } from 'lucide-react';
import Image from 'next/image';

// Type definitions
interface Hotel {
  id: string;
  name: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  price: string;
  photos: any[];
  place_id: string;
  images?: string[];
  phone?: string;
  website?: string;
  fullAddress?: string;
}

interface HotelSearchMapProps {
  searchQuery: string;
  apiKey: string;
  className?: string;
}

const HotelSearchMap: React.FC<HotelSearchMapProps> = ({ searchQuery, apiKey,className }) => {
  const [selectedHotel, setSelectedHotel] = useState<Hotel | null>(null);
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0);
  const [map, setMap] = useState<any>(null);
  const [markers, setMarkers] = useState<any[]>([]);
  const [hotels, setHotels] = useState<Hotel[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [placesService, setPlacesService] = useState<any>(null);
  const mapRef = useRef<HTMLDivElement>(null);

  // Load Google Maps script
  useEffect(() => {
    if (!(window as any).google) {
      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${apiKey}&libraries=places`;
      script.async = true;
      script.defer = true;
      script.onload = initMap;
      document.head.appendChild(script);
    } else {
      initMap();
    }
  }, [apiKey]);

  // Trigger search when searchQuery prop changes
  useEffect(() => {
    if (searchQuery && searchQuery.trim() && map) {
      handleSearch();
    }
  }, [searchQuery]);

  const initMap = (): void => {
    if (!(window as any).google || !mapRef.current) return;

    const google = (window as any).google;
    const mapInstance = new google.maps.Map(mapRef.current, {
      center: { lat: 34.0522, lng: -118.2437 },
      zoom: 12,
      styles: [
        {
          featureType: 'poi',
          elementType: 'labels',
          stylers: [{ visibility: 'off' }]
        }
      ]
    });

    setMap(mapInstance);
    const service = new google.maps.places.PlacesService(mapInstance);
    setPlacesService(service);
  };

  const searchNearbyHotels = (location: any): void => {
    if (!placesService) return;

    setLoading(true);
    const request = {
      location: location,
      radius: 5000, // 5km radius
      type: 'lodging',
      keyword: 'hotel'
    };

    placesService.nearbySearch(
      request, 
      (results: any[] | null, status: string) => {
        const google = (window as any).google;
        if (status === google.maps.places.PlacesServiceStatus.OK && results) {
          const hotelData: Hotel[] = results.slice(0, 10).map((place: any) => ({
            id: place.place_id || '',
            name: place.name || 'Unknown Hotel',
            address: place.vicinity || 'Address not available',
            lat: place.geometry?.location?.lat() || 0,
            lng: place.geometry?.location?.lng() || 0,
            rating: place.rating || 0,
            price: place.price_level ? '$'.repeat(place.price_level) : 'N/A',
            photos: place.photos || [],
            place_id: place.place_id || ''
          }));
          
          setHotels(hotelData);
          addMarkers(hotelData);
          setLoading(false);
        } else {
          console.error('Places search failed:', status);
          setLoading(false);
        }
      }
    );
  };

  const getHotelDetails = (placeId: string): void => {
    if (!placesService) return;

    const request = {
      placeId: placeId,
      fields: ['name', 'formatted_address', 'formatted_phone_number', 'website', 'photos', 'rating', 'reviews', 'price_level']
    };

    placesService.getDetails(
      request, 
      (place: any | null, status: string) => {
        const google = (window as any).google;
        if (status === google.maps.places.PlacesServiceStatus.OK && place) {
          const images: string[] = place.photos 
            ? place.photos.slice(0, 5).map((photo: any) => photo.getUrl({ maxWidth: 800, maxHeight: 600 }))
            : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'];

          setSelectedHotel(prev => prev ? {
            ...prev,
            images: images,
            phone: place.formatted_phone_number,
            website: place.website,
            fullAddress: place.formatted_address
          } : null);
        }
      }
    );
  };

  const addMarkers = (hotelData: Hotel[]): void => {
    if (!map) return;

    const google = (window as any).google;

    // Clear existing markers
    markers.forEach(marker => marker.setMap(null));

    const newMarkers: any[] = hotelData.map(hotel => {
      const marker = new google.maps.Marker({
        position: { lat: hotel.lat, lng: hotel.lng },
        map: map,
        title: hotel.name,
        icon: {
          url: 'data:image/svg+xml;charset=UTF-8,' + encodeURIComponent(`
            <svg width="32" height="42" viewBox="0 0 32 42" xmlns="http://www.w3.org/2000/svg">
              <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 26 16 26s16-14 16-26c0-8.837-7.163-16-16-16z" fill="#EF4444"/>
              <circle cx="16" cy="16" r="6" fill="white"/>
            </svg>
          `),
          scaledSize: new google.maps.Size(32, 42)
        }
      });

      marker.addListener('click', () => {
        const hotelWithImages: Hotel = {
          ...hotel,
          images: hotel.photos.length > 0 
            ? hotel.photos.slice(0, 5).map((photo: any) => photo.getUrl({ maxWidth: 800, maxHeight: 600 }))
            : ['https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800']
        };
        setSelectedHotel(hotelWithImages);
        setCurrentImageIndex(0);
        
        // Get more details
        getHotelDetails(hotel.place_id);
      });

      return marker;
    });

    setMarkers(newMarkers);
  };

  const handleSearch = (): void => {
    if (!searchQuery.trim() || !(window as any).google || !map) return;

    setLoading(true);
    const google = (window as any).google;
    const geocoder = new google.maps.Geocoder();
    
    geocoder.geocode(
      { address: searchQuery }, 
      (results: any[] | null, status: string) => {
        if (status === 'OK' && results && results[0]) {
          const location = results[0].geometry.location;
          map.setCenter(location);
          map.setZoom(13);
          
          // Search for nearby hotels
          searchNearbyHotels(location);
        } else {
          setLoading(false);
        }
      }
    );
  };

  const nextImage = (): void => {
    if (selectedHotel && selectedHotel.images) {
      setCurrentImageIndex((prev) => 
        (prev + 1) % selectedHotel.images!.length
      );
    }
  };

  const prevImage = (): void => {
    if (selectedHotel && selectedHotel.images) {
      setCurrentImageIndex((prev) => 
        prev === 0 ? selectedHotel.images!.length - 1 : prev - 1
      );
    }
  };

  return (
    <div className={`relative w-full ${className}`}>
      {/* Loading Indicator */}
      {loading && (
        <div className="absolute top-4 left-1/2 -translate-x-1/2 z-10 bg-white px-6 py-3 rounded-lg shadow-lg flex items-center gap-3">
          <Loader className="w-5 h-5 animate-spin text-blue-500" />
          <span className="font-medium text-gray-700">Searching for hotels...</span>
        </div>
      )}

      {/* Results Counter */}
      {hotels.length > 0 && !loading && (
        <div className="absolute top-4 left-4 z-10 bg-white px-4 py-2 rounded-lg shadow-lg">
          <p className="text-sm font-medium text-gray-700">
            Found {hotels.length} hotels nearby
          </p>
        </div>
      )}

      {/* Map Container */}
      <div ref={mapRef} className="w-full h-full" />

      {/* Hotel Details Modal */}
      {selectedHotel && (
        <div className="fixed inset-0 bg-black bg-opacity-50 z-20 flex items-center justify-center p-4">
          <div className="bg-white rounded-xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="relative">
              {/* Image Slider */}
              <div className="relative h-80 bg-gray-200">
                <Image
                  src={selectedHotel.images?.[currentImageIndex] || 'https://images.unsplash.com/photo-1566073771259-6a8506099945?w=800'}
                  alt={selectedHotel.name}
                  className="w-full h-full object-cover"
                  width={800}
                  height={600}
                />
                
                {/* Image Navigation */}
                {selectedHotel.images && selectedHotel.images.length > 1 && (
                  <>
                    <button
                      onClick={prevImage}
                      className="absolute left-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronLeft className="w-6 h-6 text-gray-800" />
                    </button>
                    <button
                      onClick={nextImage}
                      className="absolute right-2 top-1/2 -translate-y-1/2 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
                    >
                      <ChevronRight className="w-6 h-6 text-gray-800" />
                    </button>
                    
                    {/* Image Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
                      {selectedHotel.images.map((_, index: number) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex
                              ? 'bg-white w-8'
                              : 'bg-white bg-opacity-50'
                          }`}
                        />
                      ))}
                    </div>
                  </>
                )}
              </div>

              {/* Close Button */}
              <button
                onClick={() => setSelectedHotel(null)}
                className="absolute top-4 right-4 bg-white bg-opacity-80 hover:bg-opacity-100 rounded-full p-2 shadow-lg transition-all"
              >
                <X className="w-6 h-6 text-gray-800" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">
                {selectedHotel.name}
              </h2>
              
              <div className="flex items-center gap-4 mb-4">
                {selectedHotel.rating > 0 && (
                  <div className="flex items-center gap-1">
                    <Star className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    <span className="font-semibold text-gray-700">
                      {selectedHotel.rating.toFixed(1)}
                    </span>
                  </div>
                )}
                {selectedHotel.price !== 'N/A' && (
                  <span className="text-lg font-bold text-blue-600">
                    {selectedHotel.price}
                  </span>
                )}
              </div>

              <div className="flex items-start gap-2 text-gray-600 mb-4">
                <MapPin className="w-5 h-5 mt-0.5 flex-shrink-0" />
                <span>{selectedHotel.fullAddress || selectedHotel.address}</span>
              </div>

              {selectedHotel.phone && (
                <div className="mb-4">
                  <p className="text-sm text-gray-500">Phone</p>
                  <p className="text-gray-700">{selectedHotel.phone}</p>
                </div>
              )}

              <div className="flex gap-3">
                {selectedHotel.website ? (
                  <a
                    href={selectedHotel.website}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors text-center"
                  >
                    Visit Website
                  </a>
                ) : (
                  <button className="flex-1 bg-blue-500 hover:bg-blue-600 text-white py-3 rounded-lg font-medium transition-colors">
                    Book Now
                  </button>
                )}
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${selectedHotel.lat},${selectedHotel.lng}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-1 bg-gray-100 hover:bg-gray-200 text-gray-800 py-3 rounded-lg font-medium transition-colors text-center"
                >
                  Get Directions
                </a>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* API Key Notice */}
      {apiKey === 'YOUR_GOOGLE_MAPS_API_KEY' && (
        <div className="absolute bottom-4 left-4 right-4 bg-yellow-100 border border-yellow-400 rounded-lg p-4 z-10">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> Please provide a valid Google Maps API key. Make sure to enable both "Maps JavaScript API" and "Places API" in Google Cloud Console.
          </p>
        </div>
      )}
    </div>
  );
};

export default HotelSearchMap;