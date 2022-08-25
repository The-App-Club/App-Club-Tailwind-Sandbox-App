import create from 'zustand';
const useStoreSidebarMenuPosition = create((set) => {
  return {
    sidebarMenuPosition: {
      x: 0,
      y: 0,
      text: '',
      hovering: false,
    },
    setSidebarMenuPosition: ({x, y, text, hovering}) => {
      set((state) => {
        state.sidebarMenuPosition = {x, y, text, hovering};
      });
    },
  };
});

export {useStoreSidebarMenuPosition};
