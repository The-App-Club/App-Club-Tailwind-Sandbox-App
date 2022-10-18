import { css, cx } from '@emotion/css';

import { useRive } from '@rive-app/react-canvas';
import { useState } from 'react';

import logo from '../../assets/logo.png';
import { MarkedDescription1 } from '../../components/MarkedDescription1';
import { MarkedDescription2 } from '../../components/MarkedDescription2';
import { MarkedDescription3 } from '../../components/MarkedDescription3';
import { ScrollTriggerProvider } from '../../components/ScrollTriggerProvider';
import { Layout } from '../../layouts/default';

const HomePage = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [animationText, setAnimationText] = useState('');
  const { rive, RiveComponent: RiveComponentPlayback } = useRive({
    src: 'https://cdn.rive.app/animations/vehicles.riv',
    autoplay: false,
    onPause: () => {
      setAnimationText('Animation paused!');
    },
    onPlay: () => {
      setAnimationText('Animation is playing..');
    },
  });

  const togglePlaying = () => {
    if (isPlaying) {
      rive.pause();
      setIsPlaying(false);
    } else {
      rive.play();
      setIsPlaying(true);
    }
  };

  return (
    <div className="flex justify-center flex-col max-w-md m-auto">
      <RiveComponentPlayback className="min-h-[20rem] w-full" />
      <p>{animationText}</p>
      <button
        className="px-6 py-2 bg-blue-500 hover:bg-blue-700 rounded-lg text-white"
        onClick={togglePlaying}
      >
        {isPlaying ? 'Pause' : 'Play'}
      </button>
    </div>
  );

  // const { rive, RiveComponent } = useRive({
  //   src: 'https://cdn.rive.app/animations/vehicles.riv',
  //   autoplay: false,
  // });

  // return (
  //   <Layout>
  //     <RiveComponent
  //       className="min-h-[20rem] w-full"
  //       onMouseEnter={() => rive && rive.play()}
  //       onMouseLeave={() => rive && rive.pause()}
  //     />
  //   </Layout>
  // );
};

export { HomePage };
