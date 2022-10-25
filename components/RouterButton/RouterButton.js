import { useRouter } from 'next/router';
import React from 'react';
import { AiOutlineArrowLeft } from 'react-icons/ai';

const RouterButton = ({ link, title }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(link);
      }}
      className='routerButton'
    >
      <AiOutlineArrowLeft className='h-7 w-7' />
      {title}
    </button>
  );
};

export default RouterButton;
