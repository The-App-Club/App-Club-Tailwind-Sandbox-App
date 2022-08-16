import {useEffect, useState} from 'react';

const useKeyPress = ({expectedPressKey}) => {
  // https://usehooks.com/useKeyPress/
  const [keyPressed, setKeyPressed] = useState(false);
  const [tik, setTik] = useState(new Date());

  const downHandler = ({key}) => {
    if (key === expectedPressKey) {
      setKeyPressed(true);
      setTik(new Date());
    }
  };
  const upHandler = ({key}) => {
    if (key === expectedPressKey) {
      setKeyPressed(false);
    }
  };
  useEffect(() => {
    window.addEventListener('keydown', downHandler);
    window.addEventListener('keyup', upHandler);
    return () => {
      window.removeEventListener('keydown', downHandler);
      window.removeEventListener('keyup', upHandler);
    };
  }, []);
  return {keyPressed, tik};
};

export {useKeyPress};
