import React from 'react';

const Newsletter = () => {
  return (
    <section id="newsletter" className="py-16 bg-gray-800 text-white drop-shadow-lg">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-6">Stay Updated</h2>
        <p className="text-lg mb-8">Sign up for our newsletter and never miss out on our latest updates and special offers!</p>
        <form className="max-w-md mx-auto">
          <div className="flex flex-col md:flex-row items-center">
            <input
              type="email"
              className="w-full md:w-2/3 px-4 py-2 rounded-lg mb-4 md:mb-0 md:mr-4 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              placeholder="Enter your email"
            />
            <button className="w-full md:w-1/3 bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-3 px-4 rounded-lg transition duration-300">Subscribe</button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default Newsletter;
