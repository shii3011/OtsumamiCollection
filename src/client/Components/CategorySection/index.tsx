import { useNavigate } from 'react-router-dom';
import React from 'react';
import styles from './CategorySection.module.css';
import fly from '../../../images/Fly.jpg';
import Vegetables from '../../../images/Vegetables.jpg';
import Cheese from '../../../images/Cheese.jpg';
import Fish from '../../../images/Fish.jpg';

const categories = [
  { name: '揚げ物', image: fly },
  { name: '野菜', image: Vegetables },
  { name: 'チーズ・乳製品', image: Cheese },
  { name: '魚', image: Fish },
];

const CategorySection: React.FC = () => {
  const navigate = useNavigate();

  return (
    <section className={styles.section}>
      <h1 className={styles.CategoryTitle}>人気のカテゴリー</h1>
      <div className={styles.grid}>
        {categories.map((cat, idx) => (
          <div
            key={idx}
            className={styles.card}
            onClick={() => navigate(`/category/${encodeURIComponent(cat.name)}`)}
            style={{ cursor: 'pointer' }}
          >
            <p className={styles.label}>{cat.name}</p>
            <img src={cat.image} alt={cat.name} className={styles.image} />
          </div>
        ))}
      </div>
    </section>
  );
};

export default CategorySection;
