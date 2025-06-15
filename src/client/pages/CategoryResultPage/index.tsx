import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { RakutenResponse } from '../../Utility/RakutenResponse';
import ItemCarouselCard from '../../Components/ItemCarouselCard';

const CategoryResultPage: React.FC = () => {
  const { name } = useParams();
  const [items, setItems] = useState<RakutenResponse['Items'][0]['Item'][]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const response = await fetch(`${baseUrl}/api/Rakuten?keyword=${encodeURIComponent(name || '')}`);
        const data: RakutenResponse = await response.json();
        setItems(data.Items.map(entry => entry.Item));
      } catch (err) {
        console.error('API取得失敗', err);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [name]);
  if (loading) return <p>読み込み中...</p>;
  if (!items.length) return <p>「{name}」に関連する商品は見つかりませんでした。</p>;
  return (
    <section>
      <h2>「{name}」の検索結果</h2>
      {loading ? (
        <p>読み込み中...</p>
      ) : (
        <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
          {items.map((item, idx) => (
            <ItemCarouselCard key={idx} item={item} idx={idx} />
          ))}
        </div>
      )}
    </section>
  );
};

export default CategoryResultPage;
