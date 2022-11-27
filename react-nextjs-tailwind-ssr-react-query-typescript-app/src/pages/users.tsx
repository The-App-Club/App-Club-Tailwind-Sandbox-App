/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {User} from '@/domains/User';
import {getUsers} from '@/hooks/useUsers';
import {queryClient} from '@/libs/queryClient';
import Typography from '@mui/joy/Typography';
import {dehydrate} from '@tanstack/query-core';
import {useQuery} from '@tanstack/react-query';
import {NextPage} from 'next';
import Loading from '@/components/Loading';
import Warning from '@/components/Warning';
import NotFound from '@/components/NotFound';

const User: NextPage = () => {
  const {data, error} = useQuery<User[], Error>(
    [],
    () => getUsers(USER_LIMIT),
    {
      staleTime: Infinity,
    }
  );

  if (error) {
    return <Warning width={40} height={40} />;
  }

  if (!data) {
    return <Loading width={40} height={40} />;
  }

  if (data.length === 0) {
    return <NotFound width={40} height={40} />;
  }

  return (
    <section>
      <Typography>Hello</Typography>
      <ul>
        {data.map((item, index) => {
          return (
            <li
              key={index}
              css={css`
                display: flex;
                align-items: center;
                gap: 0.5rem;
              `}
            >
              <span>{item.id}</span>
              <span>{item.email}</span>
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const USER_KEY = 'users';
const USER_LIMIT = 10;

export async function getStaticProps() {
  await queryClient.prefetchQuery([USER_KEY, USER_LIMIT], ({queryKey}) => {
    const [keyName, limit] = queryKey;
    return getUsers(Number(limit));
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default User;
