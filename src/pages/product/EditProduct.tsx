import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { useNavigate, useParams } from 'react-router-dom';
import { getProductById, updateProductData } from '../../services/product';
import { ProductData } from '../../types/Product';
import { Input } from '../../components/input/Input';
import Toggle from '../../components/toggle/Toggle';
import { Button } from '../../components/button/Button';
import RadioGroup from '../../components/radioGroup/RadioGroup';

const EditProduct = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductData>({
    id: '',
    title: '',
    description: '',
    price: 0,
    type_product: '',
    image: '',
    status: false,
    created_at: '',
  });
  const [editedName, setEditedName] = useState('');
  const [editedDescription, setEditedDescription] = useState('');
  const [editedPrice, setEditedPrice] = useState('');
  const [editedType, setEditedType] = useState('');
  const [editedStatus, setEditedStatus] = useState(false);
  const [selectedImage, setSelectedImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        if (id) {
          const data = await getProductById(id);
          setProductData(data);
          setEditedName(data.title);
          setEditedDescription(data.description);
          setEditedPrice(String(data.price));
          setEditedType(data.type_product);
          setEditedStatus(data.status);
          setPreviewImage(`http://localhost:3000/${data.image}`);
        }
      } catch (error) {
        console.error('Error fetching product data:', error);
        setError('Gagal memuat data produk');
      }
    };

    loadData();
  }, [id]);

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
    if (!id) return;

    try {
      const formData = new FormData();
      formData.append('name', editedName);
      formData.append('description', editedDescription);
      formData.append('price', editedPrice);
      formData.append('type', editedType);
      formData.append('status', String(editedStatus));

      if (selectedImage) {
        formData.append('image', selectedImage);
      }

      await updateProductData(id, formData);
      navigate('/product');
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
      <Breadcrumb main='Dashboard' sub='Product' sub2='Update Produk' />
      <span className='text-4xl text-black font-medium'>
        Update Data Produk : {id}
      </span>

      {error && (
        <div className='mt-4 p-3 bg-red-100 text-red-700 rounded-lg'>
          {error}
        </div>
      )}

      <div className='mt-8 flex gap-6'>
        <div className='flex-none w-[600px]'>
          <img
            src={previewImage}
            alt={productData.title}
            className='w-full h-[600px] object-cover rounded-2xl shadow-xl'
            onError={(e) => {
              (e.target as HTMLImageElement).src = '/placeholder-image.jpg';
            }}
          />
        </div>

        <div className='flex-1 flex flex-col gap-4'>
          <div>
            <label htmlFor='image' className='text-sm mb-2 block'>
              Gambar Produk
            </label>
            <Input
              type='file'
              placeholder='Pilih gambar baru...'
              accept='image/*'
              onFileChange={handleFileChange}
            />
          </div>

          <div>
            <label htmlFor='name' className='text-sm mb-2 block'>
              Nama Produk
            </label>
            <Input
              type='text'
              placeholder='Masukkan nama produk...'
              value={editedName}
              onChange={(e) => setEditedName(e.target.value)}
            />
          </div>

          <div>
            <label htmlFor='price' className='text-sm mb-2 block'>
              Harga
            </label>
            <Input
              type='number'
              placeholder='Masukkan harga...'
              value={editedPrice}
              onChange={(e) => setEditedPrice(e.target.value)}
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
              selectedValue={editedType}
              onChange={setEditedType}
            />
          </div>

          <div>
            <label htmlFor='description' className='text-sm mb-2 block'>
              Deskripsi
            </label>
            <Input
              type='text'
              placeholder='Masukkan deskripsi...'
              value={editedDescription}
              onChange={(e) => setEditedDescription(e.target.value)}
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
              onClick={async () => navigate('/product')}
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

export default EditProduct;
