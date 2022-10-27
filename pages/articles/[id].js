import { doc, getDoc } from 'firebase/firestore';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import RouterButton from '../../components/RouterButton/RouterButton';
import { firestore } from '../../firebase/clientApp';
import { defaultImageUrl } from '../../utils/constants';
import styles from '../../styles/article.module.css';

const Article = ({ article }) => {
  return (
    <>
      <Head>
        <title>{article?.title}</title>
        <meta
          name={article?.title}
          content='Simple blog app'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Layout>
        <section className={styles.article}>
          <RouterButton
            link='/'
            title='To Main Page'
            arrow
          />
          <div className={styles.article__information}>
            <img
              className={styles.article__avatar}
              src={article?.avatar || defaultImageUrl}
              alt='Author icon'
            />
            <div className={styles.article__descriptionContainer}>
              <h1 className={styles.article__title}>{article?.title}</h1>
              <div className={styles.article__topicContainer}>
                <p>{article?.author}</p>
                <div className={styles.article__circlePoint}></div>
                <Link href={`/topics/${article?.topic.toLowerCase()}`}>
                  <h2 className={styles.article__topic}>{article?.topic}</h2>
                </Link>
              </div>
            </div>
          </div>

          <p className={styles.article__text}>{article?.text}</p>
        </section>
      </Layout>
    </>
  );
};

export const getServerSideProps = async context => {
  console.log(context);
  try {
    const response = await getDoc(doc(firestore, 'articles', context.query.id));
    return {
      props: { article: response.data() },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Article;
