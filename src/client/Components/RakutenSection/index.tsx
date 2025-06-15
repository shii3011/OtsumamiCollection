import React, { useEffect, useState } from 'react';
import { RakutenResponse } from '../../Utility/RakutenResponse';
import ItemCarouselCard from '../ItemCarouselCard';

type RakutenSectionProps = {
  query?: string; // オプションのクエリパラメータ 
}
const RakutenSection: React.FC<RakutenSectionProps> = (props) => {
  // Items[].Item 型だけを使いたい
  const [items, setItems] = useState<RakutenResponse['Items'][0]['Item'][]>([]);
  const [loading, setLoading] = useState(true);
  const baseUrl = process.env.REACT_APP_API_BASE_URL;

  useEffect(() => {
    const fetchRakuten = async () => {
      setLoading(true);
      try {
        const response = await fetch(
          `${baseUrl}/api/Rakuten?keyword=${encodeURIComponent(props.query || '')}`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );
        const data: RakutenResponse = await response.json();
        const flatItems = data.Items.map(entry => entry.Item);
        setItems(flatItems);
      } catch (err) {
        console.error('楽天APIの取得に失敗', err);
      } finally {
        setLoading(false);
      }
    };

    fetchRakuten();
  }, [baseUrl, props.query]);

  if (loading) return <p>読み込み中...</p>;

  return (
    <section>
      <h2>楽天市場</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {items.map((item, idx) => (
          <ItemCarouselCard item={item} idx={idx}></ItemCarouselCard>
        ))}
      </div>
    </section>
  );
};

export default RakutenSection;
