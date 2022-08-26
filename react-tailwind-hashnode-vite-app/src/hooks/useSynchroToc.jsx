import create from 'zustand';

const useSynchroToc = create((set) => {
  return {
    activeHref: null,
    setAcitveHref: ({href}) => {
      set((state) => {
        state.activeHref = href;
      });
    },
  };
});

export {useSynchroToc};
