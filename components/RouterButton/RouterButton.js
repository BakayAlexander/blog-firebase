import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const RouterButton = ({ link, title, arrow }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(link);
      }}
      className='routerButton'
    >
      {arrow && <AiOutlineArrowLeft className='h-7 w-7' />}
      {title}
    </button>
  );
};

export default RouterButton;
