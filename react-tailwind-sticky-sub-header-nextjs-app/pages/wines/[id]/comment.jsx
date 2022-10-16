import {css, cx} from '@emotion/css';
import mergician from 'mergician';
import {useRouter} from 'next/router';
import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import Sidebar from '@/components/Sidebar';
import CommentTimeline from '@/components/comment/CommentTimeline';
import FocusedComment from '@/components/comment/FocusedComment';
import Product from '@/components/comment/Product';
import TraceFooter from '@/components/wines/[id]/comment/TraceFooter';
import commentData from '@/data/comment.json';
import data from '@/data/wines.json';
import useCart from '@/hooks/useCart';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';

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
                  font-size: 0.875rem /* 14px */;
                  line-height: 1.25rem /* 20px */;
                  width: 100%;
                  min-height: 3rem;
                  display: flex;
                  align-items: center;
                  flex-wrap: wrap;
                  gap: 0.5rem;
                }
              }
            `
          )}
        >
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
