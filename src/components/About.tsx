
const About: React.FC = () => { 
  return (
    <section id="about" className="relative py-16 bg-gradient-to-br from-gray-900 to-gray-800 text-white overflow-hidden">
      {/* Diagonal Cut */}
      <div className="absolute inset-0 w-full h-full transform -skew-y-3 bg-gradient-to-tr from-gray-800 to-gray-900 z-0"></div>
      
      <div className="relative z-10 container mx-auto text-center px-6">
        <h2 className="text-5xl font-bold mb-8 text-yellow-400 transform transition-all duration-300 hover:scale-105 hover:text-yellow-300">
          Discover Our Story
        </h2>
        <div className="md:flex md:justify-center md:items-center">
          {/* Image with hover effect */}
          <div className="relative md:w-1/3 w-full mb-8 md:mb-0 md:mr-8 transform transition-all duration-300 hover:scale-105 hover:rotate-1">
            <img 
              src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSobvimtzpqrIee7fVumEiluGa-cpilZegOaQ&s" 
              alt="Chef" 
              className="object-cover rounded-xl shadow-2xl hover:shadow-yellow-400 transition-shadow duration-300" 
            />
            {/* Decorative border effect */}
            <div className="absolute top-2 left-2 w-full h-full border-4 border-yellow-500 rounded-xl opacity-75 transform -rotate-2"></div>
          </div>

          {/* Text with an overlay */}
          <div className="md:w-2/3 text-left bg-gray-800 bg-opacity-80 p-6 rounded-lg shadow-xl">
            <p className="text-lg mb-4 text-gray-300">
              Our restaurant offers an exceptional dining experience with a rich heritage. We are passionate about using the finest ingredients to create memorable dishes that not only satisfy your hunger but your soul.
            </p>
            <p className="text-lg text-gray-300">
              Come join us and enjoy a delightful meal in an atmosphere that blends elegance with warmth. Our culinary journey awaits you.
            </p>
            {/* Call to action button */}
            <button className="mt-6 inline-flex text-white bg-yellow-500 border-0 py-3 px-6 focus:outline-none hover:bg-yellow-600 rounded-full text-lg shadow-lg transition-transform transform hover:scale-105">
              Learn More
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;
