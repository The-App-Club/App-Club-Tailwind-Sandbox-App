import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Layout from '../../layouts/default';
import {tidy, summarize, sum, groupBy} from '@tidyjs/tidy';
import {useRouter} from 'next/router';
import data from '../../data/wines.json';
import {useMemo} from 'react';

const Wines = () => {
  const router = useRouter();
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
        <h2 className="text-3xl flex items-center justify-center">Wines</h2>
        <div
          className={cx(css`
            display: grid;
            grid-template-columns: repeat(4, 1fr);
            gap: 0.5rem;
            @media (max-width: 768px) {
              grid-template-columns: repeat(2, 1fr);
            }
          `)}
        >
          {data.map((item, index) => {
            return (
              <div
                key={index}
                onClick={(e) => {
                  router.push({
                    pathname: `/wines/${item.id}`,
                  });
                }}
                className={cx(
                  css`
                    background-image: url(${item.image});
                    background-size: contain;
                    background-repeat: no-repeat;
                    background-position: center center;
                    width: 160px;
                    height: 160px;
                  `,
                  `hover:cursor-pointer`,
                  `border-2 p-2`
                )}
              ></div>
            );
          })}
        </div>
      </section>
    </Layout>
  );
};

export default Wines;
