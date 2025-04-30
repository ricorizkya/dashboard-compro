import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Table from '../../components/table/Table';
import { Button } from '../../components/button/Button';

interface User {
  id: number;
  name: string;
  age: number;
  email: string;
}

const Carousel = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<User[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  // Data dummy
  const dummyUsers: User[] = [
    { id: 1, name: 'John Doe', age: 28, email: 'john@example.com' },
    { id: 2, name: 'Jane Smith', age: 34, email: 'jane@example.com' },
  ];

  const handleSelectionChange = (selected: User[]) => {
    setSelectedUsers(selected);
    console.log('Selected Users:', selected);
  };

  const loadData = () => {
    setIsLoading(true);
    setTimeout(() => {
      setUsers(dummyUsers);
      setIsLoading(false);
    }, 1500);
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className='p-4'>
      <Breadcrumb main='Dashboard' sub='Carousel' />

      <div className='flex flex-row justify-between items-center mb-4'>
        <span className='text-4xl text-black font-medium'>Data Carousel</span>
        <Button
          label='Tambah'
          onClick={() => console.log('Tambah')}
          className='w-xs px-4 py-2 rounded-lg text-white shadow-md bg-blue-500 hover:bg-blue-600'
        />
      </div>

      <Table
        headers={[
          { key: 'image', label: 'Image', sortable: true },
          { key: 'title', label: 'Title', sortable: true },
          { key: 'description', label: 'Description', sortable: true },
          { key: 'status', label: 'Status', sortable: true },
          { key: 'action', label: 'Action', sortable: true },
        ]}
        data={users.map((user) => ({ ...user, id: user.id.toString() }))}
        renderRow={(user, { isSelected, toggleSelection }) => (
          <tr key={user.id} className={isSelected ? 'bg-blue-50' : ''}>
            <td className='px-4 py-2'>
              <input
                type='checkbox'
                checked={isSelected}
                onChange={toggleSelection}
                className='form-checkbox h-4 w-4 text-primary'
              />
            </td>
            <td className='px-6 py-4'>{user.name}</td>
            <td className='px-6 py-4'>{user.age}</td>
            <td className='px-6 py-4'>{user.email}</td>
          </tr>
        )}
        pagination={{ pageSize: 10 }}
        sortable
        selectable
        loading={isLoading}
        onSelectionChange={(selectedItems) =>
          handleSelectionChange(
            selectedItems.map((item) => ({ ...item, id: Number(item.id) }))
          )
        }
        emptyState={<div className='text-gray-500'>Tidak ada data</div>}
      />
    </div>
  );
};

export default Carousel;
