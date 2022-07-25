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

export interface ISearchMovieResult {
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}

export interface ISearchTvResult {
  page: number;
  results: IShow[];
  total_pages: number;
  total_results: number;
}

export const getSearchResults = (category: string, query: string) =>
  fetch(`${BASE_PATH}/search/${category}?api_key=${API_KEY}&query=${query}`).then((r) => r.json());
