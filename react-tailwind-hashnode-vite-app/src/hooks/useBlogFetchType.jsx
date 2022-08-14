import create from 'zustand';

const useBlogFetchType = create((set) => {
  return {
    lastestFetchType: `Pageviews`,
    storeFetchType: ({currentFetchType}) => {
      set((state) => {
        state.lastestFetchType = currentFetchType;
      });
    },
  };
});

export {useBlogFetchType};
