import create from 'zustand';
import { Song } from '@prisma/client';

interface SongsState {
  activeSongs: Song[];
  activeSong: Song | null;
}

const useStore = create<SongsState>((set) => ({
  activeSongs: [],
  activeSong: null,
  changeActiveSongs: (songs: Song[]) => set((state) => ({ ...state, songs })),
  changeActiveSong: (song: Song) => set((state) => ({ ...state, song })),
}));

export default useStore;
