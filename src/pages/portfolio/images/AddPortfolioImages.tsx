import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addPortfolioImage } from '../../../services/portfolioImages';
import Breadcrumb from '../../../components/breadcrumb/Breadcrumb';
import { Input } from '../../../components/input/Input';
import { Button } from '../../../components/button/Button';

const AddPortfolioImages = () => {
  const navigate = useNavigate();
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [error, setError] = useState('');

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

      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await addPortfolioImage(formData);
      navigate('/portfolio/images');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Gagal menambahkan data portfolio image');
      }
    }
  };

  return (
    <div className='p-4'>
      <Breadcrumb
        main='Dashboard'
        sub='Portfolio Images'
        sub2='Add Portfolio Image'
      />
      <span className='text-4xl text-black font-medium'>
        Tambah Data Portfolio Image
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

          <div className='flex flex-row gap-4'>
            <Button
              label='Batal'
              onClick={async () => navigate('/carousel')}
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

export default AddPortfolioImages;
