import { PayloadAction, createSlice } from "@reduxjs/toolkit";

interface Song {
  id: string;
  title: string;
}
interface songState {
  songs: Song[];
  loading: boolean;
  error: string | null;
}

const initialState: songState = {
  songs: [],
  loading: false,
  error: null,
};

const songSlice = createSlice({
  name: "song",
  initialState,
  reducers: {
    createSongRequest(state) {
      state.loading = true;
      state.error = null;
    },
    createSongSuccess: (state, action: PayloadAction<Song>) => {
      state.loading = false;
      state.songs.push(action.payload);
    },
    createSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    fetchSongsRequest(state) {
      state.loading = true;
      state.error = null;
    },
    fetchSongsSuccess: (state, action: PayloadAction<Song[]>) => {
      state.loading = false;
      state.songs = action.payload;
    },
    fetchSongsFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    updateSongRequest(
      state,
      _action: PayloadAction<{ id: string; updatedSong: any }>
    ) {
      state.loading = true;
      state.error = null;
    },
    // updateSongSuccess: (state, action: PayloadAction<Song>) => {
    //   state.loading = false;
    //   const updatedSong = action.payload;
    //   const index = state.songs.findIndex((song) => song.id === updatedSong.id);
    //   if (index !== -1) {
    //     state.songs = [
    //       ...state.songs.slice(0, index),
    //       updatedSong,
    //       ...state.songs.slice(index + 1),
    //     ];
    //   }
    // },
    updateSongSuccess(state, action: PayloadAction<Song>) {
      state.loading = false;

      const updatedSong = action.payload;
      state.songs = state.songs.map((song) =>
        song.id === updatedSong.id ? updatedSong : song
      );
      console.log(updatedSong, "updatedSongsjcvdn");

      // const index = state.songs.findIndex((song) => song.id === updatedSong.id);
      // if (index !== -1) {
      //   state.songs[index] = updatedSong;
      // }
    },
    updateSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
    deleteSongRequest(state) {
      state.loading = true;
      state.error = null;
    },
    deleteSongSuccess: (state, action: PayloadAction<string>) => {
      const id = action.payload;
      state.songs = state.songs.filter((song) => song.id !== id);
      state.loading = false;
    },
    deleteSongFailure: (state, action: PayloadAction<string>) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const {
  createSongRequest,
  createSongSuccess,
  createSongFailure,
  fetchSongsRequest,
  fetchSongsSuccess,
  fetchSongsFailure,
  updateSongRequest,
  updateSongSuccess,
  updateSongFailure,
  deleteSongRequest,
  deleteSongSuccess,
  deleteSongFailure,
} = songSlice.actions;

export default songSlice.reducer;
