const API_KEY = process.env.REACT_APP_MOVIE_API_KEY;
const BASE_PATH = "https://api.themoviedb.org/3";

interface IMovie {
  adult: boolean;
  backdrop_path: string;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export interface IGetMoviesResult {
  dates?: { maximum: string; minimum: string };
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export const getMovies = (category: string) =>
  fetch(`${BASE_PATH}/movie/${category}?api_key=${API_KEY}`).then((r) => r.json());

interface IShow {
  backdrop_path: string | null;
  first_air_date?: string;
  genre_ids: (number | undefined)[];
  id: number;
  name: string;
  origin_country: (number | undefined)[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  vote_average: number;
  vote_count: number;
}

export interface IGetShowsResult {
  page: number;
  results: IShow[];
  total_pages: number;
  total_results: number;
}

export const getShows = (category: string) =>
  fetch(`${BASE_PATH}/tv/${category}?api_key=${API_KEY}`).then((r) => r.json());

export interface ISearchResult {
  page: number;
  results: (IMovie | IShow)[];
  total_pages: number;
  total_results: number;
}

export const getSearchResults = (category: string, query: string) =>
  fetch(`${BASE_PATH}/search/${category}?api_key=${API_KEY}&query=${query}`).then((r) => r.json());

export interface IMovieDetails {
  adult: boolean;
  backdrop_path: string;
  belongs_to_collection: { id: number; name: string; poster_path: string; backdrop_path: string };
  budget: number;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  imdb_id: string;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  release_date: string;
  revenue: number;
  runtime: number;
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}

export const getMovieDetails = (id: string | undefined) =>
  id ? fetch(`${BASE_PATH}/movie/${id}?api_key=${API_KEY}`).then((r) => r.json()) : null;

export interface IShowDetails {
  adult: boolean;
  backdrop_path: string | null;
  created_by: {
    id: number;
    credit_id: string;
    name: string;
    gender: number;
    profile_path: string | null;
  }[];
  episode_run_time: number[];
  first_air_date: string;
  genres: { id: number; name: string }[];
  homepage: string;
  id: number;
  in_production: boolean;
  languages: string[];
  last_air_date: string;
  last_episode_to_air?: {
    air_date: string | null;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  };
  name: string;
  next_episode_to_air?: {
    air_date: string | null;
    episode_number: number;
    id: number;
    name: string;
    overview: string;
    production_code: string;
    runtime: number;
    season_number: number;
    show_id: number;
    still_path: string | null;
    vote_average: number;
    vote_count: number;
  };
  networks: { id: number; name: string; logo_path: string; origin_country: string }[];
  number_of_episodes: number;
  number_of_seasons: number;
  origin_country: string[];
  original_language: string;
  original_name: string;
  overview: string;
  popularity: number;
  poster_path: string;
  production_companies: { id: number; logo_path: string; name: string; origin_country: string }[];
  production_countries: { iso_3166_1: string; name: string }[];
  seasons?: {
    air_date: string | null;
    episode_count: number;
    id: number;
    name: string;
    overview: string;
    poster_path: string | null;
    season_number: number;
  }[];
  spoken_languages: { english_name: string; iso_639_1: string; name: string }[];
  status: string;
  tagline: string;
  type: string;
  vote_average: number;
  vote_count: number;
}

export const getShowDetails = (id: string | undefined) =>
  id ? fetch(`${BASE_PATH}/tv/${id}?api_key=${API_KEY}`).then((r) => r.json()) : null;
