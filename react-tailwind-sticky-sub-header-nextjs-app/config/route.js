import Header from '@/components/Header';
import WinerySignInHeader from '@/components/winery/signin/Header';
import WinerySignUpHeader from '@/components/winery/signup/Header';
import WinesIdCommentHeader from '@/components/wines/[id]/comment/Header';

const routes = [
  {
    pathName: `/`,
    pageName: `Home`,
    activeMenuName: `Home`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/404`,
    pageName: `Not Found`,
    activeMenuName: `Not Found`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/winery/signup`,
    pageName: `Winery SignUp`,
    activeMenuName: `Winery SignUp`,
    header: () => {
      return <WinerySignUpHeader />;
    },
  },
  {
    pathName: `/winery/signin`,
    pageName: `Winery SignIn`,
    activeMenuName: `Winery SignIn`,
    header: () => {
      return <WinerySignInHeader />;
    },
  },
  {
    pathName: `/users`,
    pageName: `Users`,
    activeMenuName: `Users`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/users/[userId]`,
    pageName: `Users`,
    activeMenuName: `Users`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/subscribe`,
    pageName: `Subscribe`,
    activeMenuName: `Subscribe`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/dashboard`,
    pageName: `Dashboard`,
    activeMenuName: `Dashboard`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/dashboard/setting`,
    pageName: `Setting`,
    activeMenuName: `Setting`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/dashboard/notification`,
    pageName: `Notification`,
    activeMenuName: `Notification`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story`,
    pageName: `Story`,
    activeMenuName: `Select Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/[id]/create`,
    pageName: `Create Story`,
    activeMenuName: `Create Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/[id]/edit`,
    pageName: `Edit Story`,
    activeMenuName: `Edit Story`,
    header: () => {
      return <Header />;
    },
  },

  {
    pathName: `/story/wines`,
    pageName: `Wine Story`,
    activeMenuName: `Wine Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/wines/[id]`,
    pageName: `Wine Story`,
    activeMenuName: `Wine Story`,
    header: () => {
      return <Header />;
    },
  },

  {
    pathName: `/story/wines/[id]/published`,
    pageName: `Published Wine Story`,
    activeMenuName: `Published Wine Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/wines/[id]/published/[pid]`,
    pageName: `Published Wine Story`,
    activeMenuName: `Published Wine Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/wines/[id]/create`,
    pageName: `Create Wine Story`,
    activeMenuName: `Create Wine Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/wines/[id]/edit`,
    pageName: `Edit Wine Story`,
    activeMenuName: `Edit Wine Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/wineries`,
    pageName: `Winery Story`,
    activeMenuName: `Winery Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/wineries/[id]`,
    pageName: `Winery Story`,
    activeMenuName: `Winery Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/wineries/[id]/published`,
    pageName: `Published Winery Story`,
    activeMenuName: `Published Winery Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/wineries/[id]/published/[pid]`,
    pageName: `Published Winery Story`,
    activeMenuName: `Published Winery Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/wineries/[id]/create`,
    pageName: `Create Winery Story`,
    activeMenuName: `Create Winery Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/wineries/[id]/edit`,
    pageName: `Edit Winery Story`,
    activeMenuName: `Edit Winery Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/[id]/published/[pid]`,
    pageName: `Published Story`,
    activeMenuName: `Published Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/favorite`,
    pageName: `Favorite Story`,
    activeMenuName: `Favorite Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/favorite/wines`,
    pageName: `Favorite Wine Story`,
    activeMenuName: `Favorite Wine Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/favorite/wines/[wineId]`,
    pageName: `Favorite Wine Story`,
    activeMenuName: `Favorite Wine Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/favorite/wineries`,
    pageName: `Favorite Winery Story`,
    activeMenuName: `Favorite Winery Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/story/favorite/wineries/[wineryId]`,
    pageName: `Favorite Winery Story`,
    activeMenuName: `Favorite Winery Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/location`,
    pageName: `Location`,
    activeMenuName: `Location`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/favorite`,
    pageName: `Favorite`,
    activeMenuName: `Favorite`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/favorite/wines`,
    pageName: `Favorite Wine`,
    activeMenuName: `Favorite Wine`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/favorite/wineries`,
    pageName: `Favorite Winery`,
    activeMenuName: `Favorite Winery`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/feed`,
    pageName: `Feed`,
    activeMenuName: `Feed`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/logout`,
    pageName: `Logout`,
    activeMenuName: `Logout`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/about`,
    pageName: `About`,
    activeMenuName: `About`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/contact`,
    pageName: `Contact`,
    activeMenuName: `Contact`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/cart`,
    pageName: `Cart`,
    activeMenuName: `Cart`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/price`,
    pageName: `Price`,
    activeMenuName: `Price`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wines`,
    pageName: `Wines`,
    activeMenuName: `Wines`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wines/[id]`,
    pageName: `Wine Id`,
    activeMenuName: `Wines`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wines/[id]/stories`,
    pageName: `Wine Story`,
    activeMenuName: `Wine Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wines/[id]/stories/[storyId]`,
    pageName: `Wine Story`,
    activeMenuName: `Wine Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wines/[id]/stories/[storyId]/chapters`,
    pageName: `Chapters`,
    activeMenuName: `Chapters`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wines/[id]/stories/[storyId]/chapters/[chapterId]`,
    pageName: `Chapter`,
    activeMenuName: `Chapter`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wines/[id]/story`,
    pageName: `Wine Story`,
    activeMenuName: `Wines`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wines/[id]/comment`,
    pageName: `Comment`,
    activeMenuName: `Comment`,
    header: () => {
      return <WinesIdCommentHeader />;
    },
  },
  {
    pathName: `/wineries`,
    pageName: `Winery`,
    activeMenuName: `Winery`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wineries/[id]`,
    pageName: `Winery Id`,
    activeMenuName: `Winery`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wineries/[id]/stories`,
    pageName: `Winery Story`,
    activeMenuName: `Winery Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wineries/[id]/stories/[storyId]`,
    pageName: `Winery Story`,
    activeMenuName: `Winery Story`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wineries/[id]/stories/[storyId]/chapters`,
    pageName: `Chapters`,
    activeMenuName: `Chapters`,
    header: () => {
      return <Header />;
    },
  },
  {
    pathName: `/wineries/[id]/stories/[storyId]/chapters/[chapterId]`,
    pageName: `Chapter`,
    activeMenuName: `Chapter`,
    header: () => {
      return <Header />;
    },
  },
];

export {routes};
