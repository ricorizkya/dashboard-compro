import React from 'react';

interface CardProps {
  children: React.ReactNode;
}
const Card: React.FC<CardProps> = ({ children }) => {
  return (
    <div className='shadow-md px-6 py-3 bg-white rounded-xl'>{children}</div>
  );
};

export default Card;
