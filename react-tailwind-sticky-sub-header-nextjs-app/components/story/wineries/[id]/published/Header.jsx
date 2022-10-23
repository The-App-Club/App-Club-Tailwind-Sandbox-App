import {css, cx} from '@emotion/css';
import {useRouter} from 'next/router';

import useWinery from '@/hooks/useWinery';

const Header = () => {
  const router = useRouter();
  const {id} = router.query;
  const {activeWinery} = useWinery({id});

  if (!activeWinery) {
    return;
  }

  return (
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
        className={cx(`w-full text-xl flex items-center justify-start gap-2`)}
      >
        {`Published Winery Stories@${activeWinery.wineryName}`}
      </h2>
    </div>
  );
};

export default Header;
