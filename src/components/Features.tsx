
const Features = () => {
  const features = [
    {
      title: "High-Quality Ingredients",
      description: "We use only the finest ingredients to ensure every dish is full of flavor and freshness.",
      icon: "https://via.placeholder.com/80"
    },
    {
      title: "Fast Delivery",
      description: "Enjoy quick and efficient delivery, so your meal is always fresh and on time.",
      icon: "https://via.placeholder.com/80"
    },
    {
      title: "Exceptional Service",
      description: "Our team is dedicated to providing a delightful dining experience every time.",
      icon: "https://via.placeholder.com/80"
    },
  ];

  return (
    <section id="features" className="py-16 bg-gray-100">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold text-gray-800 mb-12">Why Choose Us</h2>
        <div className="grid md:grid-cols-3 gap-12">
          {features.map((feature, index) => (
            <div key={index} className="bg-white p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={feature.icon} alt={feature.title} className="mx-auto mb-4" />
              <h3 className="text-2xl font-semibold mb-4 text-yellow-500">{feature.title}</h3>
              <p className="text-gray-700">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
