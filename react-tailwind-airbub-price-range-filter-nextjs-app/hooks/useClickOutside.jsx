import {useRef, useEffect, useCallback} from 'react';

const useClickOutside = (ref, callback) => {
  const handleClick = useCallback(
    (e) => {
      if (ref.current && !ref.current.contains(e.target)) {
        callback({event: e, message: 'clicked outside'});
      }
    },
    [ref, callback]
  );

  useEffect(() => {
    document.addEventListener('click', handleClick);
    return () => {
      document.removeEventListener('click', handleClick);
    };
  }, [handleClick]);
};

export {useClickOutside};
