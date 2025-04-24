import React from 'react';

interface BreadcrumbProps {
  main: string;
  sub: string;
  sub2?: string;
  sub3?: string;
}
const Breadcrumb: React.FC<BreadcrumbProps> = ({ main, sub, sub2, sub3 }) => {
  return (
    <div className='flex flex-row py-4'>
      <span className='text-md text-black font-extralight'>
        {main} / {sub} {sub2 && `/ ${sub2}`} {sub3 && `/ ${sub3}`}
      </span>
    </div>
  );
};

export default Breadcrumb;
