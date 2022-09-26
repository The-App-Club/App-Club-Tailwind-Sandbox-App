import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Layout from '../layouts/default';
import {useEffect, useState} from 'react';
import {Form} from '../components/Form';

const Home = () => {
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
            @media (max-width: 768px) {
              padding: 0 1rem;
            }
          `
        )}
      >
        <h2 className="text-3xl flex items-center justify-center">Home</h2>
        <Form />
        {/* <Link href={'/'}>
          <a className="hover:underline">Back to home</a>
        </Link>
        <Link href={'/wines'}>
          <a className="hover:underline">Go to wines</a>
        </Link> */}
      </section>
    </Layout>
  );
};

export default Home;
