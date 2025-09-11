"use client";

export default function LocationMap() {
  return (
    <section className="py-12 bg-white">
      <div className="max-w-2xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-8">
          <h2 className="text-3xl font-bold text-amber-900 mb-4">
            Find Our{" "}
            <span className="text-teal-700 font-pacifico">Showroom</span>
          </h2>
          <p className="text-lg text-amber-700/80">
            Visit us to experience our timepieces firsthand
          </p>
        </div>

        <div className="bg-gray-100 rounded-2xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d29473.580309934307!2d88.350643!3d22.571714!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3a0277a109422147%3A0xd6f3b51ea8c762be!2sAnglo%20Swiss%20Watch%20Co.!5e0!3m2!1sen!2sus!4v1755773529008!5m2!1sen!2sus"
            width="100%"
            height="400"
            style={{ border: 0 }}
            allowFullScreen
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            className="grayscale hover:grayscale-0 transition-all duration-500"
          ></iframe>
        </div>

        <div className="mt-8 bg-gradient-to-br from-teal-50 to-orange-50 rounded-2xl p-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-center">
            <div className="flex items-center justify-center gap-2 text-amber-800">
              <i className="ri-car-fill text-xl text-teal-600"></i>
              <span className="font-medium">Free Parking Available</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-amber-800">
              <i className="ri-subway-line text-xl text-orange-600"></i>
              <span className="font-medium">Metro Accessible</span>
            </div>
            <div className="flex items-center justify-center gap-2 text-amber-800">
              <i className="ri-wheelchair-line text-xl text-teal-600"></i>
              <span className="font-medium">Wheelchair Accessible</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
