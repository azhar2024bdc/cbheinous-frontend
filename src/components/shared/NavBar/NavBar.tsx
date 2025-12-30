"use client";

import { useState } from "react";
import { Menu, Bell, MessageSquare, X } from "lucide-react";
import Logo from "../logo/Logo";
import Image from "next/image";
import Link from "next/link";

export default function Navbar() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);


  const [isUserLoggedIn, setIsUserLoggedIn] = useState(true);

  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  const toggleUserMenu = () => setIsUserMenuOpen(!isUserMenuOpen);

  const handleLogout = () => {
    setIsUserLoggedIn(false);
    setIsUserMenuOpen(false);
    alert("Logged out successfully!");
  };

  return (
    <nav className="bg-white py-4 fixed top-0 left-0 right-0 shadow-sm border-b border-gray-200 mb-32 z-50">
      <div className="container mx-auto ">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <Logo />

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link
              href="/"
              className="text-yellow-500 font-medium hover:text-yellow-600 transition"
            >
              Home
            </Link>
            <Link
              href="/make-offer"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Make Offer
            </Link>
            <Link
              href="/subscriptions"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Subscription
            </Link>
            <Link
              href="/contact-us"
              className="text-gray-600 hover:text-gray-900 transition"
            >
              Contact us
            </Link>
          </div>

          <div className="flex items-center gap-4">
            <button className="p-2 text-gray-600 hover:text-gray-900 transition">
              <Bell className="w-5 h-5" />
            </button>
            <button className="p-2 text-gray-600 hover:text-gray-900 transition">
              <MessageSquare className="w-5 h-5" />
            </button>

            {isUserLoggedIn ? (
              <div className="relative">
                <button
                  onClick={toggleUserMenu}
                  className="flex items-center focus:outline-none"
                >
                  <Image
                    src="https://api.dicebear.com/7.x/avataaars/svg?seed=Felix"
                    alt="User"
                    className="w-10 h-10 rounded-full border-2 border-gray-200 hover:border-yellow-500 transition"
                    height={40}
                    width={40}
                  />
                </button>

                {isUserMenuOpen && (
                  <>
                    <div
                      className="fixed inset-0 z-10"
                      onClick={() => setIsUserMenuOpen(false)}
                    />

                    {/* Menu */}
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-20">
                      <a
                        href="#profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        Profile
                      </a>
                      <a
                        href="#settings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        Settings
                      </a>
                      <a
                        href="#my-offers"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 transition"
                      >
                        My Offers
                      </a>
                      <hr className="my-2 border-gray-200" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition"
                      >
                        Logout
                      </button>
                    </div>
                  </>
                )}
              </div>
            ) : (
              <div className="hidden md:flex items-center gap-3">
                <button className="px-4 py-2 text-gray-700 hover:text-gray-900 transition">
                  sign In
                </button>
                <button className="px-6 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600 transition">
                  sign Up
                </button>
              </div>
            )}

            {/* Mobile Menu Button */}
            <button
              onClick={toggleMenu}
              className="md:hidden p-2 text-gray-600 hover:text-gray-900"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {isMenuOpen && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <div className="flex flex-col space-y-3">
              <Link href="" className="text-yellow-500 font-medium py-2">
                Home
              </Link>
              <a
                href="/make-offer"
                className="text-gray-600 hover:text-gray-900 py-2"
              >
                Make Offer
              </a>
              <a
                href="/subscriptions"
                className="text-gray-600 hover:text-gray-900 py-2"
              >
                Subscription
              </a>
              <a
                href="/contact-us"
                className="text-gray-600 hover:text-gray-900 py-2"
              >
                Contact us
              </a>

              {!isUserLoggedIn && (
                <div className="flex flex-col gap-2 pt-3 border-t border-gray-200">
                  <button className="px-4 py-2 text-gray-700 border border-gray-300 rounded-lg hover:bg-gray-50">
                    sign In
                  </button>
                  <button className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600">
                    sign Up
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}
