import { useRouter } from 'next/router';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import styles from './routerButton.module.css';

const RouterButton = ({ link, title, arrow }) => {
  const router = useRouter();

  return (
    <button
      onClick={() => {
        router.push(link);
      }}
      className={styles.routerButton}
    >
      {arrow && <AiOutlineArrowLeft className={styles.routerButton__icon} />}
      <p>{title}</p>
    </button>
  );
};

export default RouterButton;
