import { useCallback, useEffect, useMemo, useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Table from '../../components/table/Table';
import { Button } from '../../components/button/Button';
import { MdEdit } from 'react-icons/md';
import { BsFillTrash3Fill } from 'react-icons/bs';
import { ProductData } from '../../types/Product';
import axios from 'axios';
import fetchProductData, { deleteProductData } from '../../services/product';
import { useNavigate } from 'react-router-dom';
import StatusBadge from '../../components/statusBadge/StatusBadge';

const Product = () => {
  const navigate = useNavigate();
  const [productData, setProductData] = useState<ProductData[]>([]);
  const [selectedProducts, setSelectedProducts] = useState<ProductData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const response = await fetchProductData();
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
        if (isMounted) setIsLoading(false);
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, []);

  const handleSelectionChange = useCallback(
    (selectedItems: TableProductData[]) => {
      const mappedItems = selectedItems.map((item) => ({
        ...item,
        price: parseFloat(item.price.replace(/[^\d.-]/g, '')),
      }));
      setSelectedProducts(mappedItems);
    },
    []
  );

  const productHeaders = useMemo(
    () => [
      { key: 'image', label: 'Gambar', sortable: true },
      { key: 'name', label: 'Nama Produk', sortable: true },
      { key: 'description', label: 'Deskripsi', sortable: true },
      { key: 'price', label: 'Harga', sortable: true },
      { key: 'type', label: 'Kategori', sortable: true },
      { key: 'action', label: 'Aksi', sortable: false },
    ],
    []
  );

  type TableProductData = Omit<ProductData, 'price'> & {
    price: string;
  };

  const tableData: TableProductData[] = useMemo(() => {
    if (productData === null) return [];
    return productData.map((item) => ({
      ...item,
      id: String(item.id),
      price: new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
      }).format(item.price),
    }));
  }, [productData]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        console.log('selectedProducts:', selectedProducts);
        await deleteProductData(id);
        setProductData((prev) => prev.filter((item) => String(item.id) !== id));
        setError('');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError('Terjadi kesalahan saat menghapus data');
        } else {
          setError('Terjadi kesalahan jaringan');
        }
      }
    },
    [selectedProducts]
  );

  return (
    <div className='p-4'>
      <Breadcrumb main='Dashboard' sub='Services & Products' />

      <div className='flex flex-col gap-4 mb-4 md:flex-row md:justify-between md:items-center'>
        <h1 className='text-3xl md:text-4xl text-black font-medium break-all'>
          Data Services & Products
        </h1>
        <div className='w-full md:w-auto'>
          <Button
            label='Tambah'
            onClick={async () => navigate('/product/add')}
            className='w-full md:w-[120px] px-4 py-3 text-sm md:text-base rounded-lg text-white shadow-md bg-blue-500 hover:bg-blue-600 whitespace-nowrap'
          />
        </div>
      </div>

      {error && <p className='text-red-500'>{error}</p>}

      <div
        className='relative'
        style={{
          overflowX: 'scroll',
          width: '80vw',
        }}
      >
        {/* <div
          className='overflow-x-auto'
          style={{
            overflowX: 'scroll',
            width: '80vw',
          }}
        > */}
        <div className='min-w-[800px] sm:min-w-full pr-8'>
          <Table<TableProductData>
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
                <td className='px-6 py-4'>
                  <img
                    src={`http://localhost:3000/${item.image}`}
                    alt={item.title}
                    className='w-20 h-12 object-cover rounded'
                    onError={(e) => {
                      (e.target as HTMLImageElement).src =
                        '/placeholder-image.jpg';
                    }}
                  />
                </td>
                <td className='px-6 py-4 font-medium'>{item.title}</td>
                <td className='px-6 py-4 text-gray-600'>{item.description}</td>
                <td className='px-6 py-4'>{item.price}</td>
                <td className='px-6 py-4'>
                  {item.type_product === 'jasa' ? 'Jasa' : 'Produk'}
                </td>
                <td className='px-6 py-4'>
                  <StatusBadge status={item.status} />
                </td>
                <td className='px-6 py-4'>
                  <div className='flex gap-3 text-lg'>
                    <button
                      onClick={(e) => {
                        e.preventDefault();
                        navigate(`/product/edit/${item.id}`);
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
                Tidak ada data produk
              </div>
            }
            className='mt-4 shadow-sm'
          />
        </div>
      </div>
    </div>
  );
};

export default Product;
