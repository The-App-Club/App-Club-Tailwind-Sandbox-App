/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';
import {queryClient} from '@/libs/queryClient';
import Typography from '@mui/joy/Typography';
import {dehydrate} from '@tanstack/query-core';
import {useQuery} from '@tanstack/react-query';
import {getEvents} from '@/hooks/useEvents';
import {Event} from '@/domains/Event';
import {NextPage} from 'next';
import Warning from '@/components/Warning';
import Loading from '@/components/Loading';
import NotFound from '@/components/NotFound';

const Event: NextPage = () => {
  const {data, error} = useQuery<Event[], Error>(
    [],
    () => getEvents(EVENT_LIMIT),
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
              <span>{item.name}</span>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const EVENT_KEY = 'events';
const EVENT_LIMIT = 10;

export async function getStaticProps() {
  await queryClient.prefetchQuery([EVENT_KEY, EVENT_LIMIT], ({queryKey}) => {
    const [keyName, limit] = queryKey;
    return getEvents(Number(limit));
  });
  return {
    props: {
      dehydratedState: dehydrate(queryClient),
    },
  };
}

export default Event;
