import React from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import styles from './ItemCarouselCard.module.css';
import { RakutenResponse } from '../../Utility/RakutenResponse';

interface Props {
  item: RakutenResponse['Items'][number]['Item'];
  idx: number;
}

const ItemCarouselCard: React.FC<Props> = ({ item, idx }) => {
  return (
    <div key={idx} className={styles.card}>
      <Carousel
        showThumbs={false}
        showStatus={false}
        infiniteLoop
        interval={4000}
        showArrows
        swipeable
        emulateTouch
      >
        {item.mediumImageUrls.map((img, index) => (
          <div key={index} className={styles.imageContainer}>
            <img
              src={img.imageUrl.replace('_ex=128x128', '_ex=300x300')}
              alt={`${item.itemName}-${index}`}
            />
          </div>
        ))}
      </Carousel>
      <h3 className={styles.itemName}>
        {item.itemName.length > 50 ? item.itemName.slice(0, 50) + '...' : item.itemName}
      </h3>
      <p className={styles.price}>💴 {item.itemPrice.toLocaleString()} 円</p>
      <p className={styles.shopName}>🏪 {item.shopName}</p>
      <a
        href={item.itemUrl}
        target="_blank"
        rel="noopener noreferrer"
        className={styles.link}
      >
        🔗 商品ページへ
      </a>
    </div>
  );
};

export default ItemCarouselCard;
