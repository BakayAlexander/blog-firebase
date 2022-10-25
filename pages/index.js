import Head from 'next/head';
import Layout from '../components/Layout/Layout';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import { mokAricles } from '../data/articles';

const Home = () => {
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
          {mokAricles.map(article => (
            <ArticleCard
              key={article.id}
              article={article}
            />
          ))}
        </section>
      </Layout>
    </>
  );
};

export default Home;
