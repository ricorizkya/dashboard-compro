import { useCallback, useEffect, useMemo, useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Table from '../../components/table/Table';
import { Button } from '../../components/button/Button';
import { MdEdit } from 'react-icons/md';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { CarouselData } from '../../types/Carousel';
import axios from 'axios';
import { deleteCarouselData, fetchCarouselData } from '../../services/carousel';
import StatusBadge from '../../components/statusBadge/StatusBadge';
import { useNavigate } from 'react-router-dom';

const Carousel = () => {
  const navigate = useNavigate();
  const [carouselData, setCarouselData] = useState<CarouselData[]>([]);
  const [selectedCarousel, setSelectedCarousel] = useState<CarouselData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const response = await fetchCarouselData();
        console.log('Response dari API:', response.data);
        if (isMounted) {
          setCarouselData(response.data);
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
      isMounted = false; // Batalkan update jika komponen di-unmount
    };
  }, []);

  const handleSelectionChange = useCallback((selectedItems: CarouselData[]) => {
    setSelectedCarousel(selectedItems);
  }, []);

  const tableData = useMemo(() => {
    return carouselData.map((item) => ({
      ...item,
      id: String(item.id),
      status: item.status,
      image: item.image,
      title: item.title,
      description: item.description,
    }));
  }, [carouselData]);

  const handleDelete = useCallback(async (id: string) => {
    try {
      console.log('selectedCarousel:', selectedCarousel);
      await deleteCarouselData(id);
      setCarouselData((prev) => prev.filter((item) => String(item.id) !== id));
      setError('');
    } catch (error) {
      if (axios.isAxiosError(error)) {
        setError('Terjadi kesalahan saat menghapus data');
      } else {
        setError('Terjadi kesalahan jaringan');
      }
    }
  }, []);

  return (
    <div className='p-4'>
      <Breadcrumb main='Dashboard' sub='Carousel' />

      <div className='flex flex-row justify-between items-center mb-4'>
        <span className='text-4xl text-black font-medium'>Data Carousel</span>
        <Button
          label='Tambah'
          onClick={async () => navigate('/carousel/add')}
          className='w-xs px-4 py-2 rounded-lg text-white shadow-md bg-blue-500 hover:bg-blue-600'
        />
      </div>

      {error && <p className='text-red-500'>{error}</p>}

      <Table
        selectable={true}
        headers={[
          { key: 'image', label: 'Image', sortable: true },
          { key: 'title', label: 'Title', sortable: true },
          { key: 'description', label: 'Description', sortable: true },
          { key: 'status', label: 'Status', sortable: true },
          { key: 'action', label: 'Action', sortable: true },
        ]}
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
            <td className='px-6 py-4'>
              <img
                src={`http://localhost:3000/${item.image}`}
                alt={item.title}
                className='w-20 h-12 object-cover rounded'
                onError={(e) => {
                  (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
                }}
              />
            </td>
            <td className='px-6 py-4 font-medium'>{item.title}</td>
            <td className='px-6 py-4 text-gray-600'>{item.description}</td>
            <td className='px-6 py-4'>
              <StatusBadge status={item.status} />
            </td>
            <td className='px-6 py-4'>
              <div className='flex gap-3 text-lg'>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/carousel/edit/${item.id}`);
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
            Tidak ada data carousel
          </div>
        }
        className='mt-4 shadow-sm'
      />
    </div>
  );
};

export default Carousel;
