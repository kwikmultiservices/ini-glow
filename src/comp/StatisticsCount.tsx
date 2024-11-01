import React, { useEffect, useState } from "react";

const StatisticsSection: React.FC = () => {
  // States to hold the current number for each statistic
  const [yearsExperience, setYearsExperience] = useState(0);
  const [topAdvisors, setTopAdvisors] = useState(0);
  const [happyClients, setHappyClients] = useState(0);

  // Function to increment counters
  const countUp = (target: number, setState: React.Dispatch<React.SetStateAction<number>>, speed: number) => {
    let count = 0;
    const interval = setInterval(() => {
      count += 1;
      setState(count);
      if (count === target) clearInterval(interval);
    }, speed);
  };

  useEffect(() => {
    // Start counting up when the component mounts
    countUp(5, setYearsExperience, 200);  // 5+ years of experience
    countUp(15, setTopAdvisors, 100);     // 15 top advisors
    countUp(3000, setHappyClients, 1);    // 3k happy clients, faster speed for larger number
  }, []);

  return (
    <div className="bg-yellow-500 py-12 px-5">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 text-white text-center">
        {/* Years of Experience */}
        <div>
          <h3 className="text-6xl font-bold">{yearsExperience}<span className="text-4xl">+</span></h3>
          <p className="text-lg font-semibold mt-2">YEARS OF EXPERIENCE</p>
          <p className="text-sm mt-1">Lorem ipsum dolor sit amet consectetur.</p>
        </div>

        {/* Top Advisor */}
        <div>
          <h3 className="text-6xl font-bold">{topAdvisors}</h3>
          <p className="text-lg font-semibold mt-2">TOP ADVISOR</p>
          <p className="text-sm mt-1">Lorem ipsum dolor sit amet conur.</p>
        </div>

        {/* Happy Clients */}
        <div>
          <h3 className="text-6xl font-bold">{happyClients.toLocaleString()}<span className="text-4xl">+</span></h3>
          <p className="text-lg font-semibold mt-2">HAPPY CLIENTS</p>
          <p className="text-sm mt-1">Lorem ipsum dolor sit amet consectetur.</p>
        </div>
      </div>
    </div>
  );
};

export default StatisticsSection;
