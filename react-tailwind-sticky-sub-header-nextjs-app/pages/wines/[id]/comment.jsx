import {useRouter} from 'next/router';
import {useEffect, useMemo} from 'react';
import {useRecoilState, useRecoilValue} from 'recoil';
import hamburgerState from '../../../stores/hamburgerStore';
import data from '../../../data/wines.json';
import capitalize from 'capitalize-the-first-letter';
import TraceFooter from '../../../components/TraceFooter';
import Sidebar from '../../../components/Sidebar';
import Layout from '../../../layouts/default';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {GiGrapes} from 'react-icons/gi';
import {MdOutlineLocationOn, MdOutlineTimeline} from 'react-icons/md';
import {css, cx} from '@emotion/css';
import ScrollStory from '../../../components/ScrollStory';
import ScatterGraph from '../../../components/ScatterGraph';
import ScrollStory2 from '../../../components/ScrollStory2';
import {useScrollDirection} from 'react-use-scroll-direction';
import {motion, useAnimationControls} from 'framer-motion';
import {scrollDirectionState} from '../../../stores/scrollDirectionStore';
import Spacer from '../../../components/Spacer';
import wineState from '../../../stores/wineStore';
import {FaRegComments} from 'react-icons/fa';
import CommentTimeline from '../../../components/CommentTimeline';
import FocusedComment from '../../../components/FocusedComment';
import Product from '../../../components/comment/Product';
import mergician from 'mergician';
import commentData from '../../../data/comment.json';
import useCart from '../../../hooks/useCart';

const Comment = () => {
  const router = useRouter();
  const {id} = router.query;
  const {opened} = useRecoilValue(hamburgerState);
  const {carts} = useCart();

  const unCartedItem = useMemo(() => {
    return data.find((cart) => {
      return cart.id === Number(id);
    });
  }, [id]);

  const cartedItem = useMemo(() => {
    return carts.find((cart) => {
      return cart.id === Number(id);
    });
  }, [id, carts]);

  const item = useMemo(() => {
    if (!unCartedItem) {
      return;
    }
    if (cartedItem) {
      return cartedItem;
    }
    return mergician(unCartedItem, {
      amount: 0,
    });
  }, [unCartedItem, cartedItem]);

  if (!item) {
    return;
  }

  return (
    <>
      <Sidebar />
      <Layout>
        <section
          className={cx(
            `p-2`,
            css`
              position: absolute;
              top: 0;
              left: 18rem;
              max-width: calc(100% - 18rem);
              width: 100%;
              min-height: 100vh;
              transition: left 0.2s ease ${opened ? 0 : 250}ms,
                max-width 0.2s ease ${opened ? 0 : 250}ms;
              @media (max-width: 768px) {
                position: initial;
                top: initial;
                left: 0;
                max-width: 100%;
              }
              nav {
                z-index: 3;
                position: sticky;
                top: 3rem;
                width: 100%;
                ol {
                  width: 100%;
                  min-height: 3rem;
                  display: flex;
                  align-items: center;
                  gap: 0.5rem;
                }
              }
            `
          )}
        >
          {/* <Breadcrumbs
            useDefaultStyle={true}
            replaceCharacterList={[{from: '.', to: ' '}]}
            containerClassName="bg-white dark:bg-slate-700"
            activeItemClassName={'text-gray-500 dark:text-slate-500'}
            inactiveItemClassName={
              'text-gray-800 font-bold dark:text-slate-300'
            }
            transformLabel={(title) => {
              const niceTitle = capitalize(title);
              if (niceTitle === `Comment`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          /> */}
          {/* <div
            className={cx(
              css`
                z-index: 3;
                position: sticky;
                top: 6rem;
                min-height: 3rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 0.5rem;
              `,
              `bg-white dark:bg-slate-700 shadow-md p-2`
            )}
          >
            <h2
              className={cx(
                `w-full text-xl flex flex-col justify-start gap-1`,
                css`
                  @media (max-width: 768px) {
                    flex-direction: column;
                    align-items: flex-start;
                  }
                `
              )}
            >
              Comment
            </h2>
          </div>
          <Spacer /> */}
          <div
            className={cx(
              css`
                width: 100%;
                max-width: 100%;
                min-height: 100vh;
                display: flex;
                justify-content: space-between;
                align-items: flex-start;
                gap: 1rem;
                @media (max-width: 1000px) {
                  min-height: initial;
                  flex-direction: column;
                }
              `
            )}
          >
            <CommentTimeline />
            <aside
              className={cx(
                css`
                  max-width: 34rem;
                  width: 100%;
                  position: sticky;
                  top: 0.5rem;
                  z-index: 1;
                  min-height: 20rem; // mock attach
                  @media (max-width: 1000px) {
                    max-width: 100%;
                  }
                `,
                `bg-white dark:bg-slate-700 shadow-2xl rounded-xl`,
                `border-2 border-gray-200 dark:border-slate-500`
              )}
            >
              <Product item={item} />
              <FocusedComment item={commentData[4]} />
            </aside>
          </div>
        </section>
        <TraceFooter />
      </Layout>
    </>
  );
};

export default Comment;
