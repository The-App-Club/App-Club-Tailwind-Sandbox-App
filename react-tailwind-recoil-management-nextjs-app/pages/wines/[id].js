import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import wineState from '../../stores/wineStore';
import Layout from '../../layouts/default';
import Spacer from '../../components/Spacer';
import {useMemo} from 'react';
import data from '../../data/wines.json';

const Wine = ({wine: data}) => {
  const router = useRouter();
  const {id} = router.query;
  return (
    <Layout className={`mt-12 px-2`}>
      <section
        className={cx(
          `max-w-xl mx-auto w-full`,
          css`
            display: flex;
            justify-content: flex-start;
            align-items: center;
            flex-direction: column;
            min-height: 100vh;
          `
        )}
      >
        <div className="w-full flex items-center gap-2">
          <Link href={'/wines'}>
            <a className="hover:underline">Back to wines</a>
          </Link>
        </div>
        <Spacer />
        <h2 className="text-2xl pb-2">
          <span className="mr-2">{`#${id}`}</span>
          {data.wine}
        </h2>
        <div
          className={cx(
            'w-full flex items-center justify-end gap-2 text-sm',
            css`
              @media (max-width: 768px) {
                justify-content: center;
                flex-direction: column;
              }
            `
          )}
        >
          <div className="font-bold">{`Produced by ${data.winery}`}</div>
          <div className="font-bold">{`@${data.location}`}</div>
        </div>
        <Spacer />
        <div
          className={cx(
            css`
              min-height: 14rem;
            `,
            'relative w-full'
          )}
        >
          <div className="w-full flex items-start gap-2">
            <img src={data.image} alt={data.wine} width={130} />
            <div className="w-full">
              <div className="flex items-center w-full justify-end gap-2">
                <span className="text-4xl text-rose-400 dark:text-amber-400">
                  {data.rating.average}
                </span>
                <span className="text-md">{data.rating.reviews}</span>
              </div>
              <p>
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry&apos;s standard
                dummy text ever since the 1500s, when an unknown printer took a
                galley of type and scrambled.
              </p>
            </div>
          </div>
          <div className="w-full flex justify-end">
            <button className="px-6 py-2 bg-blue-500 text-white hover:bg-blue-700 rounded-lg">
              Add Cart
            </button>
          </div>
        </div>
      </section>
    </Layout>
  );
};

export const getStaticPaths = async () => {
  // const response = await fetch(`http://localhost:3000/api/listUpWines`);
  // const response = await fetch(`https://api.sampleapis.com/wines/reds`);
  // const {data} = await response.json();
  const paths = data.map((item) => {
    return {
      params: {
        id: item.id.toString(),
      },
    };
  });
  return {paths, fallback: false};
};

export const getStaticProps = async ({params}) => {
  // const response = await fetch(`http://localhost:3000/api/listUpWines`);
  // const response = await fetch(`https://api.sampleapis.com/wines/reds`);
  // const {data} = await response.json();
  const matchedData = data.find((item) => {
    return item.id === Number(params.id);
  });
  return {
    props: {
      wine: matchedData,
    },
    revalidate: 10,
  };
};

export default Wine;
