import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { RakutenResponse } from '../../Utility/RakutenResponse'; // パスは環境に応じて調整

interface Props {
  item: RakutenResponse['Items'][number]['Item'];
  idx: number;
}

const ItemCarouselCard: React.FC<Props> = ({ item, idx }) => {
  return (
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
          <div
            key={index}
            style={{ height: '250px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
          >
            <img
              src={img.imageUrl.replace('_ex=128x128', '_ex=300x300')}
              alt={`${item.itemName}-${index}`}
              style={{ maxHeight: '100%', maxWidth: '100%', objectFit: 'contain' }}
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
  );
};

export default ItemCarouselCard;
