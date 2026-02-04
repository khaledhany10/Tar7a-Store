import { lazy, Suspense } from 'react';
import { useLanguage } from '../context/LanguageContext';

// Lazy loading للمكونات
const Hero = lazy(() => import('./Hero'));
const NewArrivals = lazy(() => import('./NewArrivals'));
const FabricTypes = lazy(() => import('./FabricTypes'));
const Experience = lazy(() => import('./Experience'));
const Testimonials = lazy(() => import('./Testimonials'));
const ImageGallery = lazy(() => import('./ImageGallery'));
const Newsletter = lazy(() => import('./Newsletter'));

// Skeleton loader لـ Home
const HomeSkeleton = () => (
  <div className="min-h-screen bg-background-light dark:bg-background-dark">
    {/* Hero Skeleton */}
    <div className="animate-pulse">
      <div className="h-screen bg-gradient-to-br from-primary/5 via-white/50 to-purple-50/50 dark:from-primary/10 dark:via-gray-900 dark:to-purple-900/10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-20 md:py-28">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="space-y-6">
              <div className="h-4 w-48 bg-gray-200 dark:bg-gray-700 rounded"></div>
              <div className="h-12 bg-gray-200 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
              <div className="h-10 bg-gray-200 dark:bg-gray-700 rounded w-40"></div>
            </div>
            <div className="h-96 bg-gray-200 dark:bg-gray-700 rounded-xl"></div>
          </div>
        </div>
      </div>
    </div>
  </div>
);

const Home = () => {
  const { language } = useLanguage();

  return (
    <div className="min-h-screen bg-background-light dark:bg-background-dark">
      <Suspense fallback={<HomeSkeleton />}>
        <Hero />
        <NewArrivals />
        <FabricTypes />
        <Experience />
        <Testimonials />
        <ImageGallery />
        <Newsletter />
      </Suspense>
    </div>
  );
};

export default Home;