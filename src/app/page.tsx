import { GetServerSideProps } from 'next';

export const getServerSideProps: GetServerSideProps = async (context) => {
  return {
    redirect: {
      destination: '/productslist',
      permanent: false,
    },
  };
};

export default function HomePage() {
  return null;
}
