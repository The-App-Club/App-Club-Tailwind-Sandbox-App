import NiceFileUploader from '@/components/NiceFileUploader';
import {Box} from '@chakra-ui/react';

import {gql, useQuery} from '@apollo/client';

const GET_USERS = gql`
  query GetUsers {
    users {
      id
      name
      email
    }
  }
`;

export default function Home() {
  const {data, loading, error} = useQuery(GET_USERS);

  if (loading) return <p>ローディング中です</p>;
  if (error) return <p>エラーが発生しています</p>;

  const {users} = data;

  return (
    <Box className="max-w-[30rem] mx-auto w-full overflow-hidden p-2">
      <NiceFileUploader />
      <Box>
        <h1>ユーザ情報</h1>
        {users.map((user: {id: number; name: string; email: string}) => (
          <div key={user.id}>Name: {user.name}</div>
        ))}
      </Box>
    </Box>
  );
}
