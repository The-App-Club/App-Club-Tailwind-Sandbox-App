import {css} from '@emotion/css';
import {useRouter} from 'next/router';

import ProductGalleryItem from '@/components/wineries/ProductGalleryItem';
import useWinery from '@/hooks/useWinery';

const Container = () => {
  const router = useRouter();
  const {id} = router.query;
  const {activeWinery} = useWinery({id});
  return (
    <div
      className={css`
        width: 100%;
        display: grid;
        gap: 0.5rem;
        grid-template-columns: repeat(4, 1fr);
        @media (max-width: 1200px) {
          grid-template-columns: repeat(2, 1fr);
        }
      `}
    >
      {activeWinery.wines.map((item, index) => {
        return <ProductGalleryItem key={index} item={item} />;
      })}
    </div>
  );
};

export default Container;
