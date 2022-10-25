import Head from 'next/head';
import { useRouter } from 'next/router';
import ArticleCard from '../../components/ArticleCard/ArticleCard';
import Layout from '../../components/Layout/Layout';
import RouterButton from '../../components/RouterButton/RouterButton';
import { mokAricles } from '../../data/articles';

const Topic = () => {
  const router = useRouter();
  const { topic } = router.query;
  const articles = mokAricles.filter(article => article.topic.toLowerCase() === topic);

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
          <h1 className='homeTopicTitle'>{!!articles.length ? `Topic: ${articles[0]?.topic}` : 'Nothing found'} </h1>
          {articles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
          <RouterButton
            link='/'
            title='To Main Page'
          />
        </section>
      </Layout>
    </>
  );
};

export default Topic;
