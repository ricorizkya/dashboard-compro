import React from 'react';

type StatusBadgeProps = {
  status: boolean;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status = true }) => {
  return (
    <div
      className={`flex items-center p-1 rounded-lg justify-center ${
        status ? 'bg-green-600 ' : 'bg-red-600'
      } text-white`}
    >
      {status ? 'Aktif' : 'Tidak Aktif'}
    </div>
  );
};

export default StatusBadge;
