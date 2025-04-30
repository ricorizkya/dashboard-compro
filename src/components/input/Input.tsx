import React, { useState } from 'react';
import Eye from '../../assets/icons/Eye';
import EyeOff from '../../assets/icons/EyeOff';

type InputProps = {
  type?: string;
  placeholder?: string;
  value?: string;
  readonly?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  readonly = false,
  onChange,
}) => {
  const [showPassword, setShowPassword] = useState(true);
  const isPassword = type === 'password';
  const inputType = isPassword && showPassword ? 'password' : 'text';
  return (
    <div className='relative'>
      <input
        type={inputType}
        className='shadow-md w-full px-6 py-3 border-2 border-gray-400 rounded-xl focus:outline-none focus:border-gray-600 pr-12'
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        readOnly={readonly}
      />
      {isPassword && (
        <button
          type='button'
          onClick={() => setShowPassword(!showPassword)}
          className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-600'
        >
          {showPassword ? (
            <Eye w={20} h={20} color='#868A92' />
          ) : (
            <EyeOff w={20} h={20} color='#868A92' />
          )}
        </button>
      )}
    </div>
  );
};
