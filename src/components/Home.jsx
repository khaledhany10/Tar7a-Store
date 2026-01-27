import Hero from './Hero';
import NewArrivals from './NewArrivals';
import FabricTypes from './FabricTypes';
import Experience from './Experience';
import Testimonials from './Testimonials';
import ImageGallery from './ImageGallery';
import Newsletter from './Newsletter';
import { useLanguage } from '../context/LanguageContext';

const Home = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Hero />
      <NewArrivals />
      <FabricTypes />
      <Experience />
      <Testimonials />
      <ImageGallery />
      <Newsletter />
    </div>
  );
};

export default Home;