import { useEffect, useMemo, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PortfolioReviewsData } from '../../../types/PortfolioReviews';
import {
  getPortfolioReviewById,
  updatePortfolioReview,
} from '../../../services/portfolioReview';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';
import { Input } from '../../../components/input/Input';
import { Button } from '../../../components/button/Button';
import { Dropdown } from '../../../components/dropdown/Dropdown';
import { ProductData } from '../../../types/Product';
import fetchProductData from '../../../services/product';
import axios from 'axios';

const EditPortfolioReview = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataPortfolioReviews, setDataPortfolioReviews] =
    useState<PortfolioReviewsData>({
      id: '',
      product_id: '',
      title: '',
      description: '',
      date: '',
      image: '',
      created_at: '',
      created_by: 0,
      product_name: '',
      product_image: '',
    });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [title, setTitle] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [date, setDate] = useState<string>('');
  const [productId, setProductId] = useState<number>(0);
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        if (id) {
          const data = await getPortfolioReviewById(id);
          setDataPortfolioReviews(data);
          setTitle(data.title);
          setDescription(data.description);
          const isValid = data.date?.match(/^\d{4}-\d{2}-\d{2}/);
          if (!isValid) {
            throw new Error('Format tanggal tidak valid dari backend');
          }

          const formattedDate = new Date(data.date).toISOString().split('T')[0];
          setDate(formattedDate);
          setProductId(Number(data.product_id));

          const selectedProduct = productData.find(
            (product) => product.id === data.product_id
          );
          if (selectedProduct) {
            setProductId(Number(selectedProduct.id));
          }
        }
      } catch (error) {
        console.error('Error fetching portfolio review data:', error);
        setError('Gagal memuat data portfolio review');
      }
    };

    loadData();
  }, [id, productData]);

  useEffect(() => {
    let isMounted = true;

    const loadDataProduct = async () => {
      try {
        const response = await fetchProductData();
        console.log('Response dari API:', response.data);
        if (isMounted) {
          setProductData(response.data);
        }
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError('Terjadi kesalahan saat memuat data');
        } else {
          setError('Terjadi kesalahan jaringan');
        }
      } finally {
        isMounted = false;
      }
    };

    loadDataProduct();

    return () => {
      isMounted = false;
    };
  }, []);

  const dropdownData = useMemo(() => {
    if (productData === null) return [];
    return productData.map((item) => ({
      value: String(item.id),
      label: item.title,
    }));
  }, [productData]);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!id) return;

    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('date', date);
      formData.append('product_id', String(productId));

      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await updatePortfolioReview(id, formData);
      navigate('/portfolio/reviews');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Terjadi kesalahan saat memperbarui data');
      }
    }
  };

  return (
    <div className='p-4'>
      <Breadcrumb
        main='Dashboard'
        sub='Portfolio Reviews'
        sub2='Update Portfolio Reviews'
      />
      <span className='text-4xl text-black font-medium'>
        Update Data Portofolio Review
      </span>

      {error && (
        <div className='mt-4 p-3 bg-red-100 text-red-700 rounded-lg'>
          {error}
        </div>
      )}

      <div className='mt-8 flex gap-6'>
        <div className='flex-none w-[500px]'>
          <img
            src={`http://localhost:3000/${dataPortfolioReviews.image}`}
            alt={dataPortfolioReviews.image}
            className='w-full h-[500px] object-cover rounded-2xl shadow-xl'
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
            }}
          />
        </div>
        <div className='flex-1 flex flex-col gap-4'>
          <div>
            <label htmlFor='title' className='text-sm mb-2 block'>
              Gambar
            </label>
            <Input
              type='file'
              placeholder='Pilih gambar baru...'
              accept='image/*'
              onFileChange={handleFileChange}
            />
          </div>
          <div>
            <label htmlFor='title' className='text-sm mb-2 block'>
              Produk atau Jasa
            </label>
            <Dropdown
              options={dropdownData}
              placeholder='Pilih produk atau jasa'
              value={dataPortfolioReviews.product_id?.toString()}
              onChange={(value: string | string[]) =>
                setProductId(Number(value))
              }
            />
          </div>

          <div>
            <label htmlFor='title' className='text-sm mb-2 block'>
              Judul
            </label>
            <Input
              type='text'
              placeholder='Masukkan judul...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor='description' className='text-sm mb-2 block'>
              Deskripsi
            </label>
            <Input
              type='text'
              placeholder='Masukkan deskripsi...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='h-32'
            />
          </div>

          <div>
            <label htmlFor='title' className='text-sm mb-2 block'>
              Tanggal
            </label>
            <Input
              type='date'
              placeholder='Pilih tanggal...'
              value={date}
              onChange={(e) => setDate(e.target.value)}
            />
          </div>
          <div className='flex flex-row gap-4'>
            <Button
              label='Kembali'
              onClick={async () => navigate('/portfolio/reviews')}
              backgroundColor='#d64933'
            />
            <Button
              label='Update Data'
              onClick={handleSubmit}
              backgroundColor='#003366'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditPortfolioReview;
