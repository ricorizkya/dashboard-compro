import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { UserData } from '../../types/User';
import { getUserById, updateUser } from '../../services/user';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import Alert from '../../components/alert/Alert';
import { Input } from '../../components/input/Input';
import { Button } from '../../components/button/Button';

const EditUser = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [userData, setUserData] = useState<UserData>({
    id: '',
    name: '',
    phone: '',
    role: '',
    username: '',
    password: '',
    createdAt: new Date(),
    updatedAt: new Date(),
  });
  const [inputName, setInputName] = useState<string>('');
  const [inputPhone, setInputPhone] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    const loadData = async () => {
      try {
        if (id) {
          const data = await getUserById(id);
          setUserData(data);
          setInputName(data.name);
          setInputPhone(data.phone);
        }
      } catch (error) {
        console.error('Error fetching user data:', error);
        setError('Gagal memuat data user');
      }
    };

    loadData();
  }, [id]);

  const handleSubmit = async () => {
    try {
      if (!id) return;

      if (inputPassword !== '') {
        if (inputPassword === inputConfirmPassword) {
          setPasswordError('');
        } else {
          setPasswordError(
            'Pastikan password baru dan konfirmasi password baru sama'
          );
          return;
        }
      }

      const payload = {
        name: inputName,
        phone: inputPhone,
        ...(inputPassword && { password: inputConfirmPassword }),
      };

      console.log('payload', payload);

      await updateUser(id, payload);
      navigate('/users');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Terjadi kesalahan saat memperbarui data');
      }
    }
  };

  return (
    <div>
      <Breadcrumb main='Dashboard' sub='Users' sub2='Edit User' />
      <div className='flex flex-col h-screen'>
        <div className='flex flex-row justify-between'>
          <h1 className='text-4xl font-bold'>Tambah Data Diri User</h1>
        </div>

        {error && (
          <Alert
            message={error}
            status='error'
            onClose={() => setError('')}
            className='mt-5'
          />
        )}

        <div className='flex flex-col md:flex-row gap-5 mt-10'>
          <div className='w-full md:w-1/2'>
            <label htmlFor='name' className='text-sm mb-2 block'>
              Nama
            </label>
            <Input
              type='text'
              placeholder='Masukkan nama...'
              value={inputName}
              onChange={(e) => setInputName(e.target.value)}
            />
          </div>
          <div className='w-full md:w-1/2'>
            <label htmlFor='phone' className='text-sm mb-2 block'>
              Nomor Telepon
            </label>
            <Input
              type='text'
              placeholder='Masukkan nomor telepon (+62834391231873)'
              value={inputPhone}
              onChange={(e) => setInputPhone(e.target.value)}
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
              placeholder='Masukkan username...'
              value={userData.username}
              readonly
            />
          </div>
          <div className='w-full md:w-1/3'>
            <label htmlFor='password' className='text-sm mb-2 block'>
              Password Baru
            </label>
            <Input
              type='password'
              placeholder='Masukkan password baru...'
              value={inputPassword}
              onChange={(e) => setInputPassword(e.target.value)}
            />
          </div>
          <div className='w-full md:w-1/3'>
            <label htmlFor='confirm-password' className='text-sm mb-2 block'>
              Konfirmasi Password
            </label>
            <Input
              type='password'
              placeholder='Konfirmasi password...'
              value={inputConfirmPassword}
              onChange={(e) => setInputConfirmPassword(e.target.value)}
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
        <div className='flex flex-row gap-4 mt-10'>
          <Button
            label='Batal'
            onClick={async () => navigate('/users')}
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
  );
};

export default EditUser;
