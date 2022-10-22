import dataWineries from '@/data/wineries.json';
import {useMemo} from 'react';

const useWinery = ({id}) => {
  const activeWinery = useMemo(() => {
    return dataWineries.find((item) => {
      return item.wineryId === id;
    });
  }, [id]);

  return {activeWinery};
};

export default useWinery;
