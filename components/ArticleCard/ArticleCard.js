import Link from 'next/link';
import React from 'react';
import { useSelector } from 'react-redux';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { defaultImageUrl } from '../../utils/constants';

import styles from './articleCard.module.css';

const ArticleCard = ({ article }) => {
  const user = useSelector(state => state.user.user);

  const isLongTitle = article.title.split('').length > 50;

  function shortenTitle(title) {
    return `${title.split('').splice(0, 30).join('')}...`;
  }

  return (
    <Link href={user ? `/articles/${article.id}` : '/login'}>
      <div className={styles.articleCardContainer}>
        <img
          className={styles.articleCardImage}
          src={article?.avatar || defaultImageUrl}
          alt='Author icon'
        />
        <div className={styles.articleCardInfo}>
          <p>{isLongTitle ? shortenTitle(article.title) : article.title}</p>
          <p>{article.author}</p>
        </div>
        <div className={styles.articleCardIconContainer}>
          <HiOutlineBookOpen className='h-7 w-7' />
        </div>
      </div>
    </Link>
  );
};
export default ArticleCard;
