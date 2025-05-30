import { BrowserRouter } from 'react-router-dom';
import Main from './client/Components/Main';
import Header from './client/Components/Header';
import Footer from './client/Components/Footer';
import styles from './App.module.css'
import HeroSection from './client/Components/HeroSection';
import CategorySection from './client/Components/CategorySection';
import RakutenSection from './client/Components/RakutenSection';

const App: React.FC = () => {
  return (
    <BrowserRouter>
      <div className={styles.App}>
        <Header/>
        <HeroSection/>
        <CategorySection/>
        <Main/>
        <RakutenSection/>
        <Footer/>
      </div>
    </BrowserRouter>
  );
}
export default App;

