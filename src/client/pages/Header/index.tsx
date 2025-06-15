import React from 'react';
import { Link } from 'react-router-dom';
import styles from './header.module.css';

const Header: React.FC = () => {
  return (
    <header className={styles.header}>
      <div className={styles.headerWrapper}>
        <h1 className={styles.title}>
          <Link to="/" className={styles.link}>🍶 おつまみコレクション</Link>
        </h1>
        <nav className={styles.nav}>
          <Link to="/search" className={styles.navLink}>商品検索</Link>
          <Link to="/category" className={styles.navLink}>人気カテゴリー</Link>
          <Link to="/ranking" className={styles.navLink}>総合ランキング</Link>
          <Link to="/about" className={styles.navLink}>このアプリについて</Link>
        </nav>
      </div>
    </header>
  );
};

export default Header;
