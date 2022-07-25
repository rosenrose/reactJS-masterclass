import noImage from "./noimage.png";

export function makeImagePath(id: string | null, format?: string) {
  return id ? `https://image.tmdb.org/t/p/${format ?? "original"}/${id}` : noImage;
}

export const makeLayoutId = (category: string, id: number | string) => `${category}_${id}`;
