"use client";

import { useState, useEffect, useRef } from "react";

type TeamMember = {
  id: number;
  name: string;
  position: string;
  experience: string;
  image: string;
  bio: string;
  linkedin?: string | null;
  email?: string | null;
};

export default function TeamSection() {
  const [isVisible, setIsVisible] = useState(false);
  const [team, setTeam] = useState<TeamMember[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  // Fetch team data from API
  useEffect(() => {
    async function loadTeam() {
      try {
        const res = await fetch("/api/team");
        const data = await res.json();
        setTeam(data);
      } catch (err) {
        console.error("❌ Error fetching team:", err);
      }
    }
    loadTeam();
  }, []);

  // Intersection Observer for animation
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setIsVisible(true);
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) observer.observe(sectionRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white/50">
      <div className="max-w-7xl mx-auto px-6 lg:px-12">
        {/* Heading */}
        <div
          className={`text-center mb-16 transition-all duration-1000 ease-out ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <h2 className="text-4xl lg:text-5xl font-bold text-amber-900 mb-4">
            Meet Our{" "}
            <span className="text-teal-700 font-pacifico">Expert Team</span>
          </h2>
          <p className="text-xl text-amber-700/80 max-w-3xl mx-auto">
            The passionate professionals behind TimeZone&apos;s commitment to
            excellence
          </p>
        </div>

        {/* Team Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {team.map((member, index) => (
            <div
              key={member.id}
              className={`bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-500 transform hover:scale-105 group cursor-pointer ${
                isVisible
                  ? "opacity-100 translate-y-0"
                  : "opacity-0 translate-y-8"
              }`}
              style={{ transitionDelay: `${index * 150}ms` }}
            >
              {/* Image + Hover Bio */}
              <div className="relative overflow-hidden">
                <img
                  src={member.image}
                  alt={member.name}
                  className="w-full h-80 object-cover object-top transition-transform duration-700 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="absolute bottom-4 left-4 right-4">
                    <div className="bg-white/90 backdrop-blur-sm rounded-xl p-3">
                      <p className="text-amber-800 text-sm leading-relaxed">
                        {member.bio}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Details */}
              <div className="p-6 text-center">
                <h3 className="text-xl font-bold text-amber-900 mb-2 group-hover:text-teal-700 transition-colors duration-300">
                  {member.name}
                </h3>
                <p className="text-teal-600 font-semibold mb-2">
                  {member.position}
                </p>
                <p className="text-amber-700/70 text-sm mb-4">
                  {member.experience}
                </p>

                {/* Socials */}
                <div className="flex justify-center gap-3">
                  {member.linkedin && (
                    <a
                      href={member.linkedin}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="w-10 h-10 bg-teal-100 hover:bg-teal-200 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer"
                    >
                      <i className="ri-linkedin-fill text-teal-600"></i>
                    </a>
                  )}
                  {member.email && (
                    <a
                      href={`mailto:${member.email}`}
                      className="w-10 h-10 bg-orange-100 hover:bg-orange-200 rounded-full flex items-center justify-center transition-colors duration-300 cursor-pointer"
                    >
                      <i className="ri-mail-fill text-orange-600"></i>
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
