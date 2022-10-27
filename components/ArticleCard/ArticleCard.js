import Link from 'next/link';
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
      <div className={styles.card__container}>
        <img
          className={styles.card__image}
          src={article?.avatar || defaultImageUrl}
          alt='Author icon'
        />
        <div className={styles.card__info}>
          <p>{isLongTitle ? shortenTitle(article.title) : article.title}</p>
          <p>{article.author}</p>
        </div>
        <div className={styles.card__iconc}>
          <HiOutlineBookOpen className={styles.card__icon} />
        </div>
      </div>
    </Link>
  );
};
export default ArticleCard;
