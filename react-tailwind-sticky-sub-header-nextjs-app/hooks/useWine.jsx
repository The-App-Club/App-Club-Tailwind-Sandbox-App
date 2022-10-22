import {useMemo} from 'react';

import dataWines from '@/data/wines.json';

const useWine = ({id}) => {
  const activeWine = useMemo(() => {
    return dataWines.find((item) => {
      return item.id === Number(id);
    });
  }, [id]);

  return {activeWine};
};

export default useWine;
