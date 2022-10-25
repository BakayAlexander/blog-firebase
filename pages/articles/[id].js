import { useRouter } from 'next/router';
import Head from 'next/head';
import Layout from '../../components/Layout/Layout';
import { mokAricles } from '../../data/articles';
import { AiOutlineArrowLeft } from 'react-icons/ai';
import { defaultImageUrl } from '../../utils/constants';

const Article = () => {
  const router = useRouter();
  const { id } = router.query;
  const article = mokAricles[id - 1];

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
        <section className='article'>
          <button
            onClick={() => {
              router.push('/');
            }}
            className='articleButton link'
          >
            <AiOutlineArrowLeft className='h-7 w-7' />
            Move to main
          </button>
          <div className='articleInformation'>
            <img
              className='articleAuthorAvatar'
              src={defaultImageUrl}
              alt='Author icon'
            />
            <div className='articleDescriptionContainer'>
              <h1 className='articleTitle'>{article?.title}</h1>
              <div className='articleTopicContainer'>
                <p>{article?.author}</p>
                <div className='articleCirclePoint'></div>
                <h2>{article?.topic}</h2>
              </div>
            </div>
          </div>

          <p className='articleMainText'>{article?.text}</p>
        </section>
      </Layout>
    </>
  );
};

export default Article;
