import { FaFacebookF, FaInstagram, FaYoutube } from "react-icons/fa";
import { Link } from "react-router";

const Footer = () => {
  return (
    <footer className="bg-[#FFFFFF] text-[#183883] border-t border-blue-100">
      <div className="max-w-8xl mx-auto px-4 lg:px-8 py-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
          
          {/* Logo + tagline */}
          <div className="flex flex-col items-center md:items-start text-center md:text-left gap-3">
            <img
              src="https://i.ibb.co/vxTSNL7B/Group-1.png"
              alt="Logo"
              className="w-36"
            />
            <p className="text-sm text-blue-500 max-w-xs">
              A modern platform to explore Scout books, members and resources in one place.
            </p>
          </div>

          {/* Quick Links */}
          <div className="flex flex-col items-center gap-3">
            <h4 className="font-semibold text-lg">Quick Links</h4>
            <div className="flex gap-4 flex-wrap justify-center">
              <Link to="/" className="hover:text-blue-500 transition">Home</Link>
              <a href="#about" className="hover:text-blue-500 transition">About</a>
              <a href="#Book" className="hover:text-blue-500 transition">Scout Book</a>
              <a href="#members" className="hover:text-blue-500 transition">Members</a>
              <Link to="/select" className="hover:text-blue-500 transition">Login</Link>
            </div>
          </div>

          {/* Social */}
          <div className="flex flex-col items-center md:items-end gap-3">
            <h4 className="font-semibold text-lg">Follow Us</h4>
            <div className="flex gap-3">
              <a
                href="#"
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-400 hover:text-white transition"
              >
                <FaFacebookF size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-400 hover:text-white transition"
              >
                <FaInstagram size={18} />
              </a>
              <a
                href="#"
                className="p-2 rounded-full bg-blue-100 hover:bg-blue-400 hover:text-white transition"
              >
                <FaYoutube size={18} />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="mt-8 pt-4 border-t border-blue-100 text-center text-sm text-blue-400">
          © {new Date().getFullYear()} Scout Unite. All rights reserved.
        </div>
      </div>
    </footer>
  );
};

export default Footer;
