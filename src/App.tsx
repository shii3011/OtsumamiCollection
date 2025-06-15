import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from './client/pages/Header';
import Footer from './client/pages/Footer';
import HomePage from './client/pages/HomePage'; // ホーム画面をまとめたページ
import CategoryResultPage from './client/pages/CategoryResultPage'; // カテゴリページ（API呼び出し）

import styles from './App.module.css';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header />

        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/category/:name" element={<CategoryResultPage />} />
        </Routes>

        <Footer />
      </div>
    </BrowserRouter>
  );
};

export default App;
