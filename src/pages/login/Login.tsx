import { useNavigate } from 'react-router-dom';
import { Button } from '../../components/button/Button';
import { Input } from '../../components/input/Input';

const Login = () => {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/dashboard');
  };

  return (
    // <div className='min-h-screen flex bg-gray-200 flex-col md:flex-row transition-all duration-500 ease-in-out'>
    //   <div className='flex flex-col justify-center w-full md:w-4/7 px-4 sm:px-8 lg:px-64 py-10 max-w-[800px] mx-auto transition-all duration-500 ease-in-out'>
    //     <h1 className='text-4xl md:text-5xl font-bold'>Sign In</h1>
    //     <p className='font-extralight mt-4 text-stone-500'>
    //       Masukkan username dan password untuk masuk ke halaman dashboard
    //     </p>

    //     <div className='flex flex-col mt-12'>
    //       <label htmlFor='username' className='text-sm mb-2'>
    //         Username
    //       </label>
    //       <Input type='text' placeholder='Masukkan username' />
    //       <label htmlFor='password' className='text-sm mb-2 mt-8'>
    //         Password
    //       </label>
    //       <Input type='password' placeholder='Masukkan password' />
    //     </div>

    //     <div className='mt-12'>
    //       <Button label='Sign In' onClick={() => console.log('Sign In')} />
    //     </div>
    //   </div>

    //   <div
    //     className='hidden md:flex flex-col w-3/7 p-4 justify-center px-36 shadow-xl transition-all duration-500 ease-in-out'
    //     style={{
    //       background: '#FFBC42',
    //       borderRadius: '142px 0px 0px 142px',
    //     }}
    //   >
    //     <h1>Sign in</h1>
    //     <p>Masukkan username dan password untuk login.</p>
    //   </div>
    // </div>
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
          <Input type='text' placeholder='Masukkan username' />
          <label htmlFor='password' className='text-sm mb-2 mt-8'>
            Password
          </label>
          <Input type='password' placeholder='Masukkan password' />
        </div>

        <div className='mt-12'>
          <Button label='Sign In' onClick={handleLogin} />
        </div>
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
