import { doc, getDoc } from 'firebase/firestore';
import Head from 'next/head';
import Link from 'next/link';
import { useRouter } from 'next/router';
import Layout from '../../components/Layout/Layout';
import RouterButton from '../../components/RouterButton/RouterButton';
import { firestore } from '../../firebase/clientApp';
import { defaultImageUrl } from '../../utils/constants';

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
        <section className='article'>
          <RouterButton
            link='/'
            title='To Main Page'
            arrow
          />
          <div className='articleInformation'>
            <img
              className='articleAuthorAvatar'
              src={article?.avatar || defaultImageUrl}
              alt='Author icon'
            />
            <div className='articleDescriptionContainer'>
              <h1 className='articleTitle'>{article?.title}</h1>
              <div className='articleTopicContainer'>
                <p>{article?.author}</p>
                <div className='articleCirclePoint'></div>
                <Link href={`/topics/${article?.topic.toLowerCase()}`}>
                  <h2 className='link text-sm text-sky-700'>{article?.topic}</h2>
                </Link>
              </div>
            </div>
          </div>

          <p className='articleMainText'>{article?.text}</p>
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
