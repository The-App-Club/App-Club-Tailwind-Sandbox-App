import {css, cx} from '@emotion/css';
import Link from 'next/link';
import {useRouter} from 'next/router';
import {useRecoilValue} from 'recoil';
import wineState from '../../stores/wineStore';
import Layout from '../../layouts/default';
import Spacer from '../../components/Spacer';
import {useMemo} from 'react';
import data from '../../data/wines.json';

const Wine = () => {
  const router = useRouter();
  const {id} = router.query;
  const item = useMemo(() => {
    return data.find((item) => {
      return item.id === Number(id);
    });
  }, [id]);

  if (!item) {
    return;
  }

  console.log(item);

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
          {item.wine}
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
          <div className="font-bold">{`Produced by ${item.winery}`}</div>
          <div className="font-bold">{`@${item.location}`}</div>
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
            <picture className={css``}>
              <source srcSet={item.image} type={`image/png`} />
              <img
                src={item.image}
                alt={item.wine}
                width={130}
                height={'auto'}
              />
            </picture>
            <div className="w-full">
              <div className="flex items-center w-full justify-end gap-2">
                <span className="text-4xl text-rose-400 dark:text-amber-400">
                  {item.rating.average}
                </span>
                <span className="text-md">{item.rating.reviews}</span>
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

export default Wine;
