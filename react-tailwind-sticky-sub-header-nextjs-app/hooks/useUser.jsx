import {useCallback} from 'react';

import dataUsers from '@/data/users.json';

const useUser = () => {
  const getMatchedUser = useCallback(({userId}) => {
    return dataUsers.find((user) => {
      return user.userId === userId;
    });
  }, []);

  return {
    getMatchedUser,
  };
};

export default useUser;
