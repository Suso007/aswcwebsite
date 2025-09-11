'use client';

import Image from 'next/image';

export default function ServicePhotos() {

  const Images = [
    { src: '/images/service2.jpg' }
  ];

  return (
    <section className="py-12 bg-gradient-to-br from-teal-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">

        {/* Service Cards */}
        <div className="grid grid-cols-1 gap-8"> {/* Always 1 column */}
          {Images.map((image, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 cursor-pointer group"
            >
              <Image
                src={image.src}
                alt={`Service ${index + 1}`}
                width={100}   // Larger width
                height={20}   // Larger height
                className="w-full h-auto object-cover rounded-lg mb-4"
              />
            </div>
          ))}
        </div>

        {/* Office Hours */}
        <div className="mt-12 bg-white rounded-3xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-amber-900 mb-4">Office Hours</h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-teal-700 mb-2">Showroom</h4>
              <p className="text-amber-800 text-sm">Monday - Saturday: 9:00 AM - 7:00 PM</p>
              <p className="text-amber-800 text-sm">Sunday: 10:00 AM - 5:00 PM</p>
            </div>

            <div>
              <h4 className="font-semibold text-teal-700 mb-2">Support Center</h4>
              <p className="text-amber-800 text-sm">24/7 Technical Support</p>
              <p className="text-amber-800 text-sm">Emergency Service Available</p>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
