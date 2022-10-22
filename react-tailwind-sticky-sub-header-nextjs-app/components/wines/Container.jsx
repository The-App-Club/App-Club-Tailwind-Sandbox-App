import dataWines from '@/data/wines.json';
import ProductGalleryItem from '@/components/wines/ProductGalleryItem';
import {css} from '@emotion/css';

const Container = () => {
  return (
    <div
      className={css`
        display: grid;
        gap: 0.5rem;
        grid-template-columns: repeat(4, 1fr);
        @media (max-width: 1200px) {
          grid-template-columns: repeat(2, 1fr);
        }
      `}
    >
      {dataWines.map((item, index) => {
        return <ProductGalleryItem key={index} item={item} />;
      })}
    </div>
  );
};

export default Container;
