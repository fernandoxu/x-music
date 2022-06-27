import useSWR from 'swr';
import fetcher from './fetcher';

const useMe = () => {
  const { data, error } = useSWR('/me', fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

const usePlaylist = () => {
  const { data, error } = useSWR('/playlist', fetcher);

  return {
    playlist: data ?? [],
    isLoading: !data && !error,
    isError: error,
  };
};

export { useMe };
