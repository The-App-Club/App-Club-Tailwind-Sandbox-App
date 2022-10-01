import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Layout from '../layouts/default';
import hamburgerState from '../stores/hamburgerStore';
import {useRecoilValue} from 'recoil';

const Price = () => {
  const {opened} = useRecoilValue(hamburgerState);

  return (
    <>
      <Sidebar />
      <Layout>
        <section
          className={cx(
            `mt-12`,
            css`
              position: absolute;
              top: 0;
              left: 20rem;
              max-width: calc(100% - 20rem);
              width: 100%;
              min-height: 100vh;
              transition: left 0.2s ease ${opened ? 0 : 250}ms,
                max-width 0.2s ease ${opened ? 0 : 250}ms;
              @media (max-width: 768px) {
                left: 0;
                max-width: 100%;
              }
            `
          )}
        >
          <h2 className="text-3xl flex items-center justify-center">Price</h2>
          <p className="flex items-center justify-center">something...</p>
        </section>
      </Layout>
    </>
  );
};

export default Price;
