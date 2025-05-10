import React from 'react';

type StatusBadgeProps = {
  status: boolean;
};

const StatusBadge: React.FC<StatusBadgeProps> = ({ status = true }) => {
  return (
    <div
      className={`flex items-center p-1 rounded-lg justify-center ${
        status ? 'bg-green-50 text-green-700' : 'bg-red-50 text-red-700'
      } `}
    >
      {status ? 'Aktif' : 'Tidak Aktif'}
    </div>
  );
};

export default StatusBadge;
