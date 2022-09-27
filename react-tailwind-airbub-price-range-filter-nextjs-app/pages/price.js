import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Layout from '../layouts/default';

const Price = () => {
  return (
    <Layout className={`mt-12`}>
      <section
        className={cx(
          `max-w-7xl mx-auto w-full`,
          css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
          `
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">Price</h2>
        <p className="flex items-center justify-center">something...</p>
        <p className="flex items-center justify-center">something...</p>
        <p className="flex items-center justify-center">something...</p>
        <Link href={'/'}>
          <a className="hover:underline">Back to home</a>
        </Link>
      </section>
    </Layout>
  );
};

export default Price;
