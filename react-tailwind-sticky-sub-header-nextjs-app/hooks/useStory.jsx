import {distinct, sliceHead, tidy} from '@tidyjs/tidy';

import useUser from '@/hooks/useUser';

const useStory = () => {
  const {getMatchedUser} = useUser();

  const getWriteUpUsers = ({stories}) => {
    return {
      writeUpUsers: tidy(
        stories.map((story) => {
          return getMatchedUser({userId: story.userId});
        }),
        distinct(['userId']),
        sliceHead(4)
      ),
    };
  };

  return {
    getWriteUpUsers,
  };
};

export default useStory;
