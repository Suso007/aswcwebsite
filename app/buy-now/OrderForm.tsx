"use client";

import { useState } from "react";

export default function OrderForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    company: "",
    product: "",
    quantity: "1",
    installation: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/orders", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (res.ok) {
        setSubmitStatus("success");
        setFormData({
          name: "",
          email: "",
          phone: "",
          company: "",
          product: "",
          quantity: "1",
          installation: "",
          message: "",
        });
      } else {
        setSubmitStatus("error");
      }
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-br from-teal-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Complete Your{" "}
            <span className="text-teal-700 font-pacifico">Order</span>
          </h2>
          <p className="text-xl text-amber-700/80">
            Fill out the form below and our team will contact you within 24
            hours
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden">
          <div className="p-8 lg:p-12">
            {submitStatus === "success" && (
              <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-8 text-center">
                <i className="ri-check-circle-fill text-3xl mb-2 block"></i>
                <p className="font-semibold text-lg">
                  Order submitted successfully!
                </p>
                <p>We'll contact you within 24 hours to confirm details.</p>
              </div>
            )}

            <form id="order-form" onSubmit={handleSubmit} className="space-y-6">
              {/* Personal Info */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm"
                    placeholder="Your full name"
                    required
                  />
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Email Address *
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm"
                    placeholder="your@email.com"
                    required
                  />
                </div>
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Phone Number *
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={(e) =>
                      setFormData({ ...formData, phone: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm"
                    placeholder="(555) 123-4567"
                    required
                  />
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Company Name
                  </label>
                  <input
                    type="text"
                    name="company"
                    value={formData.company}
                    onChange={(e) =>
                      setFormData({ ...formData, company: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm"
                    placeholder="Your company name"
                  />
                </div>
              </div>

              {/* Product Selection */}
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Product Type *
                  </label>
                  <div className="relative">
                    <select
                      name="product"
                      value={formData.product}
                      onChange={(e) =>
                        setFormData({ ...formData, product: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm pr-8 appearance-none"
                      required
                    >
                      <option value="">Select a product</option>
                      <option value="luxury-watch">Luxury Watch</option>
                      <option value="wall-clock">Wall Clock</option>
                      <option value="attendance-system">
                        Attendance System
                      </option>
                      <option value="custom-solution">Custom Solution</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"></i>
                  </div>
                </div>

                <div>
                  <label className="block text-amber-900 font-semibold mb-2">
                    Quantity *
                  </label>
                  <div className="relative">
                    <select
                      name="quantity"
                      value={formData.quantity}
                      onChange={(e) =>
                        setFormData({ ...formData, quantity: e.target.value })
                      }
                      className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm pr-8 appearance-none"
                      required
                    >
                      <option value="1">1 piece</option>
                      <option value="2-5">2-5 pieces</option>
                      <option value="6-10">6-10 pieces</option>
                      <option value="10+">10+ pieces</option>
                    </select>
                    <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"></i>
                  </div>
                </div>
              </div>

              {/* Installation */}
              <div>
                <label className="block text-amber-900 font-semibold mb-2">
                  Installation Service
                </label>
                <div className="relative">
                  <select
                    name="installation"
                    value={formData.installation}
                    onChange={(e) =>
                      setFormData({ ...formData, installation: e.target.value })
                    }
                    className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm pr-8 appearance-none"
                  >
                    <option value="">No installation needed</option>
                    <option value="basic">Basic installation (+₹50)</option>
                    <option value="premium">
                      Premium installation & setup (+₹150)
                    </option>
                    <option value="enterprise">
                      Enterprise deployment (+₹300)
                    </option>
                  </select>
                  <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"></i>
                </div>
              </div>

              {/* Additional Message */}
              <div>
                <label className="block text-amber-900 font-semibold mb-2">
                  Additional Requirements
                </label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={(e) =>
                    setFormData({ ...formData, message: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm resize-none"
                  rows={4}
                  maxLength={500}
                  placeholder="Tell us about any specific requirements, preferred delivery dates, or questions..."
                />
                <p className="text-amber-600 text-sm mt-1">
                  {formData.message.length}/500 characters
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-700 hover:to-orange-700 text-white py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
              >
                {isSubmitting ? (
                  <span className="flex items-center justify-center gap-3">
                    <i className="ri-loader-4-line animate-spin"></i>
                    Processing Order...
                  </span>
                ) : (
                  <span className="flex items-center justify-center gap-3">
                    <i className="ri-shopping-cart-2-fill"></i>
                    Submit Order Request
                    <i className="ri-arrow-right-line"></i>
                  </span>
                )}
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
