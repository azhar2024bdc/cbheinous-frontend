
"use client";
// components/ui/core/MyForm/me/form-phone-input.tsx
import React, { useState, useRef, useEffect } from 'react';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { ChevronDown, Check, Phone } from 'lucide-react';
import { parsePhoneNumber, isValidPhoneNumber, getCountries, getCountryCallingCode } from 'libphonenumber-js/mobile';
import type { CountryCode } from 'libphonenumber-js/mobile';
import Image from 'next/image';

// Country data with flags from flagcdn.com
const countryData: Record<string, { name: string; flag: string }> = {
  US: { name: 'United States', flag: 'https://flagcdn.com/w40/us.png' },
  GB: { name: 'United Kingdom', flag: 'https://flagcdn.com/w40/gb.png' },
  CA: { name: 'Canada', flag: 'https://flagcdn.com/w40/ca.png' },
  AU: { name: 'Australia', flag: 'https://flagcdn.com/w40/au.png' },
  IN: { name: 'India', flag: 'https://flagcdn.com/w40/in.png' },
  BD: { name: 'Bangladesh', flag: 'https://flagcdn.com/w40/bd.png' },
  PK: { name: 'Pakistan', flag: 'https://flagcdn.com/w40/pk.png' },
  DE: { name: 'Germany', flag: 'https://flagcdn.com/w40/de.png' },
  FR: { name: 'France', flag: 'https://flagcdn.com/w40/fr.png' },
  JP: { name: 'Japan', flag: 'https://flagcdn.com/w40/jp.png' },
  CN: { name: 'China', flag: 'https://flagcdn.com/w40/cn.png' },
  BR: { name: 'Brazil', flag: 'https://flagcdn.com/w40/br.png' },
  MX: { name: 'Mexico', flag: 'https://flagcdn.com/w40/mx.png' },
  ES: { name: 'Spain', flag: 'https://flagcdn.com/w40/es.png' },
  IT: { name: 'Italy', flag: 'https://flagcdn.com/w40/it.png' },
  NL: { name: 'Netherlands', flag: 'https://flagcdn.com/w40/nl.png' },
  SE: { name: 'Sweden', flag: 'https://flagcdn.com/w40/se.png' },
  NO: { name: 'Norway', flag: 'https://flagcdn.com/w40/no.png' },
  SG: { name: 'Singapore', flag: 'https://flagcdn.com/w40/sg.png' },
  AE: { name: 'UAE', flag: 'https://flagcdn.com/w40/ae.png' },
  RU: { name: 'Russia', flag: 'https://flagcdn.com/w40/ru.png' },
  KR: { name: 'South Korea', flag: 'https://flagcdn.com/w40/kr.png' },
  ZA: { name: 'South Africa', flag: 'https://flagcdn.com/w40/za.png' },
  AR: { name: 'Argentina', flag: 'https://flagcdn.com/w40/ar.png' },
  CL: { name: 'Chile', flag: 'https://flagcdn.com/w40/cl.png' },
  CO: { name: 'Colombia', flag: 'https://flagcdn.com/w40/co.png' },
  EG: { name: 'Egypt', flag: 'https://flagcdn.com/w40/eg.png' },
  ID: { name: 'Indonesia', flag: 'https://flagcdn.com/w40/id.png' },
  MY: { name: 'Malaysia', flag: 'https://flagcdn.com/w40/my.png' },
  NG: { name: 'Nigeria', flag: 'https://flagcdn.com/w40/ng.png' },
  PH: { name: 'Philippines', flag: 'https://flagcdn.com/w40/ph.png' },
  PL: { name: 'Poland', flag: 'https://flagcdn.com/w40/pl.png' },
  SA: { name: 'Saudi Arabia', flag: 'https://flagcdn.com/w40/sa.png' },
  TH: { name: 'Thailand', flag: 'https://flagcdn.com/w40/th.png' },
  TR: { name: 'Turkey', flag: 'https://flagcdn.com/w40/tr.png' },
  VN: { name: 'Vietnam', flag: 'https://flagcdn.com/w40/vn.png' },
};

interface Country {
  code: CountryCode;
  name: string;
  flag: string;
  dial: string;
}

interface FormPhoneInputProps<T extends FieldValues> {
  name: Path<T>;
  control: Control<T>;
  label?: string;
  placeholder?: string;
  error?: string;
  defaultCountry?: CountryCode;
  required?: boolean;
}

export function FormPhoneInput<T extends FieldValues>({
  name,
  control,
  label = 'Mobile Number',
  placeholder = '555-0100',
  error,
  defaultCountry = 'BD',
  required = false,
}: FormPhoneInputProps<T>) {
  // Get available countries and create country list
  const availableCountries: Country[] = Object.keys(countryData)
    .filter(code => getCountries().includes(code as CountryCode))
    .map(code => {
      const countryCode = code as CountryCode;
      return {
        code: countryCode,
        name: countryData[code].name,
        flag: countryData[code].flag,
        dial: `+${getCountryCallingCode(countryCode)}`,
      };
    })
    .sort((a, b) => a.name.localeCompare(b.name));

  const [selectedCountry, setSelectedCountry] = useState<Country>(
    availableCountries.find(c => c.code === defaultCountry) || availableCountries[0]
  );
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const dropdownRef = useRef<HTMLDivElement>(null);

  const filteredCountries = availableCountries.filter(
    country =>
      country.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      country.dial.includes(searchTerm) ||
      country.code.toLowerCase().includes(searchTerm.toLowerCase())
  );

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false);
        setSearchTerm('');
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const [phoneNumber, setPhoneNumber] = useState('');
        const [formattedNumber, setFormattedNumber] = useState('');
        const [isValid, setIsValid] = useState<boolean | null>(null);

  return (
    <Controller
      name={name}
      control={control}
      render={({ field }) => {
        

        const handlePhoneChange = (input: string) => {
          // Remove all non-digit characters except plus at the start
          input = input.replace(/[^\d+]/g, '');
          
          // If starts with country code, remove it
          if (input.startsWith(selectedCountry.dial)) {
            input = input.slice(selectedCountry.dial.length);
          } else if (input.startsWith('+')) {
            input = input.slice(1);
            if (input.startsWith(selectedCountry.dial.slice(1))) {
              input = input.slice(selectedCountry.dial.length - 1);
            }
          }
          
          setPhoneNumber(input);
          
          if (input.length > 0) {
            const fullNumber = `${selectedCountry.dial}${input}`;
            const valid = isValidPhoneNumber(fullNumber, selectedCountry.code);
            setIsValid(valid);
            
            // Format the number
            try {
              const parsed = parsePhoneNumber(fullNumber, selectedCountry.code);
              if (parsed) {
                setFormattedNumber(parsed.formatNational());
              } else {
                setFormattedNumber(input);
              }
            } catch {
              setFormattedNumber(input);
            }
            
            // Update form value with full international number
            field.onChange(fullNumber);
          } else {
            setIsValid(null);
            setFormattedNumber('');
            field.onChange('');
          }
        };

        const handleCountrySelect = (country: Country) => {
          setSelectedCountry(country);
          setIsOpen(false);
          setSearchTerm('');
          
          // Re-validate with new country
          if (phoneNumber) {
            const fullNumber = `${country.dial}${phoneNumber}`;
            const valid = isValidPhoneNumber(fullNumber, country.code);
            setIsValid(valid);
            
            try {
              const parsed = parsePhoneNumber(fullNumber, country.code);
              if (parsed) {
                setFormattedNumber(parsed.formatNational());
              }
            } catch {
              setFormattedNumber(phoneNumber);
            }
            
            field.onChange(fullNumber);
          }
        };

        const displayNumber = formattedNumber || phoneNumber;

        return (
          <div className="grid w-full items-center gap-3">
            {label && (
              <label className="text-sm font-medium text-gray-700">
                {label}
                {required && <span className="text-red-500 ml-1">*</span>}
              </label>
            )}

            <div className="relative">
              {/* Single Combined Input */}
              <div className="relative flex items-center">
                {/* Phone Icon */}
                <div className="absolute left-3 pointer-events-none">
                  <Phone className="w-4 h-4 text-gray-400" />
                </div>

                {/* Country Code Dropdown Button */}
                <div className="absolute sm:left-10 " ref={dropdownRef}>
                  <button
                    type="button"
                    onClick={() => setIsOpen(!isOpen)}
                    className="flex items-center gap-1 px-2 py-1 hover:bg-gray-50 rounded transition-colors"
                  >
                    <Image 
                      src={selectedCountry.flag} 
                      alt={selectedCountry.code}
                      className="w-5 h-4 object-cover rounded-sm"
                      width={20}
                      height={20}
                    />
                    <span className="text-sm font-medium text-gray-700">
                      {selectedCountry.dial}
                    </span>
                    <ChevronDown
                      className={`w-3 h-3 text-gray-400 transition-transform ${
                        isOpen ? 'rotate-180' : ''
                      }`}
                    />
                  </button>

                  {/* Dropdown Menu */}
                  {isOpen && (
                    <div className="absolute z-50 left-0 top-full mt-1 min-w-52 bg-white border border-gray-300 rounded-lg shadow-lg max-h-72 overflow-hidden">
                      <div className="p-2 border-b border-gray-200">
                        <input
                          type="text"
                          placeholder="Search country..."
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="w-full px-3 py-2 text-sm bg-gray-50 border border-gray-200 rounded-md focus:outline-none focus:border-primary"
                          autoFocus
                        />
                      </div>
                      <div className="overflow-y-auto max-h-56">
                        {filteredCountries.length > 0 ? (
                          filteredCountries.map((country) => (
                            <button
                              key={country.code}
                              type="button"
                              onClick={() => handleCountrySelect(country)}
                              className="w-full flex items-center justify-between px-3 py-2 hover:bg-gray-50 transition-colors"
                            >
                              <div className="flex items-center gap-2">
                                <Image 
                                  src={country.flag} 
                                  alt={country.code}
                                  className="w-6 h-4 object-cover rounded-sm"
                                  width={24}
                                  height={16}
                                />
                                <div className="text-left">
                                  <div className="text-sm font-medium text-gray-900">
                                    {country.name}
                                  </div>
                                  <div className="text-xs text-gray-500">
                                    {country.dial}
                                  </div>
                                </div>
                              </div>
                              {selectedCountry.code === country.code && (
                                <Check className="w-4 h-4 text-primary" />
                              )}
                            </button>
                          ))
                        ) : (
                          <div className="px-4 py-8 text-center text-sm text-gray-500">
                            No countries found
                          </div>
                        )}
                      </div>
                    </div>
                  )}
                </div>

                {/* Phone Number Input */}
                <input
                  type="tel"
                  value={displayNumber}
                  onChange={(e) => handlePhoneChange(e.target.value)}
                  placeholder={placeholder}
                  className={`w-full pl-32 pr-4 py-2.5 bg-white border rounded-lg focus:outline-none transition-colors ${
                    error
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : isValid === true
                      ? 'border-green-500 focus:border-green-500 focus:ring-2 focus:ring-green-500/20'
                      : isValid === false
                      ? 'border-red-500 focus:border-red-500 focus:ring-2 focus:ring-red-500/20'
                      : 'border-gray-300 focus:border-primary focus:ring-2 focus:ring-primary/20'
                  }`}
                />

                {/* Validation Indicator */}
                {isValid !== null && (
                  <div className="absolute right-3">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        isValid ? 'bg-green-500' : 'bg-red-500'
                      }`}
                    />
                  </div>
                )}
              </div>
            </div>

            {/* Error or Success Message */}
            {error && (
              <p className="text-sm text-red-500">{error}</p>
            )}
            {!error && isValid === false && phoneNumber.length > 0 && (
              <p className="text-sm text-red-500">
                Invalid phone number for {selectedCountry.name}
              </p>
            )}
            {!error && isValid === true && (
              <p className="text-sm text-green-600">
                ✓ Valid phone number
              </p>
            )}
          </div>
        );
      }}
    />
  );
}