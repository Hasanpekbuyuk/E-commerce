// src/pages/ContactPage.jsx
import React from "react";
import { Phone, Mail, MapPin } from "lucide-react";

const ContactPage = () => {
  return (
    <div className="w-full">
      {/* Hero Section */}
      <section className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between px-6 py-16">
        {/* Text */}
        <div className="md:w-1/2 space-y-4">
          <h4 className="uppercase text-sm font-semibold text-gray-500">
            Contact Us
          </h4>
          <h1 className="text-4xl font-bold text-gray-900 leading-snug">
            Get in touch <br /> today!
          </h1>
          <p className="text-gray-500">
            We know how large objects will act, <br />
            but things on a small scale
          </p>

          <div className="space-y-2 text-gray-800">
            <p>
              <span className="font-semibold">Phone :</span> +451 215 215
            </p>
            <p>
              <span className="font-semibold">Fax :</span> +451 215 215
            </p>
          </div>

          {/* Social Icons */}
          <div className="flex space-x-4 pt-2">
            <a href="#" className="text-gray-700 hover:text-blue-600">
              <i className="fab fa-facebook-f text-xl"></i>
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              <i className="fab fa-twitter text-xl"></i>
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              <i className="fab fa-instagram text-xl"></i>
            </a>
            <a href="#" className="text-gray-700 hover:text-blue-600">
              <i className="fab fa-linkedin-in text-xl"></i>
            </a>
          </div>
        </div>

        {/* Image */}
        <div className="md:w-1/2 flex justify-center mt-10 md:mt-0">
          <img
            src="/images/contact-hero.png" // kendi görselini buraya koy
            alt="Contact"
            className="max-w-sm md:max-w-md"
          />
        </div>
      </section>

      {/* Visit Office Section */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-4xl mx-auto text-center">
          <h5 className="uppercase text-sm font-semibold text-gray-500">
            Visit Our Office
          </h5>
          <h2 className="text-3xl font-bold text-gray-900 mb-12">
            We help small businesses with big ideas
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* Card 1 */}
            <div className="border rounded-lg p-6 flex flex-col items-center">
              <Phone className="w-10 h-10 text-blue-500 mb-4" />
              <p className="text-gray-700">georgia.young@example.com</p>
              <p className="text-gray-700">georgia.young@ple.com</p>
              <h4 className="font-bold mt-2">Get Support</h4>
              <button className="mt-4 border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-50">
                Submit Request
              </button>
            </div>

            {/* Card 2 (Dark) */}
            <div className="bg-[#252B42] text-white rounded-lg p-6 flex flex-col items-center">
              <MapPin className="w-10 h-10 mb-4" />
              <p>georgia.young@example.com</p>
              <p>georgia.young@ple.com</p>
              <h4 className="font-bold mt-2">Get Support</h4>
              <button className="mt-4 bg-white text-blue-900 px-4 py-2 rounded-full hover:bg-gray-200">
                Submit Request
              </button>
            </div>

            {/* Card 3 */}
            <div className="border rounded-lg p-6 flex flex-col items-center">
              <Mail className="w-10 h-10 text-blue-500 mb-4" />
              <p className="text-gray-700">georgia.young@example.com</p>
              <p className="text-gray-700">georgia.young@ple.com</p>
              <h4 className="font-bold mt-2">Get Support</h4>
              <button className="mt-4 border border-blue-500 text-blue-500 px-4 py-2 rounded-full hover:bg-blue-50">
                Submit Request
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Let's Talk Section */}
      <section className="py-20 text-center">
        <h5 className="uppercase text-sm font-semibold text-gray-500">
          We can’t wait to meet you
        </h5>
        <h2 className="text-4xl font-bold text-gray-900 mt-2 mb-6">
          Let’s Talk
        </h2>
        <button className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600">
          Try it free now
        </button>
      </section>
    </div>
  );
};

export default ContactPage;
