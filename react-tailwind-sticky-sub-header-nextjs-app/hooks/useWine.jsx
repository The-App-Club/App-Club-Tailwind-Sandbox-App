import dataWines from '@/data/wines.json';
import {useMemo} from 'react';

const useWine = ({id}) => {
  const activeWine = useMemo(() => {
    return dataWines.find((item) => {
      return item.id === Number(id);
    });
  }, [id]);

  return {activeWine};
};

export default useWine;
