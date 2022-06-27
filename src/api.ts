const API_KEY = process.env.REACT_APP_API_KEY;

export interface IGetMoviesResult {
  kind: string;
  etag: string;
  nextPageToken: string;
  items: {
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: { url: string; width: number; height: number };
        medium?: { url: string; width: number; height: number };
        high?: { url: string; width: number; height: number };
        standard?: { url: string; width: number; height: number };
        maxres?: { url: string; width: number; height: number };
      };
      channelTitle: string;
      playlistId: string;
      position: number;
      resourceId: { kind: string; videoId: string };
      videoOwnerChannelTitle: string;
      videoOwnerChannelId: string;
    };
    contentDetails: { videoId: string; videoPublishedAt: string };
  }[];
  pageInfo: { totalResults: number; resultsPerPage: number };
}

export const MAX_RESULTS = 20;

export const getMovies = () =>
  fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUyWiQldYO_-yeLJC0j5oq2g&key=${API_KEY}&part=snippet,contentDetails&maxResults=${MAX_RESULTS}`
  ).then((r) => r.json());

interface IGetMovieResult {
  kind: string;
  etag: string;
  items: {
    kind: string;
    etag: string;
    id: string;
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: { url: string; width: number; height: number };
        medium?: { url: string; width: number; height: number };
        high?: { url: string; width: number; height: number };
        standard?: { url: string; width: number; height: number };
        maxres?: { url: string; width: number; height: number };
      };
      channelTitle: string;
      categoryId: string;
      liveBroadcastContent: string;
      localized: { title: string; description: string };
      defaultAudioLanguage: string;
    };
    contentDetails: {
      duration: string;
      dimension: string;
      definition: string;
      caption: string;
      licensedContent: boolean;
      contentRating: {};
      projection: string;
    };
  }[];
  pageInfo: { totalResults: number; resultsPerPage: number };
}
// fetch(`https://www.googleapis.com/youtube/v3/videos?id=${id}&key=${API_KEY}&part=snippet,contentDetails`)

interface ISearchResult {
  kind: string;
  etag: string;
  nextPageToken: string;
  regionCode: string;
  pageInfo: { totalResults: number; resultsPerPage: number };
  items: {
    kind: string;
    etag: string;
    id: { kind: string; channelId?: string; videoId?: string; playlistId?: string };
    snippet: {
      publishedAt: string;
      channelId: string;
      title: string;
      description: string;
      thumbnails: {
        default: { url: string; width: number; height: number };
        medium?: { url: string; width: number; height: number };
        high?: { url: string; width: number; height: number };
        standard?: { url: string; width: number; height: number };
        maxres?: { url: string; width: number; height: number };
      };
      channelTitle: string;
      liveBroadcastContent: string;
      publishTime: string;
    };
  }[];
}
// fetch(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&part=snippet,id&q=${query}&maxResults=20`)
