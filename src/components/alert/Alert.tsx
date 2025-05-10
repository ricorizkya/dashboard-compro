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
      className={`flex flex-row w-full items-center p-4 text-md ${
        status === 'success'
          ? 'bg-green-50 text-green-700'
          : status === 'error'
          ? 'bg-red-50 text-red-700'
          : 'bg-yellow-50 text-amber-700'
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
