import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';
import { useState } from 'react';
import { login } from '../../services/auth';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      await login({ username, password });
      navigate('/');
    } catch (err) {
      // Tambahkan timeout untuk memastikan state update terjadi
      setTimeout(() => {
        setError(
          err instanceof Error ? err.message : 'Terjadi kesalahan saat login'
        );
      }, 0);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className='min-h-screen flex bg-gray-200 flex-col md:flex-row transition-all duration-500 ease-in-out'>
      <div className='flex flex-col justify-center w-full md:w-4/7 px-4 sm:px-8 lg:px-32 py-10 max-w-2xl mx-auto transition-all duration-500 ease-in-out'>
        <h1 className='text-4xl md:text-5xl font-bold'>Sign In</h1>
        <p className='font-extralight mt-4 text-stone-500'>
          Masukkan username dan password untuk masuk ke halaman dashboard
        </p>

        <div className='flex flex-col mt-12'>
          <label htmlFor='username' className='text-sm mb-2'>
            Username
          </label>
          <Input
            type='text'
            placeholder='Masukkan username'
            onChange={(e) => setUsername(e.target.value)}
          />
          <label htmlFor='password' className='text-sm mb-2 mt-8'>
            Password
          </label>
          <Input
            type='password'
            placeholder='Masukkan password'
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <div className='mt-12'>
          <Button
            label={isLoading ? 'Memproses...' : 'Sign In'}
            onClick={handleLogin}
          />
        </div>

        {error && (
          <div className='mt-8 bg-red-600 p-3 text-white rounded-xl'>
            <h1 className='text-md'>{error}</h1>
          </div>
        )}
      </div>

      <div
        className='hidden md:flex flex-col w-3/7 p-4 justify-center shadow-xl transition-all duration-500 ease-in-out'
        style={{
          background: '#FFBC42',
          borderRadius: '142px 0px 0px 142px',
        }}
      >
        <img
          src='/src/assets/logo-black.png'
          alt='Logo'
          className='w-auto h-auto max-w-[150px] md:max-w-[150px] lg:max-w-[400px] mx-auto'
        />
      </div>
    </div>
  );
};

export default Login;
