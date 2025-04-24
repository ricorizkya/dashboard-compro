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
    const [editUser, setEditUser] = useState<User | null>(null);
  
    // Data dummy
    const dummyUsers: User[] = [
      { id: 1, name: 'John Doe', age: 28, email: 'johndoe@gmail.com' },
      { id: 2, name: 'Jane Smith', age: 34, email: 'janesmith@gmail.com' },
      { id: 3, name: 'Alice Johnson', age: 29, email: 'alicejohnson@gmail.com' },
      { id: 4, name: 'Bob Brown', age: 42, email: 'bobbrown@gmail.com' },
    ];
  
    const handleSelectionChange = (selectedItems: User[]) => {
      setSelectedUsers(selectedItems);
      console.log('Selected Users:', selectedItems);
    };
  
    const handleEdit = (user: User) => {
      setEditUser(user);
      console.log('Editing user:', user);
      // Tambahkan logika edit disini
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
      <div className="p-4">
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
            { key: 'name', label: 'Name', sortable: true, filterable: true },
            { key: 'age', label: 'Age', sortable: true },
            { key: 'email', label: 'Email', filterable: true },
            { key: 'actions', label: 'Actions' },
          ]}
          data={users.map(user => ({ ...user, id: user.id.toString() }))}
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
              <td className='px-6 py-4'>
                <button
                  onClick={() => handleEdit(user)}
                  className='text-blue-600 hover:text-blue-900'
                >
                  Edit
                </button>
              </td>
            </tr>
          )}
          pagination={{ pageSize: 10, showControls: true }}
          sortable
          selectable
          loading={isLoading}
          onSelectionChange={handleSelectionChange}
          onSort={(key, direction) => console.log('Sort:', key, direction)}
          onFilter={(key, value) => console.log('Filter:', key, value)}
          emptyState={<div className='text-gray-500'>Tidak ada data carousel</div>}
          className='my-custom-class border rounded-lg'
        />
  
        {/* Edit Modal Contoh */}
        {editUser && (
          <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
            <div className='bg-white p-6 rounded-lg w-96'>
              <h2 className='text-xl mb-4'>Edit {editUser.name}</h2>
              <div className='space-y-4'>
                <div>
                  <label className='block text-sm font-medium text-gray-700'>Nama</label>
                  <input
                    type='text'
                    value={editUser.name}
                    className='mt-1 block w-full rounded-md border p-2'
                    readOnly
                  />
                </div>
                <button
                  onClick={() => setEditUser(null)}
                  className='w-full bg-gray-500 text-white py-2 rounded-md hover:bg-gray-600'
                >
                  Tutup
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

export default Carousel;
