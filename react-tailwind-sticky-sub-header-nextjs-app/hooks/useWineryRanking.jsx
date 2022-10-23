import {arrange, desc, map, sliceHead, tidy} from '@tidyjs/tidy';
import {useMemo} from 'react';

import dataWineries from '@/data/wineries.json';

const useWineryRanking = () => {
  const wineryShipWinesRankingData = useMemo(() => {
    // https://stackoverflow.com/a/48218209
    return tidy(
      dataWineries,
      map((item) => {
        return {
          ...item,
          winesCount: item.wines.length,
        };
      }),
      arrange([desc('winesCount')]),
      map((item) => {
        return {
          wineryId: item.wineryId,
          wineryName: item.wineryName,
          winery: item.winery,
          thumbnail: item.thumbnail,
          winesCount: item.winesCount,
        };
      }),
      sliceHead(5)
    );
  }, []);
  return {
    wineryShipWinesRankingData,
  };
};

export default useWineryRanking;
