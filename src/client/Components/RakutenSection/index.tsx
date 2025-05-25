import React, { useEffect, useState } from 'react';
import { RakutenResponse } from '../../Utility/type';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css'; // ✅ これを追加

const RakutenSection: React.FC = () => {
  // Items[].Item 型だけを使いたい
  const [items, setItems] = useState<RakutenResponse['Items'][0]['Item'][]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRakuten = async () => {
      try {
        const response = await fetch('http://localhost:3001/api/Rakuten');
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
  }, []);

  if (loading) return <p>読み込み中...</p>;

  return (
    <section>
      <h2>🧀 楽天チーズおつまみ一覧</h2>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '16px' }}>
        {items.map((item, idx) => (
          <div key={idx} style={{ border: '1px solid #ccc', padding: '10px', width: '250px' }}>
          <Carousel
            showThumbs={false}
            showStatus={false}
            infiniteLoop
            autoPlay
            interval={4000}
            showArrows
            swipeable
            emulateTouch
          >
            {item.mediumImageUrls.map((img, index) => (
              <div key={index} style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={img.imageUrl.replace('_ex=128x128', '_ex=300x300')} // 高解像度に変更
                  alt={`${item.itemName}-${index}`}
                  style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }} // 伸びすぎ防止
                />
              </div>
            ))}
          </Carousel>
            <h3>{item.itemName}</h3>
            <p>💴 {item.itemPrice} 円</p>
            <p>🏪 {item.shopName}</p>
            <a href={item.itemUrl} target="_blank" rel="noopener noreferrer">
              🔗 商品ページへ
            </a>
          </div>
        ))}
      </div>
    </section>
  );
};

export default RakutenSection;
