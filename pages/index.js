import { collection, getDocs } from 'firebase/firestore';
import Head from 'next/head';
import { useState } from 'react';
import ArticleCard from '../components/ArticleCard/ArticleCard';
import Layout from '../components/Layout/Layout';
import SearchInput from '../components/SearchInput/SearchInput';
import { firestore } from '../firebase/clientApp';

const Home = ({ articlesArray }) => {
  const [filtredArticles, setFilteredArticles] = useState(articlesArray);
  const [searchValue, setSearchValue] = useState('');

  const showResetButton = filtredArticles.length !== articlesArray.length;

  const handleSearch = e => {
    e.preventDefault();
    const filtredArticles = articlesArray.filter(article =>
      article.title.toLowerCase().includes(searchValue.toLowerCase().trim())
    );
    setFilteredArticles(filtredArticles);
  };

  const handleResetSearch = () => {
    setFilteredArticles(articlesArray);
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
              className='reset__button'
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

export default Home;
