import {useEffect, useState} from 'react';

const useKeyPress = ({expectedPressKey}) => {
  // https://usehooks.com/useKeyPress/
  const [keyPressed, setKeyPressed] = useState(false);

  const downHandler = ({key}) => {
    if (key === expectedPressKey) {
      setKeyPressed(true);
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
  return keyPressed;
};

export {useKeyPress};
