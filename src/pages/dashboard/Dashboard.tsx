import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Card from '../../components/card/Card';
import axios from 'axios';
import Alert from '../../components/alert/Alert';

type ServiceFunction = () => Promise<{ meta: { total: number } }>;

const dataServices: Record<
  string,
  () => Promise<{ default: ServiceFunction }>
> = {
  carousel: () => import('../../services/carousel'),
  product: () => import('../../services/product'),
  portfolioImages: () => import('../../services/portfolioImages'),
  portfolioReview: () => import('../../services/portfolioReview'),
  messages: () => import('../../services/messages'),
  users: () => import('../../services/user'),
};

type DataCategory = {
  title: string;
  key: keyof typeof dataServices;
  total: number;
};

const Dashboard = () => {
  const [categories, setCategories] = useState<DataCategory[]>([
    { title: 'Carousels', key: 'carousel', total: 0 },
    { title: 'Services & Products', key: 'product', total: 0 },
    { title: 'Portfolio Images', key: 'portfolioImages', total: 0 },
    { title: 'Portfolio Reviews', key: 'portfolioReview', total: 0 },
    { title: 'Messages', key: 'messages', total: 0 },
    { title: 'Users', key: 'users', total: 0 },
  ]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const fetchAllData = async () => {
      try {
        const results = await Promise.all(
          Object.entries(dataServices).map(async ([key, service]) => {
            const module = await service();
            const fetchFunction = module.default;
            const response = await fetchFunction();
            return { key, total: response.meta?.total || 0 };
          })
        );

        if (isMounted) {
          setCategories((prev) =>
            prev.map((cat) => {
              const result = results.find((r) => r.key === cat.key);
              return result ? { ...cat, total: result.total } : cat;
            })
          );
        }
      } catch (error) {
        if (isMounted) {
          setError(
            axios.isAxiosError(error) ? 'Failed to load data' : 'Network error'
          );
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchAllData();

    return () => {
      isMounted = false;
    };
  }, []);

  return (
    <div className='min-h-screen p-4 md:p-6 bg-gray-50'>
      <Breadcrumb main='Dashboard' sub='Dashboard' />

      <div className='max-w-7xl mx-auto'>
        <h1 className='text-3xl md:text-4xl font-bold text-gray-900'>
          Welcome to the Dashboard
        </h1>

        {error && (
          <Alert
            message={error}
            status='error'
            onClose={() => setError('')}
            className='mt-8'
          />
        )}

        <div className='mt-6 md:mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 2xl:grid-cols-6 gap-4'>
          {isLoading
            ? Array.from({ length: 6 }).map((_, idx) => (
                <Card key={idx}>
                  <div className='p-4 animate-pulse'>
                    <div className='h-6 bg-gray-200 rounded w-3/4 mb-4'></div>
                    <div className='h-4 bg-gray-200 rounded w-1/2'></div>
                  </div>
                </Card>
              ))
            : categories.map((category) => (
                <Card key={category.key}>
                  <div className='p-4 hover:bg-gray-50 transition-colors'>
                    <h2 className='text-lg font-semibold text-gray-900'>
                      {category.title}
                    </h2>
                    <p className='mt-2 text-gray-600 text-md'>
                      {category.total} {category.total === 1 ? 'item' : 'items'}
                    </p>
                  </div>
                </Card>
              ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
