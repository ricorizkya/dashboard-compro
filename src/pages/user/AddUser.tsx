import { useState } from 'react';
import Breadcrumb from '../../components/breadcrumb/Breadcrumb';
import { Input } from '../../components/input/Input';
import Alert from '../../components/alert/Alert';
import { Button } from '../../components/button/Button';
import { addUserData } from '../../services/user';
import { useNavigate } from 'react-router-dom';

const AddUser = () => {
  const navigate = useNavigate();
  const [inputName, setInputName] = useState<string>('');
  const [inputPhone, setInputPhone] = useState<string>('');
  const [inputUsername, setInputUsername] = useState<string>('');
  const [inputPassword, setInputPassword] = useState<string>('');
  const [inputConfirmPassword, setInputConfirmPassword] = useState<string>('');
  const [isSuccess, setIsSuccess] = useState(false);
  const [passwordError, setPasswordError] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async () => {
    try {
      const formData = new FormData();

      // Tambahkan log untuk debugging
      formData.append('name', inputName);
      formData.append('phone', inputPhone);
      formData.append('username', inputUsername);
      formData.append('password', inputConfirmPassword);
      formData.append('role', 'admin');

      if (inputPassword === inputConfirmPassword) {
        setPasswordError('');
      } else {
        setPasswordError(
          'Pastikan password baru dan konfirmasi password baru sama'
        );
        return;
      }

      // Log isi FormData
      for (const [key, value] of formData.entries()) {
        console.log(key, value);
      }

      await addUserData(formData);
      navigate('/users');
    } catch (error) {
      if (error instanceof Error) {
        setError(error.message);
      } else {
        setError('Gagal menambahkan data user');
      }
    }
  };

  return (
    <div>
      <Breadcrumb main='Dashboard' sub='Users' sub2='Add User' />
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
              value={inputUsername}
              onChange={(e) => setInputUsername(e.target.value)}
            />
          </div>
          <div className='w-full md:w-1/3'>
            <label htmlFor='password' className='text-sm mb-2 block'>
              Password
            </label>
            <Input
              type='password'
              placeholder='Masukkan password...'
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

export default AddUser;
