import React from 'react';

import { FaBitcoin, FaWallet, FaMoneyCheck } from 'react-icons/fa';
import FeatureCard from './FeatureCardProps';

const FeatureSection: React.FC = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mt-8">
      <FeatureCard
        title="Exchange Fiat For Crypto"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna."
        icon={<FaBitcoin />}
        bgColor="bg-yellow-500 text-white"
      />
      <FeatureCard
        title="Bitcoin Wallet"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna."
        icon={<FaWallet />}
        bgColor="bg-gray-100"
      />
      <FeatureCard
        title="Digital Money"
        description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut et massa mi. Aliquam in hendrerit urna."
        icon={<FaMoneyCheck />}
        bgColor="bg-gray-100"
      />
    </div>
  );
};

export default FeatureSection;
