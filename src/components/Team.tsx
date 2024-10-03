import React from 'react';

const Team = () => {
  const teamMembers = [
    {
      name: "Alice Johnson",
      title: "Head Chef",
      bio: "Award-winning chef with over 20 years of experience in crafting delicious and innovative dishes.",
      photo: "https://via.placeholder.com/150"
    },
    {
      name: "Michael Smith",
      title: "Sous Chef",
      bio: "Culinary artist bringing creativity and passion to every plate.",
      photo: "https://via.placeholder.com/150"
    },
    {
      name: "Sara Lee",
      title: "Restaurant Manager",
      bio: "Ensures every guest has an unforgettable dining experience.",
      photo: "https://via.placeholder.com/150"
    }
  ];

  return (
    <section id="team" className="py-16 bg-white">
      <div className="container mx-auto text-center">
        <h2 className="text-4xl font-bold mb-12 text-gray-800">Meet Our Team</h2>
        <div className="grid md:grid-cols-3 gap-8">
          {teamMembers.map((member, index) => (
            <div key={index} className="bg-gray-100 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
              <img src={member.photo} alt={member.name} className="w-32 h-32 object-cover rounded-full mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-yellow-500 mb-2">{member.name}</h3>
              <p className="text-gray-700 mb-2">{member.title}</p>
              <p className="text-gray-600">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Team;
