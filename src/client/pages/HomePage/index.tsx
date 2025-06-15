import React from 'react';
import HeroSection from '../../Components/HeroSection';
import CategorySection from '../../Components/CategorySection';
import RakutenSection from '../../Components/RakutenSection';

const HomePage: React.FC = () => {
  return (
    <>
      <HeroSection />
      <CategorySection />
      <RakutenSection />
    </>
  );
};

export default HomePage;
