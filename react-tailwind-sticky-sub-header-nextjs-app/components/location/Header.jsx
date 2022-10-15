import locationSelectorState from '@/stores/locationSelectorStore';
import {css, cx} from '@emotion/css';
import {useRecoilValue} from 'recoil';
import LocationSelector from '@/components/location/LocationSelector';

const Header = () => {
  const {activeLocationName} = useRecoilValue(locationSelectorState);

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
            padding: 0.5rem;
          }
        `,
        `bg-white dark:bg-slate-700 shadow-md px-2`
      )}
    >
      <h2
        className={cx(`w-full text-xl flex items-center justify-start gap-2`)}
      >
        {`Location@${activeLocationName}`}
      </h2>
      <LocationSelector />
    </div>
  );
};

export default Header;
