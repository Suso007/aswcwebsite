"use client";

export default function ContactInfo() {
  const contactDetails = [
    {
      icon: "ri-map-pin-fill",
      title: "Registered Address",
      address:
        "6, Binoy Badal Dinesh Bag E, B.B.D. Bagh, East, West Bengal 700001",

      color: "from-amber-500 to-orange-600",
    },
    {
      icon: "ri-store-2-fill",
      title: "Watch & Clocks (Sales)",
      phones: ["2230-0295", "2230-0297"],
      description: "For showroom inquiries",
      color: "from-teal-500 to-teal-600",
    },
    {
      icon: "ri-fingerprint-fill",
      title: "Biometric & Access Control Automation",
      phones: ["033-22847116", "033-40672089", "8420112012"],
      description: "For sales & services",
      color: "from-orange-500 to-red-500",
    },
    {
      icon: "ri-mail-fill",
      title: "Email Us",
      emails: ["info@angloswiss.in", "service@angloswiss.in"],
      description: "General Inquiries • Watch Service",
      color: "from-teal-600 to-teal-700",
    },
  ];

  const supportContacts = [
    {
      role: "Watch Showroom (Sales)",
      name: "Mr. Ahmed Sualeh",
      phones: ["+91-9230646965", "+91-7003889225", "+91-7603006220"],
    },
    {
      role: "Watch Repairs",
      name: "Mr. Sajid Ismail",
      phones: ["+91-9230560003", "4066-1052"],
    },
    {
      role: "Security Product & Customized Solutions (Sales)",
      name: "Mr. Mofiqul Islam",
      phones: ["+91-9230023018"],
    },
    {
      role: "Biometric Attendance System Support",
      name: "Mr. Dibyendu Bhattacharya",
      phones: ["+91-9230506656"],
    },
  ];

  return (
    <section className="py-24 bg-gradient-to-br from-teal-50 to-orange-50">
      <div className="max-w-4xl mx-auto px-6 lg:px-12">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold text-amber-900 mb-4">
            Contact{" "}
            <span className="text-teal-700 font-pacifico">Information</span>
          </h2>
          <p className="text-xl text-amber-700/80">
            Reach us through multiple channels for sales & support
          </p>
        </div>

        {/* Contact Summary Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {contactDetails.map((detail, index) => (
            <div
              key={index}
              className="bg-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 group"
            >
              <div
                className={`w-16 h-16 bg-gradient-to-br ${detail.color} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}
              >
                <i className={`${detail.icon} text-2xl text-white`}></i>
              </div>
              <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                {detail.title}
              </h3>

              {/* Address */}
              {detail.address && (
                <p className="text-amber-900 mb-2 text-sm">{detail.address}</p>
              )}

              {/* Emails */}
              {detail.emails && (
                <div className="flex flex-col gap-1 mb-1">
                  {detail.emails.map((email, i) => (
                    <a
                      key={i}
                      href={`mailto:${email}`}
                      className="text-lg font-semibold text-teal-600 hover:underline"
                    >
                      {email}
                    </a>
                  ))}
                </div>
              )}

              {/* Phones */}
              {detail.phones && (
                <div className="flex flex-wrap gap-2 mb-1">
                  {detail.phones.map((phone, i) => (
                    <a
                      key={i}
                      href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                      className="text-lg font-semibold text-teal-600 hover:underline"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              )}

              {/* Optional description */}
              {detail.description && (
                <p className="text-amber-700/70 text-sm">
                  {detail.description}
                </p>
              )}
            </div>
          ))}
        </div>

        {/* Support Contacts Section */}
        <div className="bg-white rounded-3xl p-8 shadow-lg mb-12">
          <h3 className="text-2xl font-bold text-amber-900 mb-6 text-center">
            Call Us
          </h3>
          <div className="space-y-6">
            {supportContacts.map((contact, index) => (
              <div
                key={index}
                className="border-b border-amber-200 pb-4 last:border-0"
              >
                <h4 className="text-lg font-semibold text-teal-700">
                  {contact.role}
                </h4>
                <p className="text-amber-900 font-medium">{contact.name}</p>
                <div className="flex flex-wrap gap-2 mt-2">
                  {contact.phones.map((phone, i) => (
                    <a
                      key={i}
                      href={`tel:${phone.replace(/[^0-9+]/g, "")}`}
                      className="text-teal-600 hover:underline text-sm"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Office Hours Section */}
        <div className="bg-white rounded-3xl p-8 shadow-lg text-center">
          <h3 className="text-2xl font-bold text-amber-900 mb-4">
            Office Hours
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold text-teal-700 mb-2">Showroom</h4>
              <p className="text-amber-800 text-sm">
                Monday - Saturday: 9:00 AM - 7:00 PM
              </p>
              <p className="text-amber-800 text-sm">
                Sunday: 10:00 AM - 5:00 PM
              </p>
            </div>
            <div>
              <h4 className="font-semibold text-teal-700 mb-2">
                Support Center
              </h4>
              <p className="text-amber-800 text-sm">24/7 Technical Support</p>
              <p className="text-amber-800 text-sm">
                Emergency Service Available
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
