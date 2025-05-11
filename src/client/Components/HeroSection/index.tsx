import React from 'react';
import styles from './HeroSection.module.css';

const HeroSection: React.FC = () => {
  return (
    <div className={styles.HeroSection}>
      <button className={styles.SearchButton}>商品を探す</button>
    </div>
  );
};

export default HeroSection;
