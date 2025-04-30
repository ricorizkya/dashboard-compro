import { useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { FaPowerOff } from 'react-icons/fa';
import { Input } from '../../components/input/Input';
import { useNavigate } from 'react-router-dom';
import { logout } from '../../services/auth';

const Setting = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);

  const handleLogout = async () => {
    try {
      // Panggil logout tanpa await
      logout();

      // Force redirect tanpa menunggu response
      navigate('/login', { replace: true });
      window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      // Fallback cleanup
      localStorage.clear();
      navigate('/login', { replace: true });
    }
    setShowModal(false);
  };

  return (
    <div>
      <Breadcrumb main='Settings' sub='Settings' />
      <div className='flex flex-col h-screen'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-4xl font-bold'>Data Diri Admin</h1>
          <div
            className='flex flex-row gap-2 items-center'
            onClick={() => setShowModal(true)}
          >
            <FaPowerOff color='red' size={24} />
            <label className='text-red-600 text-md'>Logout</label>
          </div>
        </div>
        <div className='flex-row mt-10 gap-10'>
          <div className='flex flex-col'>
            <label htmlFor='username' className='text-sm mb-2'>
              Nama
            </label>
            <Input type='text' placeholder='Masukkan Nama' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='username' className='text-sm mb-2'>
              Nomor Telepon
            </label>
            <Input type='text' placeholder='Masukkan Nomor Telepon' />
          </div>
        </div>
        <div className='flex-row mt-5 gap-10'>
          <div className='flex flex-col'>
            <label htmlFor='username' className='text-sm mb-2'>
              Username
            </label>
            <Input type='text' placeholder='Masukkan Nama' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='username' className='text-sm mb-2'>
              Password baru
            </label>
            <Input type='text' placeholder='Masukkan Nomor Telepon' />
          </div>
          <div className='flex flex-col'>
            <label htmlFor='username' className='text-sm mb-2'>
              Konfirmasi Password baru
            </label>
            <Input type='text' placeholder='Masukkan Nomor Telepon' />
          </div>
        </div>
      </div>
      {showModal && (
        <div className='fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center'>
          <div className='bg-white p-6 rounded-xl w-96'>
            <h2 className='text-xl mb-4'>Konfirmasi Logout</h2>
            <p className='mb-6'>Anda yakin ingin keluar dari sistem?</p>
            <div className='flex gap-4 justify-end'>
              <button
                onClick={() => setShowModal(false)}
                className='px-4 py-2 text-gray-600 hover:bg-gray-100 rounded-lg'
              >
                Batal
              </button>
              <button
                onClick={handleLogout}
                className='px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600'
              >
                Ya, Logout
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Setting;
