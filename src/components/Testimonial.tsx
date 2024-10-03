
const Testimonials = () => {
  const testimonials = [
    {
      name: "John Doe",
      review: "This service has been absolutely incredible! The attention to detail and professionalism is unmatched. I highly recommend them!",
      avatar: "https://via.placeholder.com/150", // Placeholder for avatar
      rating: 5
    },
    {
      name: "Jane Smith",
      review: "Amazing experience! The team went above and beyond to deliver exactly what I needed. I'll definitely be returning for future projects.",
      avatar: "https://via.placeholder.com/150",
      rating: 5
    },
    {
      name: "Robert Brown",
      review: "Professional and efficient. My project was completed ahead of schedule and the quality was top-notch!",
      avatar: "https://via.placeholder.com/150",
      rating: 4
    }
  ];

  return (
    <section id="testimonials" className="py-16 bg-black">
      <div className="container mx-auto text-center">
        <h2 className="text-5xl font-bold mb-12 text-white">Testimonials</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {testimonials.map((testimonial, index) => (
            <div key={index} className="bg-gray-800 p-6 rounded-lg shadow-lg transition-transform transform hover:-translate-y-2 duration-300">
              <img
                src={testimonial.avatar}
                alt={testimonial.name}
                className="w-20 h-20 object-cover rounded-full mx-auto mb-4 border-4 border-yellow-500"
              />
              <h3 className="text-2xl font-semibold text-white mb-2">{testimonial.name}</h3>
              <p className="text-gray-400 mb-4">"{testimonial.review}"</p>
              <div className="flex justify-center mb-2">
                {[...Array(testimonial.rating)].map((_, i) => (
                  <svg
                    key={i}
                    className="w-6 h-6 text-yellow-500"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.9 5.857h6.17c.957 0 1.358 1.23.588 1.81l-4.99 3.626 1.9 5.857c.3.922-.755 1.688-1.54 1.157L10 15.347l-4.97 3.63c-.785.53-1.84-.236-1.54-1.157l1.9-5.857-4.99-3.626c-.77-.579-.37-1.81.588-1.81h6.17l1.9-5.857z" />
                  </svg>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Testimonials;
