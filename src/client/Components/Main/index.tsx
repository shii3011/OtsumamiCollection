import styles from './Main.module.css';
import ContentCard from '../../pages/ContentCard';
import React, { useEffect, useState } from 'react';

type Otsumami = {
  id: number;
  shouhinName: string;
  imagePath: string;
  description: string;
  link: string;
  likes: number;
};

const Main: React.FC = () => {
  const [otsumamiList, setOtsumamiList] = useState<Otsumami[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOtsumami = async () => {
      try {
        const response = await fetch('https://otsumamicollection.onrender.com/api/Otsumamis');
  
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
  
        const data: Otsumami[] = await response.json();
        setOtsumamiList(data);
      } catch (error) {
        console.error('データ取得に失敗しました', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchOtsumami();
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
    <div className={styles.Main}>
      <h1 className={styles.CategoryTitle}>総合ランキング</h1>
      <div className={styles.CardWrapper}>
        {otsumamiList.map((item, rank) => (
          <ContentCard
            key={item.id}
            rank={rank + 1}
            shouhinName={item.shouhinName}
            imagePath={item.imagePath}
            link={item.link}
            likes={item.likes}
          />
        ))}
      </div>
    </div>
  );
};

export default Main;
