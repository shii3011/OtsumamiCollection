import React from 'react';
import styles from './ContentCard.module.css';

type ContentCardProps = {
  rank: number;
  shouhinName: string;
  imagePath: string;
  link?: string; // optional（リンクがない場合もあるので）
};

const ContentCard: React.FC<ContentCardProps> = ({ rank, shouhinName, imagePath, link }) => {
  return (
    <div className={styles.ContentCard}>
      <h1>{rank} 位</h1>
      <h1>{shouhinName}</h1>
      <img src={imagePath} alt={shouhinName} />
      {link && (
        <a href={link} target="_blank" rel="noopener noreferrer" className={styles.linkButton}>
          🛒 サイトで見る
        </a>
      )}
    </div>
  );
};

export default ContentCard;
