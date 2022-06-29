import { Playlist, Artist, User } from '@prisma/client';
import useSWR from 'swr';
import fetcher from './fetcher';

const useMe = () => {
  const { data, error } = useSWR<
    Omit<User, 'password'> & { playlistsCount: number },
    Error
  >('/me', fetcher);

  return {
    user: data,
    isLoading: !data && !error,
    isError: error,
  };
};

const usePlaylist = () => {
  const { data, error } = useSWR<Playlist[], Error>('/playlist', fetcher);

  return {
    playlists: data ?? [],
    isLoading: !data && !error,
    isError: error,
  };
};

export { useMe, usePlaylist };
