import { GetStaticPaths } from 'next';
import Home, { getStaticProps as homeGetStaticProps } from '../index';

export const getStaticProps = homeGetStaticProps;

export const getStaticPaths: GetStaticPaths = async () => {
  return {
    paths: [
      { params: { locale: 'fr' } },
      { params: { locale: 'en' } },
    ],
    fallback: false,
  };
};

export default Home;
