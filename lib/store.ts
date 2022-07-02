import create from 'zustand';
import { Song, Artist } from '@prisma/client';

export interface SongState extends Song {
  artist: Partial<Artist>;
}

interface SongsState {
  activeSongs: SongState[];
  activeSong: SongState;
  changeActiveSongs: (songs: SongState[]) => void;
  changeActiveSong: (song: SongState) => void;
}

const useStore = create<SongsState>((set) => ({
  activeSongs: [],
  activeSong: undefined,
  changeActiveSongs: (activeSongs) => set((state) => ({ activeSongs })),
  changeActiveSong: (activeSong) => set((state) => ({ activeSong })),
}));

export default useStore;
