import Head from 'next/head';

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
      <h1>New Awesome project</h1>
    </>
  );
};

export default Home;
