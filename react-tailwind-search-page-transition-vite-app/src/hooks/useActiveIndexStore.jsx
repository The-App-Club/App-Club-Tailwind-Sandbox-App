import create from 'zustand';

const useActiveIndexStore = create((set) => {
  return {
    activeIndex: 0,
    resetActiveIndex: () => {
      set((state) => {
        state.activeIndex = 0;
      });
    },
    storeActiveIndex: ({pressType, selectedIndex, maxSize}) => {
      set((state) => {
        if (pressType === `arrowDown`) {
          state.activeIndex =
            state.activeIndex !== maxSize - 1 ? state.activeIndex + 1 : 0;
          return;
        }
        if (pressType === `arrowUp`) {
          state.activeIndex =
            state.activeIndex !== 0 ? state.activeIndex - 1 : maxSize - 1;
          return;
        }
        if (pressType === `select`) {
          state.activeIndex = selectedIndex;
          return;
        }
      });
    },
  };
});

export {useActiveIndexStore};
