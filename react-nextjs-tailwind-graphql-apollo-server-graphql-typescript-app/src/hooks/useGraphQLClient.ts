import {useRecoilValue, useSetRecoilState} from 'recoil';

import {graphQLClientState} from '@/stores/graphQLClientStore';

const useGraphQLClient = () => {
  const setGraphQLClient = useSetRecoilState(graphQLClientState);

  const graphQLClient = useRecoilValue(graphQLClientState);

  return {
    setGraphQLClient,
    graphQLClient,
  };
};

export default useGraphQLClient;
