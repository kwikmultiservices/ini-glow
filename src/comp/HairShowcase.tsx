// LatestNews.tsx
import React from 'react';

type NewsItemProps = {
  title: string;
  description: string;
  imageUrl: string;
};

const newsItems: NewsItemProps[] = [
  {
    title: "Get 30% Discount On All Plain Package",
    description: `Our Plain Packages include everything you need to achieve a radiant and healthy skin without the fuss. Whether you're new to skincare or prefer a streamlined routine, our plain packages are designed with high-quality and clean ingredients to bring out your natural glow.
At Iniglow, we believe in the power of simplicity! To celebrate our minimalist yet effective skincare solutions, we're offering 30% OFF on all Plain Packages for a limited time only!
`,
    imageUrl: "/image/i5.jpeg", // Replace with your actual image path or import statement
  },
  {
    title: "Our new anti aging serum",
    description: `Anti-aging serums are the powerhouse of modern skincare, delivering targeted ingredients like retinol, hyaluronic acid, and peptides deep into the skin. These potent formulas smooth fine lines, boost collagen, and enhance radiance, helping you maintain a youthful and glowing complexion. Whether you're aiming to prevent early signs of aging or reduce wrinkles, a few drops of serum can make all the difference. Elevate your skincare routine and embrace the future of ageless beauty!`,
    imageUrl: "/image/i6.jpeg",
  },
  {
    title: "Get 30% Discount on all hair oils",
    description: `Infused with nourishing vitamins, antioxidants and essential oils that deeply moisturize and revitalize your hair, our oils are suitable for all Hair Types: Whether curly, straight, or textured hair. we are dedicated to promoting strength, shine, and softness. Additionally, A blend of herbs and oils to promote healthier and thicker hair. Say goodbye to dry or damaged hair and hello to a silky and smooth hair as
we are offering 30% OFF on all hair oils.
`,
    imageUrl: "/image/i7.jpeg",
  },
  {
    title: "Improved Face Scrub",
    description: `newly improved face scrub with incorporated finely milled natural exfoliants, such as apricot kernels and bamboo powder, for gentle yet effective exfoliation. Additionally, it is enriched with antioxidant-rich ingredients like green tea and vitamin E to help protect the skin from environmental stressors. With added hydrating agents like aloe vera, this face scrub promises to leave skin feeling smoother, brighter, and more refreshed after every use...`,
    imageUrl: "/image/i8.jpeg",
  },
];

const NewsItem: React.FC<NewsItemProps> = ({ title, description, imageUrl }) => (
  <div className="flex flex-col md:flex-row gap-4 p-4 shadow-md rounded-lg">
    <img src={imageUrl} alt={title} className="w-full md:w-1/3 object-cover rounded-lg" />
    <div className="flex flex-col ">
      <h3 className="text-xl font-bold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  </div>
);

const LatestNews: React.FC = () => (
  <section className="py-10 px-4">
    <h2 className="text-center text-orange-600 font-bold text-lg uppercase mb-2">Latest News</h2>
    <p className="text-center text-gray-500 mb-6">Stay updated on our latest products and offers.</p>
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
      {newsItems.map((item, index) => (
        <NewsItem key={index} {...item} />
      ))}
    </div>
  </section>
);

export default LatestNews;
