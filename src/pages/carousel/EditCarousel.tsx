import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { getCarouselById, updateCarouselData } from '../../services/carousel';
import { CarouselData } from '../../types/Carousel';
import { Input } from '../../components/input/Input';
import Toggle from '../../components/toggle/Toggle';
import { Button } from '../../components/button/Button';

const EditCarousel = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [dataCarousel, setDataCarousel] = useState<CarouselData>({
    id: '',
    image: '',
    title: '',
    description: '',
    status: false,
    created_at: '',
  });
  const [editedTitle, setEditedTitle] = useState<string>('');
  const [editedDesc, setEditedDesc] = useState<string>('');
  const [editedStatus, setEditedStatus] = useState<boolean>(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [error, setError] = useState<string>('');

  useEffect(() => {
    const loadData = async () => {
      try {
        if (id) {
          const data = await getCarouselById(id);
          setDataCarousel(data);
          setEditedTitle(data.title);
          setEditedDesc(data.description);
          setEditedStatus(data.status);
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
      formData.append('title', editedTitle);
      formData.append('description', editedDesc);
      formData.append('status', String(editedStatus));

      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await updateCarouselData(id, formData);
      navigate('/carousel');
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
      <Breadcrumb main='Dashboard' sub='Carousel' sub2='Update Carousel' />
      <span className='text-4xl text-black font-medium'>
        Update Data Carousel : {id}
      </span>

      {error && (
        <div className='mt-4 p-3 bg-red-100 text-red-700 rounded-lg'>
          {error}
        </div>
      )}

      <div className='mt-8 flex gap-6'>
        <div className='flex-none w-[500px]'>
          <img
            src={`http://localhost:3000/${dataCarousel.image}`}
            alt={dataCarousel.title}
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
              Judul
            </label>
            <Input
              type='text'
              placeholder='Masukkan judul...'
              value={editedTitle}
              onChange={(e) => setEditedTitle(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor='description' className='text-sm mb-2 block'>
              Deskripsi
            </label>
            <Input
              type='text'
              placeholder='Masukkan deskripsi...'
              value={editedDesc}
              onChange={(e) => setEditedDesc(e.target.value)}
              className='h-32'
            />
          </div>
          <div>
            <label htmlFor='status' className='text-sm mb-2 block'>
              Status
            </label>
            <Toggle
              isOn={editedStatus}
              labels={{ inactive: 'Tidak Aktif', active: 'Aktif' }}
              onToggle={setEditedStatus}
              ariaLabel='Status'
              colorScheme={{
                active: 'bg-blue-800',
                inactive: 'bg-gray-300',
                thumb: 'bg-white',
              }}
            />
          </div>
          <div className='flex flex-row gap-4'>
            <Button
              label='Kembali'
              onClick={async () => navigate('/carousel')}
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

export default EditCarousel;
