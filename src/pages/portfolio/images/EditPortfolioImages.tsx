import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { PortfolioImagesData } from '../../../types/PortfolioImages';
import {
  getPortfolioImageById,
  updatePortfolioImage,
} from '../../../services/portfolioImages';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';
import { Input } from '../../../components/input/Input';
import { Button } from '../../../components/button/Button';

const EditPortfolioImages = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataPortfolioImages, setDataPortfolioImages] =
    useState<PortfolioImagesData>({
      id: '',
      image: '',
      created_at: '',
      created_by: 0,
    });
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        if (id) {
          const data = await getPortfolioImageById(id);
          setDataPortfolioImages(data);
        }
      } catch (error) {
        console.error('Error fetching carousel data:', error);
        setError('Gagal memuat data carousel');
      }
    };

    loadData();
  }, [id]);

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      setSelectedImage(files[0]);
    }
  };

  const handleSubmit = async () => {
    if (!id) return;

    try {
      const formData = new FormData();

      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await updatePortfolioImage(id, formData);
      navigate('/portfolio/images');
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
        sub='Portfolio Images'
        sub2='Update Portfolio Images'
      />
      <span className='text-4xl text-black font-medium'>
        Update Data Portofolio Image
      </span>

      {error && (
        <div className='mt-4 p-3 bg-red-100 text-red-700 rounded-lg'>
          {error}
        </div>
      )}

      <div className='mt-8 flex gap-6'>
        <div className='flex-none w-[500px]'>
          <img
            src={`http://localhost:3000/${dataPortfolioImages.image}`}
            alt={dataPortfolioImages.image}
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
          <div className='flex flex-row gap-4'>
            <Button
              label='Kembali'
              onClick={async () => navigate('/portfolio/images')}
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

export default EditPortfolioImages;
