import create from 'zustand';

const useFeedFetchType = create((set) => {
  return {
    lastestFetchType: `personalized`,
    storeFetchType: ({currentFetchType}) => {
      set((state) => {
        state.lastestFetchType = currentFetchType;
      });
    },
  };
});

export {useFeedFetchType};
