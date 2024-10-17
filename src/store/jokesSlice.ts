import {createSlice, createAsyncThunk, PayloadAction} from '@reduxjs/toolkit';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {Joke, JokesState} from '$src/types/jokes';

const initialState: JokesState = {
  currentJoke: null,
  favoriteJokes: [],
  loading: false,
  error: null,
};

export const fetchRandomJoke = createAsyncThunk<Joke>(
  'jokes/fetchRandom',
  async () => {
    const response = await fetch('https://v2.jokeapi.dev/joke/Programming');
    const data = await response.json();
    return data as Joke;
  },
);

export const loadFavoriteJokes = createAsyncThunk<Joke[]>(
  'jokes/loadFavorites',
  async () => {
    const jokesJson = await AsyncStorage.getItem('favoriteJokes');
    return jokesJson ? JSON.parse(jokesJson) : [];
  },
);

const jokesSlice = createSlice({
  name: 'jokes',
  initialState,
  reducers: {
    toggleFavorite: (state, action: PayloadAction<Joke>) => {
      const index = state.favoriteJokes.findIndex(
        joke => joke.id === action.payload.id,
      );
      if (index !== -1) {
        state.favoriteJokes.splice(index, 1);
      } else {
        state.favoriteJokes.push(action.payload);
      }
      AsyncStorage.setItem(
        'favoriteJokes',
        JSON.stringify(state.favoriteJokes),
      );
    },
  },
  extraReducers: builder => {
    builder
      .addCase(fetchRandomJoke.pending, state => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchRandomJoke.fulfilled, (state, action) => {
        state.loading = false;
        state.currentJoke = action.payload;
      })
      .addCase(fetchRandomJoke.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch joke';
      })
      .addCase(loadFavoriteJokes.fulfilled, (state, action) => {
        state.favoriteJokes = action.payload;
      });
  },
});

export const {toggleFavorite} = jokesSlice.actions;
export default jokesSlice.reducer;
