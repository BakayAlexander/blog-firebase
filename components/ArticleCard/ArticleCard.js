import React from 'react';
import { HiOutlineBookOpen } from 'react-icons/hi';
import { defaultImageUrl } from '../../utils/constants';

import styles from './articleCard.module.css';

const ArticleCard = ({ article }) => {
  const isLongTitle = article.title.split('').length > 50;
  function shortenTitle(title) {
    return `${title.split('').splice(0, 30).join('')}...`;
  }

  return (
    <div className={styles.articleCardContainer}>
      <img
        className={styles.articleCardImage}
        src={defaultImageUrl}
        alt='Autor icon'
      />
      <div className={styles.articleCardInfo}>
        <p>{isLongTitle ? shortenTitle(article.title) : article.title}</p>
        <p>{article.author}</p>
      </div>
      <div className={styles.articleCardIconContainer}>
        <HiOutlineBookOpen className='h-7 w-7' />
      </div>
    </div>
  );
};
export default ArticleCard;
