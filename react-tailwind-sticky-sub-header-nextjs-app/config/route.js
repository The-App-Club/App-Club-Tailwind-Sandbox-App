const routes = [
  {
    pathName: `/`,
    pageName: `Home`,
    activeMenuName: `Home`,
  },
  {
    pathName: `/404`,
    pageName: `Not Found`,
    activeMenuName: `Not Found`,
  },
  {
    pathName: `/subscribe`,
    pageName: `Subscribe`,
    activeMenuName: `Subscribe`,
  },
  {
    pathName: `/setting`,
    pageName: `Setting`,
    activeMenuName: `Setting`,
  },
  {
    pathName: `/story`,
    pageName: `Story`,
    activeMenuName: `Select Story`,
  },
  {
    pathName: `/story/[id]/create`,
    pageName: `Create Story`,
    activeMenuName: `Create Story`,
  },
  {
    pathName: `/story/[id]/edit`,
    pageName: `Edit Story`,
    activeMenuName: `Edit Story`,
  },

  {
    pathName: `/story/wines`,
    pageName: `Wine Story`,
    activeMenuName: `Wine Story`,
  },
  {
    pathName: `/story/wines/[id]`,
    pageName: `Wine Story`,
    activeMenuName: `Wine Story`,
  },

  {
    pathName: `/story/wines/[id]/published`,
    pageName: `Published Wine Story`,
    activeMenuName: `Published Wine Story`,
  },
  {
    pathName: `/story/wines/[id]/published/[pid]`,
    pageName: `Published Story`,
    activeMenuName: `Published Story`,
  },
  {
    pathName: `/story/wines/[id]/create`,
    pageName: `Create Wine Story`,
    activeMenuName: `Create Wine Story`,
  },
  {
    pathName: `/story/wines/[id]/edit`,
    pageName: `Edit Wine Story`,
    activeMenuName: `Edit Wine Story`,
  },
  {
    pathName: `/story/wineries`,
    pageName: `Winery Story`,
    activeMenuName: `Winery Story`,
  },
  {
    pathName: `/story/wineries/[id]`,
    pageName: `Winery Story`,
    activeMenuName: `Winery Story`,
  },
  {
    pathName: `/story/wineries/[id]/published`,
    pageName: `Published Winery Story`,
    activeMenuName: `Published Winery Story`,
  },
  {
    pathName: `/story/wineries/[id]/published/[pid]`,
    pageName: `Published Story`,
    activeMenuName: `Published Story`,
  },
  {
    pathName: `/story/wineries/[id]/create`,
    pageName: `Create Winery Story`,
    activeMenuName: `Create Winery Story`,
  },
  {
    pathName: `/story/wineries/[id]/edit`,
    pageName: `Edit Winery Story`,
    activeMenuName: `Edit Winery Story`,
  },
  {
    pathName: `/story/[id]/published/[pid]`,
    pageName: `Published Story`,
    activeMenuName: `Published Story`,
  },
  {
    pathName: `/story/favorite`,
    pageName: `Favorite Story`,
    activeMenuName: `Favorite Story`,
  },
  {
    pathName: `/story/favorite/wines`,
    pageName: `Favorite Wine Story`,
    activeMenuName: `Favorite Wine Story`,
  },
  {
    pathName: `/story/favorite/wineries`,
    pageName: `Favorite Winery Story`,
    activeMenuName: `Favorite Winery Story`,
  },
  {
    pathName: `/location`,
    pageName: `Location`,
    activeMenuName: `Location`,
  },
  {
    pathName: `/favorite`,
    pageName: `Favorite`,
    activeMenuName: `Favorite`,
  },
  {
    pathName: `/favorite/wines`,
    pageName: `Favorite`,
    activeMenuName: `Favorite`,
  },
  {
    pathName: `/favorite/wineries`,
    pageName: `Favorite`,
    activeMenuName: `Favorite`,
  },
  {
    pathName: `/feed`,
    pageName: `Feed`,
    activeMenuName: `Feed`,
  },
  {
    pathName: `/logout`,
    pageName: `Logout`,
    activeMenuName: `Logout`,
  },
  {
    pathName: `/about`,
    pageName: `About`,
    activeMenuName: `About`,
  },
  {
    pathName: `/notification`,
    pageName: `Notification`,
    activeMenuName: `Notification`,
  },
  {
    pathName: `/contact`,
    pageName: `Contact`,
    activeMenuName: `Contact`,
  },
  {
    pathName: `/cart`,
    pageName: `Cart`,
    activeMenuName: `Cart`,
  },
  {
    pathName: `/price`,
    pageName: `Price`,
    activeMenuName: `Price`,
  },
  {
    pathName: `/wines`,
    pageName: `Wines`,
    activeMenuName: `Wines`,
  },
  {
    pathName: `/wines/[id]`,
    pageName: `Wine Id`,
    activeMenuName: `Wines`,
  },
  {
    pathName: `/wines/[id]/story`,
    pageName: `Wine Story`,
    activeMenuName: `Wines`,
  },
  {
    pathName: `/wines/[id]/comment`,
    pageName: `Comment`,
    activeMenuName: `Comment`,
  },
  {
    pathName: `/wineries`,
    pageName: `Winery`,
    activeMenuName: `Winery`,
  },
  {
    pathName: `/wineries/[id]`,
    pageName: `Winery Id`,
    activeMenuName: `Winery`,
  },
];

export {routes};
