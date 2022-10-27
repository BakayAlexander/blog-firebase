import Head from 'next/head';
import { useRouter } from 'next/router';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import Layout from '../../components/Layout/Layout';
import RouterButton from '../../components/RouterButton/RouterButton';
import { collection, getDocs } from 'firebase/firestore';
import { firestore } from '../../firebase/clientApp';

const Topic = ({ articlesArray }) => {
  const router = useRouter();
  const { topic } = router.query;
  const articles = articlesArray.filter(article => article.topic.toLowerCase() === topic);

  return (
    <>
      <Head>
        <title>Home</title>
        <meta
          name='Blog App'
          content='Simple blog app'
        />
        <link
          rel='icon'
          href='/favicon.ico'
        />
      </Head>
      <Layout>
        <section className='home'>
          <h1 className='topic__title'>{!!articles.length ? `Topic: ${articles[0]?.topic}` : 'Nothing found'} </h1>
          {articles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
          <RouterButton
            link='/'
            title='To Main Page'
            arrow
          />
        </section>
      </Layout>
    </>
  );
};

export const getServerSideProps = async () => {
  try {
    const response = await getDocs(collection(firestore, 'articles'));
    const articlesArray = [];
    response.forEach(article => {
      articlesArray.push(article.data());
    });
    return {
      props: { articlesArray },
    };
  } catch (error) {
    console.log(error);
  }
};

export default Topic;
