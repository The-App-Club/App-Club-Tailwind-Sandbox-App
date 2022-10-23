import {useRecoilState, useSetRecoilState} from 'recoil';

import locationSelectorState from '@/stores/locationSelectorStore';

const useLocation = () => {
  const [location, setLocation] = useRecoilState(locationSelectorState);

  return {
    location,
    setLocation,
  };
};

export default useLocation;
