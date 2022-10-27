import styles from './loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <div className={styles.loader__container}>
        <span className={styles.loader__round}></span>
      </div>
    </div>
  );
};

export default Loader;
