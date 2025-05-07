import React, { useState, useRef } from 'react';
import Eye from '../../assets/icons/Eye';
import EyeOff from '../../assets/icons/EyeOff';

type InputProps = {
  type?: 'text' | 'password' | 'file' | 'number' | 'date';
  placeholder?: string;
  value?: string;
  readonly?: boolean;
  accept?: string;
  multiple?: boolean;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onFileChange?: (files: FileList | null) => void;
  className?: string;
};

export const Input: React.FC<InputProps> = ({
  type = 'text',
  placeholder,
  value,
  readonly = false,
  accept,
  multiple = false,
  onChange,
  onFileChange,
  className = '',
}) => {
  const [showPassword, setShowPassword] = useState(false);
  const [fileName, setFileName] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);
  const isPassword = type === 'password';
  const isFile = type === 'file';
  const isDate = type === 'date'; // Tambah kondisi untuk date

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      setFileName(
        multiple
          ? `${files.length} file${files.length > 1 ? 's' : ''} selected`
          : files[0].name
      );
    } else {
      setFileName('');
    }
    onFileChange?.(files);
  };

  const triggerFileInput = () => {
    fileInputRef.current?.click();
  };

  // Tentukan tipe input berdasarkan kondisi
  const getInputType = () => {
    if (isPassword) return showPassword ? 'text' : 'password';
    if (isDate) return 'date';
    return type;
  };

  return (
    <div className='relative'>
      {isFile ? (
        <>
          <input
            type='file'
            ref={fileInputRef}
            className='hidden'
            accept={accept}
            multiple={multiple}
            onChange={handleFileChange}
          />
          <button
            type='button'
            onClick={triggerFileInput}
            className={`shadow-md w-full px-6 py-3 border-2 border-gray-400 rounded-xl focus:outline-none focus:border-gray-600 text-left ${className}`}
          >
            <span className='truncate block'>
              {fileName || placeholder || 'Choose file...'}
            </span>
          </button>
        </>
      ) : (
        <>
          <input
            type={getInputType()}
            className={`shadow-md w-full px-6 py-3 border-2 border-gray-400 rounded-xl focus:outline-none focus:border-gray-600 ${
              isPassword ? 'pr-12' : ''
            } ${isDate ? 'date-input' : ''} ${className}`}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
            readOnly={readonly}
          />

          {/* Tambah styling khusus untuk ikon kalender */}
          {isDate && (
            <div className='absolute right-4 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none'>
              <svg
                xmlns='http://www.w3.org/2000/svg'
                className='h-5 w-5'
                viewBox='0 0 20 20'
                fill='currentColor'
              >
                <path
                  fillRule='evenodd'
                  d='M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z'
                  clipRule='evenodd'
                />
              </svg>
            </div>
          )}

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
        </>
      )}
    </div>
  );
};
