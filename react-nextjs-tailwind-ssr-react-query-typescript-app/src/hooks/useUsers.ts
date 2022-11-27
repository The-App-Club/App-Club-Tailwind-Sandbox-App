import {User} from '@/domains/User';

export const getUsers = async (limit: number): Promise<User[]> => {
  const response = await fetch(`http://localhost:3000/api/users`);
  const json = await response.json();
  return json;
};

const useUsers = () => {
  return {
    getUsers,
  };
};

export default useUsers;
