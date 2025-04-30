import React from 'react';
import { IoCheckmarkCircleSharp, IoClose } from 'react-icons/io5';
import { TbAlertTriangleFilled } from 'react-icons/tb';

type AlertProps = {
  message: string;
  status: 'success' | 'error' | 'warning';
  onClose: () => void;
  className?: string;
};
const Alert: React.FC<AlertProps> = ({
  message,
  status,
  onClose,
  className,
}) => {
  return (
    <div
      className={`flex flex-row w-full items-center p-4 text-md text-white ${
        status === 'success'
          ? 'bg-green-600'
          : status === 'error'
          ? 'bg-red-600'
          : 'bg-yellow-600'
      } rounded-xl justify-between transition-all duration-300 ease-in-out ${className}`}
    >
      <div className='flex flex-row items-center'>
        {status === 'success' ? (
          <IoCheckmarkCircleSharp size={24} className='mr-4' />
        ) : (
          <TbAlertTriangleFilled size={24} className='mr-4' />
        )}
        {message}
      </div>
      <IoClose size={20} onClick={onClose} />
    </div>
  );
};

export default Alert;
