import React, { useState, useRef } from 'react';
import Eye from '../../assets/icons/Eye';
import EyeOff from '../../assets/icons/EyeOff';

type InputProps = {
  type?: 'text' | 'password' | 'file' | 'number';
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
            type={isPassword && !showPassword ? 'password' : 'text'}
            className={`shadow-md w-full px-6 py-3 border-2 border-gray-400 rounded-xl focus:outline-none focus:border-gray-600 ${
              isPassword ? 'pr-12' : ''
            } ${className}`}
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
        </>
      )}
    </div>
  );
};
