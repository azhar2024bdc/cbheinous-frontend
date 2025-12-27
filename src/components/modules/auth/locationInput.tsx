/* eslint-disable no-unused-vars */
// components/LocationInput.tsx
"use client";

import React, { useState, useEffect } from "react";
import { MapPin, X, Search } from "lucide-react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMapEvents,
  useMap,
} from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";


interface LocationState {
  name: string;
  lat: number;
  lng: number;
}

interface LocationData {
  locationName: string;
  latitude: number;
  longitude: number;
  target: {
    name: string;
    value: string;
  };
}

interface LocationInputProps {
  value?: string;
  onChange?: (location: LocationData) => void;
  placeholder?: string;
  className?: string;
  disabled?: boolean;
  required?: boolean;
  name?: string;
}

interface SearchResult {
  place_id: string;
  display_name: string;
  lat: string;
  lon: string;
}

// Fix default marker icon in Leaflet
delete (L.Icon.Default.prototype as any)._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png",
  iconUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png",
  shadowUrl:
    "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png",
});

const LocationInput: React.FC<LocationInputProps> = ({
  value = "",
  onChange,
  placeholder = "Enter location",
  className = "",
  disabled = false,
  required = false,
  name = "location",
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const [searchResults, setSearchResults] = useState<SearchResult[]>([]);
  const [selectedLocation, setSelectedLocation] = useState<LocationState>({
    name: value || "Dhaka",
    lat: 23.8103,
    lng: 90.4125,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Update selectedLocation when value prop changes
  useEffect(() => {
    if (value && value !== selectedLocation.name) {
      setSelectedLocation((prev) => ({
        ...prev,
        name: value,
      }));
    }
  }, [value, selectedLocation.name]);

  // Search locations using Nominatim API
  const searchPlaces = async (query: string) => {
    if (!query.trim()) {
      setSearchResults([]);
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(
          query
        )}&limit=5`
      );

      if (!response.ok) {
        throw new Error("Search request failed");
      }

      const data: SearchResult[] = await response.json();
      setSearchResults(data);
    } catch (error) {
      console.error("Search error:", error);
      setSearchResults([]);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (searchQuery) {
        searchPlaces(searchQuery);
      } else {
        setSearchResults([]);
      }
    }, 300);

    return () => clearTimeout(timeoutId);
  }, [searchQuery]);

  // Helper: fire onChange event
  const fireOnChange = (location: LocationState) => {
    if (onChange) {
      const locationData: LocationData = {
        locationName: location.name,
        latitude: location.lat,
        longitude: location.lng,
        target: {
          name,
          value: location.name,
        },
      };
      onChange(locationData);
    }
  };

  const selectLocation = (result: SearchResult) => {
    const location: LocationState = {
      name: result.display_name,
      lat: parseFloat(result.lat),
      lng: parseFloat(result.lon),
    };

    setSelectedLocation(location);
    setSearchQuery("");
    setSearchResults([]);
    fireOnChange(location);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSearchQuery("");
    setSearchResults([]);
  };

  const confirmSelection = () => {
    fireOnChange(selectedLocation);
    closeModal();
  };

  // Reverse geocoding to get address from coordinates
  const reverseGeocode = async (lat: number, lng: number): Promise<string> => {
    try {
      const response = await fetch(
        `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lng}`
      );

      if (!response.ok) {
        throw new Error("Reverse geocoding failed");
      }

      const data = await response.json();
      return (
        data.display_name || `Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`
      );
    } catch (error) {
      console.error("Reverse geocoding error:", error);
      return `Selected Location (${lat.toFixed(4)}, ${lng.toFixed(4)})`;
    }
  };

  // Map click handler component
  const LocationMarker: React.FC = () => {
    useMapEvents({
      async click(e) {
        const { lat, lng } = e.latlng;

        // Get clean address name from coordinates
        const locationName = await reverseGeocode(lat, lng);

        const location: LocationState = {
          name: locationName,
          lat,
          lng,
        };
        setSelectedLocation(location);
      },
    });

    return (
      <Marker position={[selectedLocation.lat, selectedLocation.lng]}>
        <Popup>
          <div>
            <p className="font-medium">{selectedLocation.name}</p>
            <p className="text-sm text-gray-600">
              Coordinates: {selectedLocation.lat.toFixed(5)},{" "}
              {selectedLocation.lng.toFixed(5)}
            </p>
          </div>
        </Popup>
      </Marker>
    );
  };

  const MapUpdater: React.FC<{ location: LocationState }> = ({ location }) => {
    const map = useMap();

    useEffect(() => {
      if (location.lat && location.lng) {
        map.setView([location.lat, location.lng], 13);
      }
    }, [location, map]);

    return null;
  };

  return (
    <>
      <div className={` ${className}`}>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Location (give exact address to find services)
        </label>
        {/* Input */}
        <div className="relative">
          <input
            type="text"
            value={selectedLocation.name}
            placeholder={placeholder}
            className="w-full px-4 py-2.5 pr-12 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent cursor-pointer"
            onClick={() => !disabled && setIsModalOpen(true)}
            readOnly
            disabled={disabled}
            required={required}
            name={name}
          />
          <button
            type="button"
            onClick={() => !disabled && setIsModalOpen(true)}
            disabled={disabled}
            className="absolute  right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-blue-500 disabled:cursor-not-allowed"
          >
            <MapPin size={20} />
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg w-full max-w-4xl h-[90vh] flex flex-col">
            {/* Header */}
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Select Location</h3>
              <button
                onClick={closeModal}
                className="text-gray-500 hover:text-gray-700"
                type="button"
              >
                <X size={24} />
              </button>
            </div>

            {/* Search */}
            <div className="p-4 border-b">
              <div className="relative">
                <Search
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400"
                  size={20}
                />
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Search for a location..."
                  className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                />
                {isLoading && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <div className="animate-spin h-4 w-4 border-2 border-blue-500 border-t-transparent rounded-full"></div>
                  </div>
                )}
              </div>
            </div>

            {/* Search Results */}
            {searchResults.length > 0 && (
              <div className="max-h-48 overflow-y-auto border-b bg-gray-50">
                {searchResults.map((result) => (
                  <button
                    key={result.place_id}
                    onClick={() => selectLocation(result)}
                    className="w-full text-left p-3 hover:bg-white hover:shadow-sm border-b last:border-b-0 transition-colors"
                  >
                    <div className="font-medium text-gray-900 truncate">
                      {result.display_name}
                    </div>
                  </button>
                ))}
              </div>
            )}

            {/* Map Container */}
            <div className="flex-1 relative">
              <MapContainer
                center={[selectedLocation.lat, selectedLocation.lng]}
                zoom={13}
                className="h-full w-full"
                style={{ height: "100%", width: "100%" }}
              >
                <TileLayer
                  attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                  url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <MapUpdater location={selectedLocation} />
                <LocationMarker />
              </MapContainer>
            </div>

            {/* Footer with action buttons */}
            <div className="p-4 border-t bg-gray-50 flex justify-between items-center">
              <div className="text-sm text-gray-600">
                Click on the map to select a location
              </div>
              <div className="flex gap-2">
                <button
                  onClick={closeModal}
                  className="px-4 py-2 text-gray-600 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 transition-colors"
                >
                  Cancel
                </button>
                <button
                  onClick={confirmSelection}
                  className="px-4 py-2 text-white bg-blue-600 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Confirm Location
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default LocationInput;
