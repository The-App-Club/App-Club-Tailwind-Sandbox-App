import {arrange, desc, map, sliceHead, tidy} from '@tidyjs/tidy';
import {useMemo} from 'react';

import dataWines from '@/data/wines.json';

const useWineRanking = () => {
  const winePriceRankingData = useMemo(() => {
    // https://stackoverflow.com/a/48218209
    return tidy(
      dataWines,
      arrange([desc('price')]),
      map((item) => {
        return {
          id: item.id,
          price: item.price,
          wine: item.wine,
          winery: item.winery,
          locationId: item.locationId,
          location: item.location,
          image: item.image,
        };
      }),
      sliceHead(5)
    );
  }, []);
  const wineRecentOrderRankingData = useMemo(() => {
    // https://stackoverflow.com/a/48218209
    return tidy(
      dataWines,
      arrange([desc('price')]),
      map((item) => {
        return {
          id: item.id,
          price: item.price,
          wine: item.wine,
          winery: item.winery,
          locationId: item.locationId,
          location: item.location,
          image: item.image,
        };
      }),
      sliceHead(5)
    );
  }, []);
  const wineReviewRankingData = useMemo(() => {
    // https://stackoverflow.com/a/48218209
    return tidy(
      dataWines,
      map((item) => {
        return {
          ...item,
          average: Number(item.rating.average),
          reviews: Number(item.rating.reviews.replace('ratings', '').trim()),
        };
      }),
      arrange([desc('reviews')]),
      map((item) => {
        return {
          id: item.id,
          wine: item.wine,
          winery: item.winery,
          locationId: item.locationId,
          location: item.location,
          image: item.image,
          reviews: item.rating.reviews,
        };
      }),
      sliceHead(5)
    );
  }, []);
  const wineLocationRankingData = useMemo(() => {
    // https://stackoverflow.com/a/48218209
    return tidy(
      dataWines,
      map((item) => {
        return {
          ...item,
          average: Number(item.rating.average),
          reviews: Number(item.rating.reviews.replace('ratings', '').trim()),
        };
      }),
      arrange([desc('reviews')]),
      map((item) => {
        return {
          id: item.id,
          wine: item.wine,
          winery: item.winery,
          locationId: item.locationId,
          location: item.location,
          image: item.image,
          reviews: item.rating.reviews,
        };
      }),
      sliceHead(5)
    );
  }, []);

  return {
    winePriceRankingData,
    wineRecentOrderRankingData,
    wineReviewRankingData,
    wineLocationRankingData,
  };
};

export default useWineRanking;
