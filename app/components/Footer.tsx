"use client";

import { useState } from "react";
import Link from "next/link";

export default function Footer() {
  const [email, setEmail] = useState("");
  const [newsletterStatus, setNewsletterStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleNewsletterSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim()) return;

    try {
      const res = await fetch("/api/subscribers", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email }),
      });

      if (res.ok) {
        setNewsletterStatus("success");
        setEmail("");
      } else {
        const err = await res.json();
        setNewsletterStatus("error");
        alert(err.error || "Subscription failed");
      }
    } catch (error) {
      console.error("Newsletter submit error:", error);
      setNewsletterStatus("error");
    } finally {
      setTimeout(() => setNewsletterStatus("idle"), 3000);
    }
  };

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12 py-12">
        <div className="grid md:grid-cols-4 gap-6">
          {/* Brand */}
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-3">
              <img
                src="https://static.readdy.ai/image/c5bf9861bc2f1ee2b98921198267fbdf/13464e273327f350ec0d719f207bd4fa.jfif"
                alt="Anglo Swiss Watch Co."
                className="w-8 h-8 object-contain"
              />
              <h3 className="font-display text-lg font-semibold text-teal-400 font-gothic">
                anglo swiss watch co.
              </h3>
            </div>
            <p className="text-gray-300 text-sm mb-4 leading-relaxed">
              Premium timepieces and innovative attendance solutions for modern
              businesses. Crafted with Swiss precision.
            </p>

            {/* Newsletter */}
            <form onSubmit={handleNewsletterSubmit} className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="your@email.com"
                className="flex-1 px-3 py-2 bg-gray-800 border border-gray-700 rounded text-xs focus:outline-none focus:border-teal-500"
                required
              />
              <button
                type="submit"
                className="bg-teal-600 hover:bg-teal-700 px-3 py-2 rounded text-xs font-medium transition-colors whitespace-nowrap cursor-pointer"
              >
                Subscribe
              </button>
            </form>
            {newsletterStatus === "success" && (
              <p className="text-green-400 text-xs mt-2">
                Thanks for subscribing!
              </p>
            )}
            {newsletterStatus === "error" && (
              <p className="text-red-400 text-xs mt-2">
                Something went wrong. Try again.
              </p>
            )}
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">
              Quick Links
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <Link
                  href="/about"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  About Us
                </Link>
              </li>
              <li>
                <Link
                  href="/products"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Products
                </Link>
              </li>
              <li>
                <Link
                  href="/services"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Services
                </Link>
              </li>
              <li>
                <Link
                  href="/contact"
                  className="text-gray-300 hover:text-white transition-colors cursor-pointer"
                >
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Info */}
          <div>
            <h4 className="font-display font-semibold text-sm mb-3">
              Contact Info
            </h4>
            <ul className="space-y-2 text-xs text-gray-300">
              <li className="flex items-center gap-2">
                <i className="ri-phone-line text-sm"></i>
                (033) 22300295 / 40672089
              </li>
              <li className="flex items-center gap-2">
                <a href="mailto:info@angloswiss.in">
                  <i className="ri-mail-line text-sm"></i>
                </a>
                For General: info@angloswiss.in
              </li>
              <li className="flex items-center gap-2">
                <a href="mailto:service@angloswiss.in">
                  <i className="ri-mail-line text-sm"></i>
                </a>
                For Watch Services: service@angloswiss.in
              </li>
              <li className="flex items-center gap-2">
                <a
                  href="https://maps.app.goo.gl/VJfS91F2tm14SEYm8"
                  target="_blank"
                >
                  <i className="ri-map-pin-line text-sm"></i>
                </a>
                6, Binoy Badal Dinesh Bag E, B.B.D. Bagh, East, West Bengal
                700001
              </li>
              <li className="flex items-center gap-2">
                <i className="ri-time-line text-sm"></i>
                Mon-Sat: 10AM-8PM
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom */}
        <div className="border-t border-gray-800 pt-6 mt-8">
          <div className="flex flex-col md:flex-row justify-between items-center gap-3">
            <p className="text-center text-xs text-gray-400">
              &copy; 2024 anglo swiss watch co. Precision in every moment.
            </p>

            <div className="flex gap-4">
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-facebook-fill text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-twitter-fill text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-instagram-fill text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-linkedin-fill text-lg"></i>
              </a>
              <a
                href="#"
                className="text-gray-400 hover:text-white transition-colors cursor-pointer"
              >
                <i className="ri-whatsapp-fill text-lg"></i>
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
