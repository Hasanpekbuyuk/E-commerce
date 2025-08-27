import React from "react";
import { Facebook, Instagram, Twitter } from "lucide-react";

const teamMembers = [
  {
    name: "Username",
    role: "Profession",
    image: "/images/team3.jpg",
  },
  {
    name: "Username",
    role: "Profession",
    image: "/images/team3.jpg",
  },
  {
    name: "Username",
    role: "Profession",
    image: "/images/team3.jpg",
  },
  
];

const AboutPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-20">
      {/* Hero */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div className="space-y-5">
          <p className="text-sm font-semibold text-gray-500">ABOUT COMPANY</p>
          <h1 className="text-3xl md:text-4xl font-bold">ABOUT US</h1>
          <p className="text-gray-500">
            We know how large objects will act, but things on a small scale
          </p>
          <button className="bg-blue-500 text-white px-6 py-2 rounded">
            Get Quote Now
          </button>
        </div>
        <div>
          <img
            src="/images/about-hero.png"
            alt="about hero"
            className="w-full h-auto object-cover"
          />
        </div>
      </div>

      {/* Problems Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        <div>
          <h3 className="text-red-500 font-semibold">Problems trying</h3>
          <p className="font-medium text-gray-900">
            Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          </p>
        </div>
        <div className="text-gray-500">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 text-center gap-8">
        <div>
          <h2 className="text-2xl font-bold">15K</h2>
          <p className="text-gray-500">Happy Customers</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">150K</h2>
          <p className="text-gray-500">Monthly Visitors</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">15</h2>
          <p className="text-gray-500">Countries Worldwide</p>
        </div>
        <div>
          <h2 className="text-2xl font-bold">100+</h2>
          <p className="text-gray-500">Top Partners</p>
        </div>
      </div>

      {/* Video Section */}
      <div>
        <img
          src="/images/about-video.png"
          alt="video"
          className="w-full rounded-lg object-cover"
        />
      </div>

      {/* Team Section */}
      <div className="text-center space-y-8">
        <a href="/team" className="hover:text-blue-500">
        <h2 className="text-2xl font-bold">Meet Our Team</h2>
        </a>
        <p className="text-gray-500 max-w-xl mx-auto">
          Problems trying to resolve the conflict between the two major realms
          of Classical physics: Newtonian mechanics
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
          {teamMembers.map((member, idx) => (
            <div key={idx} className="space-y-3 text-center">
              <img
                src={member.image}
                alt={member.name}
                className="w-full h-[280px] object-cover rounded"
              />
              <div>
                <h3 className="font-semibold">{member.name}</h3>
                <p className="text-gray-500">{member.role}</p>
              </div>
              <div className="flex justify-center gap-4 text-gray-500">
                <Facebook size={18} />
                <Instagram size={18} />
                <Twitter size={18} />
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-8 items-center text-gray-500">
  {[
    "fa-hooli",
    "fa-lyft",
    "fa-pied-piper-hat",
    "fa-stripe",
    "fa-aws",
    "fa-reddit",
  ].map((icon, index) => (
    <i key={index} className={`fab ${icon} fa-3x mx-auto`}></i>
  ))}
</div>

      {/* CTA */}
      <div className="grid grid-cols-1 md:grid-cols-2 items-center bg-blue-500 rounded-lg overflow-hidden">
        <div className="p-10 space-y-4 text-white">
          <h2 className="text-2xl font-bold">Now Let’s grow Yours</h2>
          <p className="text-sm max-w-md">
            The gradual accumulation of information about atomic and small-scale
            behavior during the first quarter of the 20th
          </p>
          <button className="border border-white px-6 py-2 rounded">
            Button
          </button>
        </div>
        <div>
          <img
            src="/images/about-card.jpg"
            alt="cta"
            className="w-full h-full object-cover"
          />
        </div>
      </div>
    </div>
  );
};

export default AboutPage;
