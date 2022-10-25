import { useRouter } from 'next/router';

const Article = () => {
  const router = useRouter();
  const { id } = router.query;

  return <p>Post: {id}</p>;
};

export default Article;
