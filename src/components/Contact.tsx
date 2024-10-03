import React from 'react';

const Contact = () => {
  return (
    <section id="contact" className="py-16 bg-black">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12 text-white">Contact Us</h2>
        <div className="max-w-lg mx-auto bg-gray-800 p-8 rounded-lg shadow-lg">
          <form>
            {/* Name Input */}
            <div className="mb-6">
              <label htmlFor="name" className="block text-gray-300 font-semibold mb-2">Name</label>
              <input 
                type="text" 
                id="name" 
                name="name" 
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300" 
                placeholder="Enter your name" 
              />
            </div>

            {/* Email Input */}
            <div className="mb-6">
              <label htmlFor="email" className="block text-gray-300 font-semibold mb-2">Email</label>
              <input 
                type="email" 
                id="email" 
                name="email" 
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300" 
                placeholder="Enter your email" 
              />
            </div>

            {/* Message Input */}
            <div className="mb-6">
              <label htmlFor="message" className="block text-gray-300 font-semibold mb-2">Message</label>
              <textarea 
                id="message" 
                name="message" 
                rows={4} 
                className="w-full px-4 py-3 bg-gray-700 text-white border border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:border-transparent transition duration-300" 
                placeholder="Enter your message"
              />
            </div>

            {/* Submit Button */}
            <button 
              type="submit" 
              className="w-full bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 rounded-lg shadow-lg transition-transform transform hover:-translate-y-1 duration-300"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </section>
  );
};

export default Contact;
