import React from 'react';

interface FeatureCardProps {
  title: string;
  description: string;
  icon: JSX.Element;
  bgColor: string;
}

const FeatureCard: React.FC<FeatureCardProps> = ({ title, description, icon, bgColor }) => {
  return (
    <div className={`p-6 ${bgColor} shadow-md min-h-[40vh]`}>
      <div className="  items-center mb-4">
        <div className="text-2xl mr-3">{icon}</div>
        <h3 className="text-xl font-bold">{title}</h3>
      </div>
      <p className="text-sm">{description}</p>
    </div>
  );
};

export default FeatureCard;
