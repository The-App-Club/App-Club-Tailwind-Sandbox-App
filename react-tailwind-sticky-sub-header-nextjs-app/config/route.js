import Header from '@/components/Header';
import Footer from '@/components/Footer';
import WinerySignInHeader from '@/components/winery/signin/Header';
import WinerySignUpHeader from '@/components/winery/signup/Header';
import WinerySignInFooter from '@/components/winery/signin/Footer';
import WinerySignUpFooter from '@/components/winery/signup/Footer';

import UserSignInHeader from '@/components/user/signin/Header';
import UserSignUpHeader from '@/components/user/signup/Header';
import UserSignInFooter from '@/components/user/signin/Footer';
import UserSignUpFooter from '@/components/user/signup/Footer';

import WinesIdCommentHeader from '@/components/wines/[id]/comment/Header';

import AboutFooter from '@/components/about/Footer';
import ContactFooter from '@/components/contact/Footer';
import PriceFooter from '@/components/price/Footer';

const routes = [
  {
    pathName: `/`,
    pageName: `Home`,
    activeMenuName: `Home`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/404`,
    pageName: `Not Found`,
    activeMenuName: `Not Found`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/500`,
    pageName: `System Error`,
    activeMenuName: `System Error`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/winery/signup`,
    pageName: `Winery SignUp`,
    activeMenuName: `Winery SignUp`,
    header: () => {
      return <WinerySignUpHeader />;
    },
    footer: () => {
      return <WinerySignUpFooter />;
    },
  },
  {
    pathName: `/winery/signin`,
    pageName: `Winery SignIn`,
    activeMenuName: `Winery SignIn`,
    header: () => {
      return <WinerySignInHeader />;
    },
    footer: () => {
      return <WinerySignInFooter />;
    },
  },
  {
    pathName: `/users`,
    pageName: `Users`,
    activeMenuName: `Users`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/user/signup`,
    pageName: `User SignUp`,
    activeMenuName: `User SignUp`,
    header: () => {
      return <UserSignUpHeader />;
    },
    footer: () => {
      return <UserSignUpFooter />;
    },
  },
  {
    pathName: `/user/signin`,
    pageName: `User SignIn`,
    activeMenuName: `User SignIn`,
    header: () => {
      return <UserSignInHeader />;
    },
    footer: () => {
      return <UserSignInFooter />;
    },
  },
  {
    pathName: `/users/[userId]`,
    pageName: `Users`,
    activeMenuName: `Users`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/subscribe`,
    pageName: `Subscribe`,
    activeMenuName: `Subscribe`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/dashboard`,
    pageName: `Dashboard`,
    activeMenuName: `Dashboard`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/dashboard/setting`,
    pageName: `Setting`,
    activeMenuName: `Setting`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/dashboard/notification`,
    pageName: `Notification`,
    activeMenuName: `Notification`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story`,
    pageName: `Story`,
    activeMenuName: `Select Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/[id]`,
    pageName: `Story`,
    activeMenuName: `Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/[id]/create`,
    pageName: `Create Story`,
    activeMenuName: `Create Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/[id]/edit`,
    pageName: `Edit Story`,
    activeMenuName: `Edit Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },

  {
    pathName: `/story/wines`,
    pageName: `Wine Story`,
    activeMenuName: `Wine Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/wines/[id]`,
    pageName: `Wine Story`,
    activeMenuName: `Wine Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },

  {
    pathName: `/story/wines/[id]/published`,
    pageName: `Published Wine Story`,
    activeMenuName: `Published Wine Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/wines/[id]/published/[pid]`,
    pageName: `Published Wine Story`,
    activeMenuName: `Published Wine Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/wines/[id]/create`,
    pageName: `Create Wine Story`,
    activeMenuName: `Create Wine Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/wines/[id]/edit`,
    pageName: `Edit Wine Story`,
    activeMenuName: `Edit Wine Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/wineries`,
    pageName: `Winery Story`,
    activeMenuName: `Winery Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/wineries/[id]`,
    pageName: `Winery Story`,
    activeMenuName: `Winery Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/wineries/[id]/published`,
    pageName: `Published Winery Story`,
    activeMenuName: `Published Winery Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/wineries/[id]/published/[pid]`,
    pageName: `Published Winery Story`,
    activeMenuName: `Published Winery Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/wineries/[id]/create`,
    pageName: `Create Winery Story`,
    activeMenuName: `Create Winery Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/wineries/[id]/edit`,
    pageName: `Edit Winery Story`,
    activeMenuName: `Edit Winery Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/[id]/published`,
    pageName: `Published Story`,
    activeMenuName: `Published Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/[id]/published/[pid]`,
    pageName: `Published Story`,
    activeMenuName: `Published Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/favorite`,
    pageName: `Favorite Story`,
    activeMenuName: `Favorite Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/favorite/wines`,
    pageName: `Favorite Wine Story`,
    activeMenuName: `Favorite Wine Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/favorite/wines/[wineId]`,
    pageName: `Favorite Wine Story`,
    activeMenuName: `Favorite Wine Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/favorite/wineries`,
    pageName: `Favorite Winery Story`,
    activeMenuName: `Favorite Winery Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/story/favorite/wineries/[wineryId]`,
    pageName: `Favorite Winery Story`,
    activeMenuName: `Favorite Winery Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/location`,
    pageName: `Location`,
    activeMenuName: `Location`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/favorite`,
    pageName: `Favorite`,
    activeMenuName: `Favorite`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/favorite/wines`,
    pageName: `Favorite Wine`,
    activeMenuName: `Favorite Wine`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/favorite/wineries`,
    pageName: `Favorite Winery`,
    activeMenuName: `Favorite Winery`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/feed`,
    pageName: `Feed`,
    activeMenuName: `Feed`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/logout`,
    pageName: `Logout`,
    activeMenuName: `Logout`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/about`,
    pageName: `About`,
    activeMenuName: `About`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <AboutFooter />;
    },
  },
  {
    pathName: `/contact`,
    pageName: `Contact`,
    activeMenuName: `Contact`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <ContactFooter />;
    },
  },
  {
    pathName: `/cart`,
    pageName: `Cart`,
    activeMenuName: `Cart`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/price`,
    pageName: `Price`,
    activeMenuName: `Price`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <PriceFooter />;
    },
  },
  {
    pathName: `/wines`,
    pageName: `Wines`,
    activeMenuName: `Wines`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wines/[id]`,
    pageName: `Wine Id`,
    activeMenuName: `Wines`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wines/[id]/stories`,
    pageName: `Wine Story`,
    activeMenuName: `Wine Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wines/[id]/stories/[storyId]`,
    pageName: `Wine Story`,
    activeMenuName: `Wine Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wines/[id]/stories/[storyId]/chapters`,
    pageName: `Chapters`,
    activeMenuName: `Chapters`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wines/[id]/stories/[storyId]/chapters/[chapterId]`,
    pageName: `Chapter`,
    activeMenuName: `Chapter`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wines/[id]/story`,
    pageName: `Wine Story`,
    activeMenuName: `Wines`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wines/[id]/comment`,
    pageName: `Comment`,
    activeMenuName: `Comment`,
    header: () => {
      return <WinesIdCommentHeader />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wineries`,
    pageName: `Winery`,
    activeMenuName: `Winery`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wineries/[id]`,
    pageName: `Winery Id`,
    activeMenuName: `Winery`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wineries/[id]/comment`,
    pageName: `Winery Comment`,
    activeMenuName: `Winery Comment`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wineries/[id]/story`,
    pageName: `Winery Story`,
    activeMenuName: `Winery Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wineries/[id]/stories`,
    pageName: `Winery Story`,
    activeMenuName: `Winery Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wineries/[id]/stories/[storyId]`,
    pageName: `Winery Story`,
    activeMenuName: `Winery Story`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wineries/[id]/stories/[storyId]/chapters`,
    pageName: `Chapters`,
    activeMenuName: `Chapters`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
  {
    pathName: `/wineries/[id]/stories/[storyId]/chapters/[chapterId]`,
    pageName: `Chapter`,
    activeMenuName: `Chapter`,
    header: () => {
      return <Header />;
    },
    footer: () => {
      return <Footer />;
    },
  },
];

export {routes};
