import { FaFacebookF, FaTwitter, FaInstagram } from 'react-icons/fa';

const Footer: React.FC = () => {
  return (
    <footer className="relative bg-gray-900 text-white py-10 px-6">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-3 md:gap-4 justify-items-center text-center md:text-left">
        
        {/* Column 1 - Logo/Brand */}
        <div className="flex flex-col items-center md:items-start">
          <h1 className="text-2xl font-semibold tracking-wider">Restaurant Dashboard</h1>
          <p className="text-sm font-light opacity-80 mt-2">
            Revolutionizing the way you manage your restaurant.
          </p>
          <p className="text-xs font-light opacity-70 mt-4">
            &copy; {new Date().getFullYear()} All rights reserved.
          </p>
        </div>

        {/* Column 2 - Navigation Links */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-medium mb-4">Quick Links</h2>
          <nav className="flex flex-col space-y-3">
            <a href="#" className="text-sm font-light hover:text-yellow-400 transition-all duration-300">
              Privacy Policy
            </a>
            <a href="#" className="text-sm font-light hover:text-yellow-400 transition-all duration-300">
              Terms of Service
            </a>
            <a href="#" className="text-sm font-light hover:text-yellow-400 transition-all duration-300">
              Contact Us
            </a>
          </nav>
        </div>

        {/* Column 3 - Social Media */}
        <div className="flex flex-col items-center md:items-start">
          <h2 className="text-lg font-medium mb-4">Connect With Us</h2>
          <div className="flex justify-center md:justify-end space-x-6">
            <a href="#" className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-110">
              <FaFacebookF size={24} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-110">
              <FaTwitter size={24} />
            </a>
            <a href="#" className="hover:text-yellow-400 transition-all duration-300 transform hover:scale-110">
              <FaInstagram size={24} />
            </a>
          </div>
        </div>
      </div>

      {/* Bottom Design Element */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-600"></div>
    </footer>
  );
};

export default Footer;
