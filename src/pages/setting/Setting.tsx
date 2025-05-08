import { useEffect, useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { FaPowerOff } from 'react-icons/fa';
import { Input } from '../../components/input/Input';
import { useNavigate } from 'react-router-dom';
import { UserData } from '../../types/User';
import { getUserById, handleUserError, updateUser } from '../../services/user';
import { FiLoader } from 'react-icons/fi';
import { Button } from '../../components/button/Button';
import Alert from '../../components/alert/Alert';
import { useAuth } from '../../context/AuthContext';

const Setting = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [editedName, setEditedName] = useState(userData?.name || '');
  const [editedPhone, setEditedPhone] = useState(userData?.phone || '');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  useEffect(() => {
    const loadUserData = async () => {
      try {
        const userID = localStorage.getItem('idUser');
        if (!userID) {
          navigate('/login');
          throw new Error('User ID not found in local storage');
        }

        const data = await getUserById(userID);
        setUserData(data);
      } catch (error) {
        const message =
          error instanceof Error ? error.message : 'Terjadi kesalahan';
        setError(handleUserError(error));

        if (message.includes('Sesi telah berakhir')) {
          localStorage.clear();
          navigate('/login');
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, [navigate]);
  const handleLogout = async () => {
    try {
      logout();

      //   navigate('/login', { replace: true });
      //   window.location.reload();
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      localStorage.clear();
      navigate('/login', { replace: true });
    }
    setShowModal(false);
  };

  const handleSaveChange = async () => {
    try {
      const userId = localStorage.getItem('idUser');
      if (!userId) return;

      if (newPassword !== '') {
        if (newPassword === confirmPassword) {
          setPasswordError('');
        } else {
          setPasswordError(
            'Pastikan password baru dan konfirmasi password baru sama'
          );
          return;
        }
      }

      const payload = {
        name: editedName,
        phone: editedPhone,
        ...(newPassword && { password: confirmPassword }),
      };

      const updatedUser = await updateUser(userId, payload);

      setUserData(updatedUser);
      setIsSuccess(true);

      setNewPassword('');
      setConfirmPassword('');
    } catch (error) {
      const errorMessage =
        error instanceof Error
          ? error.message
          : 'Terjadi kesalahan tidak diketahui';
      alert(`Gagal menyimpan perubahan: ${errorMessage}`);
    }
  };

  return (
    <div>
      <Breadcrumb main='Settings' sub='Settings' />
      <div className='flex flex-col h-screen'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-4xl font-bold'>Data Diri {userData?.name}</h1>
          <div
            className='flex flex-row gap-2 items-center'
            onClick={() => setShowModal(true)}
          >
            <FaPowerOff color='red' size={24} />
            <label className='text-red-600 text-md'>Logout</label>
          </div>
        </div>

        {error && (
          <Alert
            message={error}
            status='error'
            onClose={() => setError('')}
            className='mt-5'
          />
        )}

        {!isLoading ? (
          <>
            <div className='flex flex-col md:flex-row gap-5 mt-10'>
              <div className='w-full md:w-1/2'>
                <label htmlFor='name' className='text-sm mb-2 block'>
                  Nama
                </label>
                <Input
                  type='text'
                  placeholder={userData?.name || 'Masukkan nama...'}
                  value={editedName}
                  onChange={(e) => setEditedName(e.target.value)}
                />
              </div>
              <div className='w-full md:w-1/2'>
                <label htmlFor='phone' className='text-sm mb-2 block'>
                  Nomor Telepon
                </label>
                <Input
                  type='text'
                  placeholder={userData?.phone || 'Masukkan nomor telepon...'}
                  value={editedPhone}
                  onChange={(e) => setEditedPhone(e.target.value)}
                />
              </div>
            </div>
            <div className='flex flex-col md:flex-row gap-5 mt-5'>
              <div className='w-full md:w-1/3'>
                <label htmlFor='username' className='text-sm mb-2 block'>
                  Username
                </label>
                <Input
                  type='text'
                  placeholder={userData?.username || 'Masukkan username...'}
                  value={userData?.username || ''}
                  readonly
                />
              </div>
              <div className='w-full md:w-1/3'>
                <label htmlFor='new-password' className='text-sm mb-2 block'>
                  Password Baru
                </label>
                <Input
                  type='password'
                  placeholder='Masukkan password baru...'
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>
              <div className='w-full md:w-1/3'>
                <label
                  htmlFor='confirm-password'
                  className='text-sm mb-2 block'
                >
                  Konfirmasi Password
                </label>
                <Input
                  type='password'
                  placeholder='Konfirmasi password baru...'
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>
            </div>
            {passwordError && (
              <Alert
                message={passwordError}
                status='error'
                onClose={() => setPasswordError('')}
                className='mt-5'
              />
            )}
            {isSuccess && (
              <Alert
                message='Perubahan berhasil disimpan!'
                status='success'
                onClose={() => setIsSuccess(false)}
                className='mt-5'
              />
            )}
            <div className='mt-10'>
              <Button
                label='Perbarui Data'
                // onClick={async () => console.log('Perbarui Data')}
                onClick={handleSaveChange}
              />
            </div>
          </>
        ) : (
          <div className='justify-center items-center flex flex-col mt-10'>
            <FiLoader className='animate-spin text-2xl text-primary' />
          </div>
        )}
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
