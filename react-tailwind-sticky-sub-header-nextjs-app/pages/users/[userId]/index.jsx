import {css, cx} from '@emotion/css';
import capitalize from 'capitalize-the-first-letter';
import {useRouter} from 'next/router';
import Breadcrumbs from 'nextjs-breadcrumbs';
import {useMemo} from 'react';
import {useRecoilValue} from 'recoil';

import Sidebar from '@/components/users/[userId]/Sidebar';
import dataUsers from '@/data/users.json';
import Layout from '@/layouts/default';
import hamburgerState from '@/stores/hamburgerStore';

const User = () => {
  const router = useRouter();
  const {opened} = useRecoilValue(hamburgerState);

  const {userId} = router.query;

  const activeUser = useMemo(() => {
    return dataUsers.find((user) => {
      return user.userId === userId;
    });
  }, [userId]);

  if (!activeUser) {
    return;
  }
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
                position: sticky;
                top: 3rem;
                width: 100%;
                padding: 0 0.5rem;
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
              if (title === userId) {
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
                padding: 0 0.5rem;
                @media (max-width: 768px) {
                  justify-content: flex-start;
                  align-items: flex-start;
                  flex-direction: column;
                }
              `,
              `bg-white dark:bg-slate-700 shadow-md px-2`
            )}
          >
            <h2
              className={cx(
                `w-full text-xl flex items-center justify-start gap-2`
              )}
            >
              User
            </h2>
          </div>
          <p>{activeUser.userName}</p>
        </section>
      </Layout>
    </>
  );
};

export default User;
