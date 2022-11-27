import {Event} from '@/domains/Event';

export const getEvents = async (limit: number): Promise<Event[]> => {
  const response = await fetch('/api/events');
  const json = await response.json();
  return json;
};

const useEvents = () => {
  return {
    getEvents,
  };
};

export default useEvents;
