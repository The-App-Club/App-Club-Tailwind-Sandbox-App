import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Layout from '../layouts/default';
import {useEffect, useMemo, useState} from 'react';
import {Form} from '../components/Form';
import {useRecoilValue} from 'recoil';
import pageState from '../stores/pageStore';
import {AnimatePresence, motion} from 'framer-motion';

const Home = () => {
  const {pageName} = useRecoilValue(pageState);

  return (
    <Layout className={`mt-12`}>
      <section
        className={cx(
          `max-w-7xl mx-auto w-full relative overflow-hidden overflow-y-auto`,
          css`
            display: flex;
            justify-content: center;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
          `
        )}
      >
        <AnimatePresence>
          {pageName === 'SignUp' && (
            <motion.div
              className={cx(
                'w-full flex flex-col items-center justify-center absolute top-0 left-0 h-4/6',
                css`
                  @media (max-width: 768px) {
                    padding: 0 1rem;
                  }
                `
              )}
              initial={{
                x: 160,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: 160,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
            >
              <h2 className="text-3xl flex items-center justify-center">
                アカウント作成
              </h2>
              <Form
                buttonText={'アカウント作成'}
                successMessage={'アカウントを作成しました'}
                linkText={'ログインはこちら'}
                actionPageName={'SignIn'}
              />
            </motion.div>
          )}
        </AnimatePresence>
        <AnimatePresence>
          {pageName === 'SignIn' && (
            <motion.div
              className={cx(
                'w-full flex flex-col items-center justify-center absolute top-0 left-0 h-4/6',
                css`
                  @media (max-width: 768px) {
                    padding: 0 1rem;
                  }
                `
              )}
              initial={{
                x: 160,
                opacity: 0,
              }}
              animate={{
                x: 0,
                opacity: 1,
              }}
              exit={{
                x: 160,
                opacity: 0,
              }}
              transition={{
                duration: 0.4,
                ease: 'easeInOut',
              }}
            >
              <h2 className="text-3xl flex items-center justify-center">
                ログイン
              </h2>
              <Form
                buttonText={'ログイン'}
                successMessage={'ログインしました'}
                linkText={'アカウント作成はこちら'}
                actionPageName={'SignUp'}
              />
            </motion.div>
          )}
        </AnimatePresence>
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
