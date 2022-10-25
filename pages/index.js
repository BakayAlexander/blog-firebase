import Head from 'next/head';
import { useState } from 'react';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import { mokAricles } from '../data/articles';

const Home = () => {
  const [filtredArticles, setFilteredArticles] = useState(mokAricles);
  const [searchValue, setSearchValue] = useState('');

  const showResetButton = filtredArticles.length !== mokAricles.length;

  const handleSearch = e => {
    e.preventDefault();
    const filtredArticles = mokAricles.filter(article =>
      article.title.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
    setFilteredArticles(filtredArticles);
  };

  const handleResetSearch = () => {
    setFilteredArticles(mokAricles);
    setSearchValue('');
  };

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
          <SearchInput
            searchValue={searchValue}
            setSearchValue={setSearchValue}
            handleSearch={handleSearch}
          />
          {showResetButton && (
            <button
              className='resetSearchButton'
              onClick={handleResetSearch}
            >
              Reset search
            </button>
          )}

          {filtredArticles.map(article => (
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
