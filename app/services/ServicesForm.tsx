"use client";

import { useEffect, useState } from "react";

export default function ServicesForm() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    Productypes: "",
    modelno: "",
    message: "",
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<
    "idle" | "success" | "error"
  >("idle");
  const [messages, setMessages] = useState([]);

  // Fetch messages from API
  useEffect(() => {
    async function fetchMessages() {
      try {
        const res = await fetch("/api/service-form");
        if (res.ok) {
          const data = await res.json();
          setMessages(data);
        }
      } catch (error) {
        console.error("❌ Error fetching messages:", error);
      }
    }
    fetchMessages();
  }, []);

  // Handle form submit
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const res = await fetch("/api/service-form", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      if (!res.ok) throw new Error("Failed to send message");

      setSubmitStatus("success");
      setFormData({
        name: "",
        email: "",
        phone: "",
        Productypes: "",
        modelno: "",
        message: "",
      });

      // Refresh messages after submit
      const updated = await fetch("/api/service-form");
      setMessages(await updated.json());
    } catch (error) {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className="py-24 bg-white">
      <div className="max-w-2xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Service <span className="text-teal-700 font-pacifico">Request</span>
          </h2>
          <p className="text-xl text-amber-700/80">
            Fill out the form below and we'll get back to you as soon as
            possible.
          </p>
        </div>

        {submitStatus === "success" && (
          <div className="bg-green-100 border border-green-300 text-green-800 px-6 py-4 rounded-lg mb-8 text-center">
            <i className="ri-check-circle-fill text-2xl mb-2 block"></i>
            <p className="font-semibold">Message sent successfully!</p>
            <p className="text-sm">We'll get back to you within 24 hours.</p>
          </div>
        )}

        <form id="contact-form" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Your Name *
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={(e) =>
                  setFormData({ ...formData, name: e.target.value })
                }
                className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm"
                placeholder="John Doe"
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
                placeholder="john@example.com"
                required
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Phone Number
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
              />
            </div>
            <div>
              <label className="block text-amber-900 font-semibold mb-2">
                Subject *
              </label>
              <div className="relative">
                <select
                  name="subject"
                  value={formData.Productypes}
                  onChange={(e) =>
                    setFormData({ ...formData, Productypes: e.target.value })
                  }
                  className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm pr-8 appearance-none"
                  required
                >
                  <option value="">Select a product</option>
                  <option value="product-inquiry">Watches</option>
                  <option value="installation">Wall Clocks</option>
                  <option value="support">Tower Clocks</option>
                  <option value="quotation">Biometric Access</option>
                  <option value="other">Other</option>
                </select>
                <i className="ri-arrow-down-s-line absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none"></i>
              </div>
            </div>
          </div>

          <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Model Number
            </label>
            <input
              type="text"
              name="modelno"
              value={formData.modelno}
              onChange={(e) =>
                setFormData({ ...formData, modelno: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm"
              placeholder="Model No. (if applicable)"
            />
          </div>

          <div>
            <label className="block text-amber-900 font-semibold mb-2">
              Service Description *
            </label>
            <textarea
              name="message"
              value={formData.message}
              onChange={(e) =>
                setFormData({ ...formData, message: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-orange-200 rounded-lg focus:outline-none focus:border-teal-500 transition-colors text-sm resize-none"
              rows={6}
              maxLength={500}
              placeholder="Tell us how we can serve you..."
              required
            />
            <p className="text-amber-600 text-sm mt-1">
              {formData.message.length}/500 characters
            </p>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            className="w-full bg-gradient-to-r from-teal-600 to-orange-600 hover:from-teal-700 hover:to-orange-700 text-white py-4 rounded-lg text-lg font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap cursor-pointer"
          >
            {isSubmitting ? (
              <span className="flex items-center justify-center gap-3">
                <i className="ri-loader-4-line animate-spin"></i>
                Sending Message...
              </span>
            ) : (
              <span className="flex items-center justify-center gap-3">
                <i className="ri-send-plane-fill"></i>
                Send Message
                <i className="ri-arrow-right-line"></i>
              </span>
            )}
          </button>
        </form>
      </div>
    </section>
  );
}
