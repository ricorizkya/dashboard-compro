import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PortfolioReviewsData } from '../../../types/PortfolioReviews';
import {
  deletePortfolioReview,
  fetchPortfolioReview,
} from '../../../services/portfolioReview';
import axios from 'axios';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';
import { Button } from '../../../components/button/Button';
import Table from '../../../components/table/Table';
import { MdEdit } from 'react-icons/md';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { backendToFrontendDate } from '../../../utils/utils';

const PortfolioReview = () => {
  const navigate = useNavigate();
  const [portfolioReviews, setPortfolioReviews] = useState<
    PortfolioReviewsData[]
  >([]);
  const [selectedPortfolioReview, setSelectedPortfolioReview] = useState<
    PortfolioReviewsData[]
  >([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const response = await fetchPortfolioReview();
        console.log('Response dari API:', response.data);
        if (isMounted) {
          setPortfolioReviews(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError('Terjadi kesalahan saat memuat data');
        } else {
          setError('Terjadi kesalahan jaringan');
        }
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectionChange = useCallback(
    (selectedItems: PortfolioReviewsData[]) => {
      setSelectedPortfolioReview(selectedItems);
    },
    []
  );

  const productHeaders = useMemo(
    () => [
      { key: 'product', label: 'Product', sortable: true },
      { key: 'image', label: 'Image', sortable: true },
      { key: 'title', label: 'Title', sortable: true },
      { key: 'description', label: 'Description', sortable: true },
      { key: 'date', label: 'Date', sortable: true },
      { key: 'action', label: 'Action', sortable: true },
    ],
    []
  );

  const tableData = useMemo(() => {
    if (portfolioReviews === null) return [];
    return portfolioReviews.map((item) => ({
      ...item,
      id: String(item.id),
      image: item.image,
      date: backendToFrontendDate(item.date),
    }));
  }, [portfolioReviews]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        console.log('selectedPortfolioReview:', selectedPortfolioReview);
        await deletePortfolioReview(id);
        setPortfolioReviews((prev) =>
          prev.filter((item) => String(item.id) !== id)
        );
        setError('');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError('Terjadi kesalahan saat menghapus data');
        } else {
          setError('Terjadi kesalahan jaringan');
        }
      }
    },
    [selectedPortfolioReview]
  );

  return (
    <div className='p-4'>
      <Breadcrumb main='Dashboard' sub='Portfolio Reviews' />

      <div className='flex flex-row justify-between items-center mb-4'>
        <span className='text-4xl text-black font-medium'>
          Data Portfolio Images
        </span>
        <Button
          label='Tambah'
          onClick={async () => navigate('/portfolio/reviews/add')}
          className='w-xs px-4 py-2 rounded-lg text-white shadow-md bg-blue-500 hover:bg-blue-600'
        />
      </div>

      {error && <p className='text-red-500'>{error}</p>}

      <Table
        selectable={true}
        headers={productHeaders}
        data={tableData}
        renderRow={(item, { isSelected, toggleSelection }) => (
          <tr key={item.id} className={isSelected ? 'bg-blue-50' : ''}>
            <td className='px-4 py-2'>
              <input
                type='checkbox'
                checked={isSelected}
                onChange={toggleSelection}
                className='form-checkbox h-4 w-4 text-primary'
              />
            </td>
            <td className='px-6 py-4 font-medium'>{item.product_name}</td>
            <td className='px-6 py-4'>
              <img
                src={`http://localhost:3000/${item.image}`}
                alt={item.image}
                className='w-20 h-12 object-cover rounded'
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                }}
              />
            </td>
            <td className='px-6 py-4 font-medium'>{item.title}</td>
            <td className='px-6 py-4 font-medium'>{item.description}</td>
            <td className='px-6 py-4 font-medium'>{item.date}</td>
            <td className='px-6 py-4'>
              <div className='flex gap-3 text-lg'>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/portfolio/reviews/edit/${item.id}`);
                  }}
                  className='text-blue-600 hover:text-blue-800'
                >
                  <MdEdit />
                </button>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    handleDelete(item.id);
                  }}
                  className='text-red-600 hover:text-red-800'
                >
                  <BsFillTrash3Fill />
                </button>
              </div>
            </td>
          </tr>
        )}
        pagination={{
          pageSize: 10,
          showControls: true,
        }}
        sortable
        loading={isLoading}
        onSelectionChange={handleSelectionChange}
        emptyState={
          <div className='text-gray-500 py-4 text-center'>
            Tidak ada data portfolio reviews
          </div>
        }
        className='mt-4 shadow-sm'
      />
    </div>
  );
};

export default PortfolioReview;
