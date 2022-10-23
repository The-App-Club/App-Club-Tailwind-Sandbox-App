import dataUsers from '@/data/users.json';
import {useCallback} from 'react';

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
