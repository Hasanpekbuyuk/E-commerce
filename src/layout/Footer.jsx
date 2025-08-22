// components/Footer.jsx
import { Facebook, Instagram, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-gray-50 text-gray-600">
      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Üst kısım */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between border-b border-gray-200 pb-6 mb-6">
          <h2 className="text-xl font-bold text-gray-900">Bandage</h2>
          <div className="flex space-x-4 mt-4 md:mt-0">
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <Facebook size={20} />
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <Instagram size={20} />
            </a>
            <a href="#" className="text-blue-600 hover:text-blue-800">
              <Twitter size={20} />
            </a>
          </div>
        </div>

        {/* Orta kısım */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-5 gap-6">
          {/* Company Info */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Company Info</h3>
            <ul className="space-y-2">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Carrier</a></li>
              <li><a href="#">We are hiring</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Legal</h3>
            <ul className="space-y-2">
              <li><a href="#">About Us</a></li>
              <li><a href="#">Carrier</a></li>
              <li><a href="#">We are hiring</a></li>
              <li><a href="#">Blog</a></li>
            </ul>
          </div>

          {/* Features */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Features</h3>
            <ul className="space-y-2">
              <li><a href="#">Business Marketing</a></li>
              <li><a href="#">User Analytic</a></li>
              <li><a href="#">Live Chat</a></li>
              <li><a href="#">Unlimited Support</a></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Resources</h3>
            <ul className="space-y-2">
              <li><a href="#">IOS & Android</a></li>
              <li><a href="#">Watch a Demo</a></li>
              <li><a href="#">Customers</a></li>
              <li><a href="#">API</a></li>
            </ul>
          </div>

          {/* Get In Touch */}
          <div>
            <h3 className="font-semibold text-gray-900 mb-3">Get In Touch</h3>
            <form className="flex mb-2">
              <input
                type="email"
                placeholder="Your Email"
                className="flex-1 px-3 py-2 border border-gray-300 rounded-l-md focus:outline-none"
              />
              <button
                type="submit"
                className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600"
              >
                Subscribe
              </button>
            </form>
            <p className="text-sm text-gray-400">Lore imp sum dolor Amit</p>
          </div>
        </div>

        {/* Alt kısım */}
        <div className="text-sm text-gray-500 mt-8">
          Made With Love By Finland All Right Reserved
        </div>
      </div>
    </footer>
  );
};

export default Footer;
