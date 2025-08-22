// src/pages/TeamPage.jsx
import React from "react";
import { Link } from "react-router-dom";
import { Facebook, Instagram, Twitter, Linkedin } from "lucide-react";

const teamMembers = [
  {
    name: "Gökhan Özdemir",
    role: "Project Manager",
    image: "/images/team2.jpg",
  },
  {
    name: "Hasan Pekbüyük",
    role: "Full Stack Developer",
    image: "/images/team2.jpg",
  },
  {
    name: "username",
    role: "Frontend Developer",
    image: "/images/team2.jpg",
  },
  {
    name: "username",
    role: "Frontend Developer",
    image: "/images/team2.jpg",
  },
  {
    name: "username",
    role: "Frontend Developer",
    image: "/images/team2.jpg",
  },
  {
    name: "username",
    role: "Frontend Developer",
    image: "/images/team2.jpg",
  },
  {
    name: "username",
    role: "Frontend Developer",
    image: "/images/team2.jpg",
  },
  {
    name: "username",
    role: "Frontend Developer",
    image: "/images/team2.jpg",
  },
  {
    name: "username",
    role: "Frontend Developer",
    image: "/images/team2.jpg",
  },
];

const TeamPage = () => {
  return (
    <div className="max-w-7xl mx-auto px-4 py-10 space-y-16">
      {/* Hero */}
      <div className="text-center space-y-3">
        <p className="text-sm text-gray-500 tracking-wide">WHAT WE DO</p>
        <h1 className="text-3xl md:text-4xl font-bold">
          Innovation tailored for you
        </h1>
        <p className="text-gray-500">Home &gt; Team</p>
      </div>

      {/* Top Grid Images */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <img
          src="/images/team1.jpg"
          alt="banner1"
          className="w-full h-[400px] object-cover rounded"
        />
        <div className="grid grid-cols-2 gap-4 md:col-span-2">
          <img
            src="/images/team2.jpg"
            alt="banner2"
            className="w-full h-[195px] object-cover rounded"
          />
          <img
            src="/images/team2.jpg"
            alt="banner3"
            className="w-full h-[195px] object-cover rounded"
          />
          <img
            src="/images/team2.jpg"
            alt="banner4"
            className="w-full h-[195px] object-cover rounded"
          />
          <img
            src="/images/team2.jpg"
            alt="banner5"
            className="w-full h-[195px] object-cover rounded"
          />
        </div>
      </div>

      {/* Team Section */}
      <div className="text-center space-y-8">
        <h2 className="text-2xl font-bold">Meet Our Team</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
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
                <Link to="#">
                  <Facebook size={18} />
                </Link>
                <Link to="#">
                  <Instagram size={18} />
                </Link>
                <Link to="#">
                  <Twitter size={18} />
                </Link>
                <Link to="#">
                  <Linkedin size={18} />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="text-center space-y-4">
        <h2 className="text-2xl font-bold">Start your 14 days free trial</h2>
        <p className="text-gray-500 max-w-lg mx-auto">
          Met minim Mollie non desert Alamo est sit cliquey dolor do met sent.
          RELIT official consequent.
        </p>
        <button className="bg-blue-500 text-white px-6 py-2 rounded">
          Try it free now
        </button>
      </div>
    </div>
  );
};

export default TeamPage;
