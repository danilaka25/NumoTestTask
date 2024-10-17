export interface JokeFlags {
  nsfw: boolean;
  religious: boolean;
  political: boolean;
  racist: boolean;
  sexist: boolean;
  explicit: boolean;
}

export interface Joke {
  error: boolean;
  category: string;
  type: 'single' | 'twopart';
  joke?: string;
  setup?: string;
  delivery?: string;
  flags: JokeFlags;
  safe: boolean;
  id: number;
  lang: string;
}

export interface JokesState {
  currentJoke: Joke | null;
  favoriteJokes: Joke[];
  loading: boolean;
  error: string | null;
}
