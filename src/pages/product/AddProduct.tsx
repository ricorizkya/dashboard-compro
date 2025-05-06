import { useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { useNavigate } from 'react-router-dom';
import { Input } from '../../components/input/Input';
import { Button } from '../../components/button/Button';
import { addProductData } from '../../services/product';
import RadioGroup from '../../components/radioGroup/RadioGroup';
import Toggle from '../../components/toggle/Toggle';

const AddProduct = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [status, setStatus] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState('');
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string>('');
  const [error, setError] = useState('');

  const handleFileChange = (files: FileList | null) => {
    if (files && files.length > 0) {
      const file = files[0];
      setSelectedImage(file);

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

      // Tambahkan log untuk debugging
      formData.append('title', title);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('status', String(status));
      formData.append('type_product', selectedCategory);
      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      // Log isi FormData
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await addProductData(formData);
      navigate('/product');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Gagal menambahkan data produk');
      }
    }
  };

  return (
    <div className='p-4'>
      <Breadcrumb main='Dashboard' sub='Product' sub2='Tambah Produk' />
      <span className='text-4xl text-black font-medium'>
        Tambah Data Produk
      </span>

      {error && (
        <div className='mt-4 p-3 bg-red-100 text-red-700 rounded-lg'>
          {error}
        </div>
      )}

      <div className='mt-8 flex gap-6'>
        {/* Preview Image */}
        <div className='flex-none w-[600px]'>
          <div className='w-full h-[600px] border-2 border-dashed border-gray-400 rounded-2xl flex items-center justify-center overflow-hidden'>
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
              Gambar Produk (Wajib)
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
              Nama Produk (Wajib)
            </label>
            <Input
              type='text'
              placeholder='Masukkan nama produk...'
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor='price' className='text-sm mb-2 block'>
              Harga (Wajib)
            </label>
            <Input
              type='number'
              placeholder='Masukkan harga...'
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor='type' className='text-sm mb-2 block'>
              Kategori
            </label>
            <RadioGroup
              options={[
                { label: 'Jasa', value: 'jasa' },
                { label: 'Produk', value: 'produk' },
              ]}
              selectedValue={selectedCategory}
              onChange={setSelectedCategory}
            />
          </div>

          <div>
            <label htmlFor='description' className='text-sm mb-2 block'>
              Deskripsi
            </label>
            <Input
              type='text'
              placeholder='Masukkan deskripsi produk...'
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className='h-32'
            />
          </div>

          <div>
            <label htmlFor='status' className='text-sm mb-2 block'>
              Status
            </label>
            <Toggle
              isOn={status}
              labels={{ inactive: 'Tidak Aktif', active: 'Aktif' }}
              onToggle={setStatus}
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
              label='Batal'
              onClick={async () => navigate('/product')}
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

export default AddProduct;
