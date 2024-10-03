import React from 'react';

const CallToAction = () => {
  return (
    <section id="cta" className="py-16 bg-yellow-500 text-center">
      <div className="container mx-auto">
        <h2 className="text-4xl font-bold text-white mb-4">Ready to Experience Our Best?</h2>
        <p className="text-lg text-gray-100 mb-8">Order now and enjoy a unique dining experience delivered to your doorstep.</p>
        <button className="bg-black hover:bg-gray-800 text-white font-bold py-3 px-8 rounded-lg transition duration-300">Order Now</button>
      </div>
    </section>
  );
};

export default CallToAction;
