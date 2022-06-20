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

export const getMovies = () =>
  fetch(
    `https://www.googleapis.com/youtube/v3/playlistItems?playlistId=UUyWiQldYO_-yeLJC0j5oq2g&key=${API_KEY}&part=snippet,contentDetails&maxResults=20`
  ).then((r) => r.json());
