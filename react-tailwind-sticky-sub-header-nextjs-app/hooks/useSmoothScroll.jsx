import {gsap} from 'gsap';
import {ScrollToPlugin} from 'gsap/dist/ScrollToPlugin';
import {useRouter} from 'next/router';
import {useEffect} from 'react';


gsap.registerPlugin(ScrollToPlugin);

const setSmoothScroll = (isSmooth) => {
  document.documentElement.style.scrollBehavior = isSmooth ? 'smooth' : 'auto';
};

const useSmoothScroll = () => {
  // https://zenn.dev/tera_ny/articles/94c98f1dac31de
  // https://github.com/vercel/next.js/issues/5136#issuecomment-992491480
  // https://dev.to/alejomartinez8/how-to-load-a-hash-fragment-to-an-anchor-name-in-react-especially-in-first-loading-g3i
  const router = useRouter();

  useEffect(() => {
    setSmoothScroll(true);

    const handleStart = () => {
      setSmoothScroll(false);
    };
    const handleStop = () => {
      setSmoothScroll(true);
    };
    router.events.on('routeChangeStart', handleStart);
    router.events.on('routeChangeComplete', handleStop);
    router.events.on('routeChangeError', handleStop);

    return () => {
      router.events.off('routeChangeStart', handleStart);
      router.events.off('routeChangeComplete', handleStop);
      router.events.off('routeChangeError', handleStop);
    };
  }, [router]);
};

export {useSmoothScroll};
