import React, { useEffect } from 'react';

const Hero = () => {

  return (
    <>
      <section className="bg-gradient-to-r from-gray-900 to-gray-800 text-white body-font">
        <div className="container mx-auto flex px-5 py-24 md:flex-row flex-col items-center">
          <div className="lg:flex-grow md:w-1/2 lg:pr-24 md:pr-16 flex flex-col md:items-start md:text-left mb-16 md:mb-0 items-center text-center">
            <h1 className="title-font sm:text-5xl text-4xl mb-4 font-bold text-yellow-400">
              Before they sold out
              <br className="hidden lg:inline-block" />Readymade Gluten
            </h1>
            <p className="mb-8 leading-relaxed text-gray-300">
              Copper mug try-hard pitchfork pour-over freegan heirloom neutra air plant cold-pressed tacos poke beard tote bag. 
              Heirloom echo park mlkshk tote bag selvage hot chicken authentic tumeric truffaut hexagon try-hard chambray.
            </p>
            <div className="flex justify-center">
              <button className="inline-flex text-white bg-yellow-500 border-0 py-3 px-8 focus:outline-none hover:bg-yellow-600 rounded-full text-lg shadow-lg">
                Get Started
              </button>
              <button className="ml-4 inline-flex text-gray-200 bg-gray-700 border-0 py-3 px-8 focus:outline-none hover:bg-gray-600 rounded-full text-lg shadow-lg">
                Learn More
              </button>
            </div>
          </div>
          <div className="lg:max-w-lg lg:w-full md:w-1/2 w-5/6">
            <img className="object-cover object-center rounded-lg shadow-sm" alt="hero" src="https://static.vecteezy.com/system/resources/previews/024/589/160/non_2x/top-view-pizza-with-ai-generated-free-png.png" />
          </div>
        </div>
      </section>

    </>
  );
};

export default Hero;
