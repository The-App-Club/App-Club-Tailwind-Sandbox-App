import create from 'zustand';

const useTrendingFetchType = create((set) => {
  return {
    lastestFetchType: `week`,
    storeFetchType: ({currentFetchType}) => {
      set((state) => {
        state.lastestFetchType = currentFetchType;
      });
    },
  };
});

export {useTrendingFetchType};
