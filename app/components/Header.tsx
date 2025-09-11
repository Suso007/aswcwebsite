"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isProductsDropdownOpen, setIsProductsDropdownOpen] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const isActive = (path: string) => pathname === path;
  const isProductsActive = () => pathname.startsWith("/products");

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        isScrolled
          ? "bg-white/98 backdrop-blur-lg shadow-xl border-b border-white/20"
          : "bg-white/85 backdrop-blur-md shadow-lg"
      }`}
    >
      <div className="w-full px-4 sm:px-6 lg:px-12">
        <div
          className={`flex items-center justify-between transition-all duration-500 ${
            isScrolled ? "h-14" : "h-16"
          }`}
        >
          {/* Logo */}
          <div className="flex items-center gap-2 sm:gap-3">
            <Link href="/">
              <div className="flex items-center gap-2 sm:gap-3 cursor-pointer">
                <div
                  className={`transition-all duration-500 ${
                    isScrolled
                      ? "w-7 h-7 sm:w-8 sm:h-8"
                      : "w-8 h-8 sm:w-9 sm:h-9"
                  }`}
                >
                  <img
                    src="/images/logomain.png"
                    alt="Anglo Swiss Watch Co."
                    className="w-full h-full object-contain"
                  />
                </div>
                <div>
                  <h1
                    className={`font-display font-semibold text-teal-600 transition-all duration-500 font-gothic ${
                      isScrolled
                        ? "text-xs sm:text-sm"
                        : "text-sm sm:text-base lg:text-lg"
                    }`}
                  >
                    anglo swiss watch co.
                  </h1>
                  <p
                    className={`text-gray-600 font-medium transition-all duration-500 ${
                      isScrolled ? "text-[10px]" : "text-[10px] sm:text-xs"
                    }`}
                  >
                    Kolkata
                  </p>
                </div>
              </div>
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-4 lg:space-x-6">
            <Link
              href="/"
              className={`font-medium transition-all duration-300 cursor-pointer relative text-xs lg:text-sm ${
                isActive("/")
                  ? "text-teal-600"
                  : "text-gray-700 hover:text-teal-600"
              }`}
            >
              Home
              {isActive("/") && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-600 rounded-full"></div>
              )}
            </Link>
            <Link
              href="/about"
              className={`font-medium transition-all duration-300 cursor-pointer relative text-xs lg:text-sm ${
                isActive("/about")
                  ? "text-teal-600"
                  : "text-gray-700 hover:text-teal-600"
              }`}
            >
              About
              {isActive("/about") && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-600 rounded-full"></div>
              )}
            </Link>

            {/* Products Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsProductsDropdownOpen((prev) => !prev)}
                className={`font-medium transition-all duration-300 cursor-pointer relative text-xs lg:text-sm flex items-center gap-1 ${
                  isProductsActive()
                    ? "text-teal-600"
                    : "text-gray-700 hover:text-teal-600"
                }`}
              >
                Products
                <i
                  className={`ri-arrow-down-s-line text-sm transition-transform duration-200 ${
                    isProductsDropdownOpen ? "rotate-180" : ""
                  }`}
                ></i>
                {isProductsActive() && (
                  <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-600 rounded-full"></div>
                )}
              </button>

              {isProductsDropdownOpen && (
                <div className="absolute left-0 mt-2 w-56 bg-white/95 backdrop:blur rounded-xl shadow-xl border border-white/20 py-2 z-50">
                  <Link
                    href="/products/luxury-watches"
                    className="flex items-center gap-3 px-4 py-3 text-xs lg:text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50/50"
                  >
                    <div>
                      <div className="font-medium">Premium Watches</div>
                      <div className="text-xs text-gray-500">
                        Swiss precision timepieces
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/products/wall-clocks"
                    className="flex items-center gap-3 px-4 py-3 text-xs lg:text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50/50"
                  >
                    <div>
                      <div className="font-medium">Wall Clocks</div>
                      <div className="text-xs text-gray-500">
                        Corporate & decorative clocks
                      </div>
                    </div>
                  </Link>
                  <Link
                    href="/products/smart-devices"
                    className="flex items-center gap-3 px-4 py-3 text-xs lg:text-sm text-gray-700 hover:text-teal-600 hover:bg-teal-50/50"
                  >
                    <div>
                      <div className="font-medium">Smart Devices</div>
                      <div className="text-xs text-gray-500">
                        Biometric & attendance systems
                      </div>
                    </div>
                  </Link>
                  <div className="border-t border-gray-100 mt-2 pt-2">
                    <Link
                      href="/products"
                      className="flex items-center gap-2 px-4 py-2 text-xs lg:text-sm text-teal-600 hover:bg-teal-50/50 font-medium"
                    >
                      <i className="ri-arrow-right-line text-sm"></i>
                      View All Products
                    </Link>
                  </div>
                </div>
              )}
            </div>

            <Link
              href="/services"
              className={`font-medium transition-all duration-300 cursor-pointer relative text-xs lg:text-sm ${
                isActive("/services")
                  ? "text-teal-600"
                  : "text-gray-700 hover:text-teal-600"
              }`}
            >
              Services
              {isActive("/services") && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-600 rounded-full"></div>
              )}
            </Link>
            <Link
              href="/contact"
              className={`font-medium transition-all duration-300 cursor-pointer relative text-xs lg:text-sm ${
                isActive("/contact")
                  ? "text-teal-600"
                  : "text-gray-700 hover:text-teal-600"
              }`}
            >
              Contact
              {isActive("/contact") && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-600 rounded-full"></div>
              )}
            </Link>
            <Link
              href="/admin"
              className={`font-medium transition-all duration-300 cursor-pointer relative text-xs lg:text-sm ${
                isActive("/admin")
                  ? "text-teal-600"
                  : "text-gray-700 hover:text-teal-600"
              }`}
            >
              Admin
              {isActive("/admin") && (
                <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-600 rounded-full"></div>
              )}
            </Link>
          </nav>

          {/* CTA Button */}
          <div className="hidden md:block">
            <Link href="/buy-now">
              <span
                className={`flex items-center gap-1.5 rounded-full font-medium transition-all duration-500 hover:scale-105 whitespace-nowrap shadow-lg bg-gradient-to-r from-teal-500 to-emerald-600 text-white hover:from-teal-600 hover:to-emerald-700 ${
                  isScrolled
                    ? "px-3 py-1.5 text-xs"
                    : "px-4 py-2 text-xs lg:text-sm"
                }`}
              >
                <i className="ri-shopping-cart-fill text-sm"></i>
                Buy Now
              </span>
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="md:hidden w-9 h-9 rounded-full flex items-center justify-center text-teal-600 hover:bg-teal-50"
          >
            <i
              className={`text-xl ${
                isMobileMenuOpen ? "ri-close-line" : "ri-menu-line"
              }`}
            ></i>
          </button>
        </div>

        {/* Mobile Menu */}
        {isMobileMenuOpen && (
          <div className="md:hidden py-3 border-t border-teal-200 bg-white/95 backdrop-blur-lg">
            <nav className="flex flex-col space-y-1">
              <Link
                href="/"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg font-medium text-sm ${
                  isActive("/")
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                }`}
              >
                <i className="ri-home-line text-base"></i>
                Home
              </Link>
              <Link
                href="/about"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg font-medium text-sm ${
                  isActive("/about")
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                }`}
              >
                <i className="ri-building-line text-base"></i>
                About
              </Link>

              {/* Mobile Products Section */}
              <div className="px-3 py-2">
                <Link
                  href="/products"
                  onClick={() => setIsMobileMenuOpen(false)}
                  className={`flex items-center gap-2 py-2.5 rounded-lg font-medium text-sm ${
                    isProductsActive()
                      ? "text-teal-600 bg-teal-50"
                      : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                  }`}
                >
                  <i className="ri-time-line text-base"></i>
                  Products
                </Link>
                <div className="ml-6 mt-1 space-y-1">
                  <Link
                    href="/products/luxury-watches"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                  >
                    <i className="ri-time-line text-sm"></i>
                    Luxury Watches
                  </Link>
                  <Link
                    href="/products/wall-clocks"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                  >
                    <i className="ri-timer-line text-sm"></i>
                    Wall Clocks
                  </Link>
                  <Link
                    href="/products/smart-devices"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="flex items-center gap-2 px-2 py-2 rounded-lg text-xs text-gray-600 hover:bg-teal-50 hover:text-teal-600"
                  >
                    <i className="ri-fingerprint-line text-sm"></i>
                    Smart Devices
                  </Link>
                </div>
              </div>

              <Link
                href="/services"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg font-medium text-sm ${
                  isActive("/services")
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                }`}
              >
                <i className="ri-service-line text-base"></i>
                Services
              </Link>
              <Link
                href="/contact"
                onClick={() => setIsMobileMenuOpen(false)}
                className={`flex items-center gap-2 px-3 py-2.5 rounded-lg font-medium text-sm ${
                  isActive("/contact")
                    ? "text-teal-600 bg-teal-50"
                    : "text-gray-700 hover:bg-teal-50 hover:text-teal-600"
                }`}
              >
                <i className="ri-mail-line text-base"></i>
                Contact
              </Link>
              <Link
                href="/buy-now"
                onClick={() => setIsMobileMenuOpen(false)}
                className="flex items-center justify-center gap-2 px-3 py-2.5 rounded-lg font-medium text-sm bg-gradient-to-r from-teal-500 to-emerald-600 text-white hover:from-teal-600 hover:to-emerald-700"
              >
                <i className="ri-shopping-cart-fill text-base"></i>
                Buy Now
              </Link>
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
