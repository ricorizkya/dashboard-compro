import { useCallback, useEffect, useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../types/User';
import { deleteUserData, fetchUserData } from '../../services/user';
import axios from 'axios';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { Button } from '../../components/button/Button';
import Table from '../../components/table/Table';
import { MdEdit } from 'react-icons/md';
import { BsFillTrash3Fill } from 'react-icons/bs';

const User = () => {
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData[]>([]);
  const [selectedUser, setSelectedUser] = useState<UserData[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const response = await fetchUserData();
        console.log('Response dari API:', response.data);
        if (isMounted) {
          setUserData(response.data);
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

  const handleSelectionChange = useCallback((selectedItems: UserData[]) => {
    setSelectedUser(selectedItems);
  }, []);

  const productHeaders = useMemo(
    () => [
      { key: 'name', label: 'Name', sortable: true },
      { key: 'phone', label: 'Phone', sortable: true },
      { key: 'username', label: 'Username', sortable: true },
      { key: 'action', label: 'Action', sortable: true },
    ],
    []
  );

  const tableData = useMemo(() => {
    if (userData === null) return [];
    return userData.map((item) => ({
      ...item,
      id: String(item.id),
    }));
  }, [userData]);

  const handleDelete = useCallback(
    async (id: string) => {
      try {
        console.log('selectedUser:', selectedUser);
        await deleteUserData(id);
        setUserData((prev) => prev.filter((item) => String(item.id) !== id));
        setError('');
      } catch (error) {
        if (axios.isAxiosError(error)) {
          setError('Terjadi kesalahan saat menghapus data');
        } else {
          setError('Terjadi kesalahan jaringan');
        }
      }
    },
    [selectedUser]
  );

  return (
    <div className='p-4'>
      <Breadcrumb main='Dashboard' sub='Users' />

      <div className='flex flex-row justify-between items-center mb-4'>
        <span className='text-4xl text-black font-medium'>Data Users</span>
        <Button
          label='Tambah'
          onClick={async () => navigate('/users/add')}
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
            <td className='px-6 py-4 font-medium'>{item.name}</td>
            <td className='px-6 py-4 text-gray-600'>{item.phone}</td>
            <td className='px-6 py-4 text-gray-600'>{item.username}</td>
            <td className='px-6 py-4'>
              <div className='flex gap-3 text-lg'>
                <button
                  onClick={(e) => {
                    e.preventDefault();
                    navigate(`/users/edit/${item.id}`);
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

export default User;
