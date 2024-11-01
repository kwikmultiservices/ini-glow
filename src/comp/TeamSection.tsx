import React from 'react';

interface TeamMember {
  name: string;
  role: string;
  imageUrl: string;
}

const teamMembers: TeamMember[] = [
  {
    name: 'Dr Robert Andrew',
    role: 'Analysis & Advisor',
    imageUrl: '/image/f6.png', // Replace with the actual image URL
  },
  {
    name: 'Dr Robert Andrew',
    role: 'Analysis & Advisor',
    imageUrl: '/image/f7.png', // Replace with the actual image URL
  },
  {
    name: 'Dr Robert Andrew',
    role: 'Analysis & Advisor',
    imageUrl: '/image/f8.png', // Replace with the actual image URL
  },
  {
    name: 'Dr Robert Andrew',
    role: 'Analysis & Advisor',
    imageUrl: '/image/f9.png', // Replace with the actual image URL
  },
];

const TeamSection: React.FC = () => {
  return (
    <section className="py-12 bg-white">
      <div className="text-center mb-10">
        <h2 className="text-3xl font-semibold">Meet Our Team</h2>
      </div>
      <div className="max-w-6xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
        {teamMembers.map((member, index) => (
          <div key={index} className="text-center">
            <img
              src={member.imageUrl}
              alt={member.name}
              className="w-36 h-36 mx-auto rounded-full object-cover"
            />
            <h3 className="text-xl font-semibold mt-4">{member.name}</h3>
            <p className="text-gray-500">{member.role}</p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default TeamSection;
