import {css, cx} from '@emotion/css';
import Link from 'next/link';
import Sidebar from '../components/Sidebar';
import Layout from '../layouts/default';
import hamburgerState from '../stores/hamburgerStore';
import {useRecoilState, useRecoilValue} from 'recoil';
import Breadcrumbs from 'nextjs-breadcrumbs';
import capitalize from 'capitalize-the-first-letter';
import cartState from '../stores/cartStore';
import ProductGalleryItem from '../components/ProductGalleryItem';
import useCart from '../hooks/useCart';
import {useEffect, useState} from 'react';
import Spacer from '../components/Spacer';
import ProductCartItem from '../components/ProductCartItem';
import ReviewRanking from '../components/ReviewRanking';
import FlipMove from 'react-flip-move';
import CartSummary from '../components/CartSummary';

const Cart = () => {
  const [isClient, setIsClient] = useState(false);
  const {opened} = useRecoilValue(hamburgerState);
  const {carts, removeAllFromCart} = useCart();

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setIsClient(true);
    }
  }, []);

  const renderCartContent = () => {
    if (carts.length === 0) {
      return (
        <div
          className={cx(
            `w-full flex justify-center flex-col items-center`,
            `border-2  rounded-lg shadow-lg p-2`
          )}
        >
          <p>Nothing wines in cart...</p>
          <Link href={`/wines`}>
            <a className="hover:underline">See Wines</a>
          </Link>
        </div>
      );
    } else {
      return (
        <div
          className={css`
            width: 100%;
            display: flex;
            justify-content: flex-start;
            flex-direction: column;
            align-items: flex-start;
            gap: 3rem;
          `}
        >
          {carts.map((item, index) => {
            return <ProductCartItem key={index} item={item} />;
          })}
        </div>
      );
    }
  };

  const handleRemoveAllFromCart = (e) => {
    removeAllFromCart();
  };

  const handleCheckout = (e) => {
    console.log(`checkout`);
  };

  return (
    <>
      <Sidebar />
      <Layout>
        <section
          className={cx(
            `mt-12 px-2 pb-2`,
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
                left: 0;
                max-width: 100%;
              }
              nav {
                z-index: 3;
                position: sticky;
                top: 3rem;
                width: 100%;
                padding: 0 0.5rem;
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
          <Breadcrumbs
            useDefaultStyle={true}
            replaceCharacterList={[{from: '.', to: ' '}]}
            containerClassName="bg-white dark:bg-slate-700"
            activeItemClassName={'text-gray-500 dark:text-slate-500'}
            inactiveItemClassName={
              'text-gray-800 font-bold dark:text-slate-300'
            }
            transformLabel={(title) => {
              const niceTitle = capitalize(title);
              if (niceTitle === `Cart`) {
                return `${niceTitle}`;
              }
              return `${niceTitle} > `;
            }}
          />
          <div
            className={cx(
              css`
                z-index: 3;
                position: sticky;
                top: 6rem;
                min-height: 3rem;
                width: 100%;
                display: flex;
                justify-content: space-between;
                align-items: center;
                flex-direction: column;
                gap: 1rem;
              `,
              `bg-white dark:bg-slate-700 shadow-md p-2`
            )}
          >
            <div className="w-full flex justify-between items-center gap-4">
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
                Cart
              </h2>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
                  onClick={handleRemoveAllFromCart}
                >
                  Remove All
                </button>
              </div>
              <div className="flex items-center gap-2">
                <button
                  className="px-2 py-2 bg-blue-500 hover:bg-blue-800 text-white rounded-lg w-24 text-sm text-center"
                  onClick={handleCheckout}
                >
                  Checkout
                </button>
              </div>
            </div>
            <CartSummary />
          </div>
          <Spacer />
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
            {isClient && renderCartContent()}
            <ReviewRanking
              className={css`
                position: sticky;
                top: calc(3rem + 3rem + 92px + 16px);
              `}
            />
          </div>
        </section>
      </Layout>
    </>
  );
};

export default Cart;
