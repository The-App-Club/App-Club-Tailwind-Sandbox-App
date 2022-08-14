import create from 'zustand';

const useNavOpenState = create((set) => {
  return {
    opened: false,
    setNavOpened: ({opened}) => {
      set((state) => {
        state.opened = opened;
      });
    },
  };
});

export {useNavOpenState};
