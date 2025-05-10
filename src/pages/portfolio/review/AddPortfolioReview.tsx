import { useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPortfolioReview } from '../../../services/portfolioReview';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';
import { Input } from '../../../components/input/Input';
import { Button } from '../../../components/button/Button';
import { Dropdown } from '../../../components/dropdown/Dropdown';
import fetchProductData from '../../../services/product';
import { ProductData } from '../../../types/Product';
import axios from 'axios';

const AddPortfolioReview = () => {
  const navigate = useNavigate();
  const [productId, setProductId] = useState(0);
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [date, setDate] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
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

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const dropdownData = useMemo(() => {
    if (productData === null) return [];
    return productData.map((item) => ({
      value: String(item.id),
      label: `${item.type_product === 'jasa' ? 'Jasa' : 'Produk'} - ${
        item.title
      }`,
    }));
  }, [productData]);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);

      // Create preview
      const reader = new FileReader();
      reader.onload = (e) => {
        if (e.target?.result) {
          setPreviewImage(e.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async () => {
    try {
      const formData = new FormData();
      formData.append('title', title);
      formData.append('description', description);
      formData.append('product_id', productId.toString());
      formData.append('date', date);

      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await addPortfolioReview(formData);
      navigate('/portfolio/reviews');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Gagal menambahkan data portfolio review');
      }
    }
  };

  return (
    <div className='p-4'>
      <Breadcrumb
        main='Dashboard'
        sub='Portfolio Reviews'
        sub2='Add Portfolio Review'
      />
      <span className='text-4xl text-black font-medium'>
        Tambah Data Portfolio Review
      </span>

      {error && (
        <div className='mt-4 p-3 bg-red-100 text-red-700 rounded-lg'>
          {error}
        </div>
      )}

      <div className='mt-8 flex gap-6'>
        {/* Preview Image */}
        <div className='flex-none w-[500px]'>
          <div className='w-full h-[500px] border-2 border-dashed border-gray-400 rounded-2xl flex items-center justify-center overflow-hidden'>
            {previewImage ? (
              <img
                src={previewImage}
                alt='Preview'
                className='w-full h-full object-cover'
              />
            ) : (
              <span className='text-gray-500'>Preview Gambar</span>
            )}
          </div>
        </div>

        {/* Form Input */}
        <div className='flex-1 flex flex-col gap-4'>
          <div>
            <label htmlFor='image' className='text-sm mb-2 block'>
              Gambar (Wajib)
            </label>
            <Input
              type='file'
              placeholder='Pilih gambar...'
              accept='image/*'
              onFileChange={handleFileChange}
            />
          </div>

          <div>
            <label htmlFor='title' className='text-sm mb-2 block'>
              Produk (Wajib)
            </label>
            <Dropdown
              options={dropdownData}
              placeholder='Pilih produk atau jasa'
              onChange={(value: string | string[]) =>
                setProductId(Number(value))
              }
            />
          </div>

          <div>
            <label htmlFor='title' className='text-sm mb-2 block'>
              Judul (Wajib)
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
              Tanggal (Wajib)
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
              label='Batal'
              onClick={async () => navigate('/portfolio/reviews')}
              backgroundColor='#d64933'
            />
            <Button
              label='Simpan Data'
              onClick={handleSubmit}
              backgroundColor='#003366'
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddPortfolioReview;
