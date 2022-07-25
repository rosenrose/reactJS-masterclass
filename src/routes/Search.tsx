import { useLocation } from "react-router-dom";
import { useQueries } from "react-query";
import { getSearchResults, IGetMoviesResult, IGetShowsResult } from "../api";

const Search = () => {
  const location = useLocation();
  // console.log(location);
  const params = new URLSearchParams(location.search);
  const keyword = params.get("query");

  const queryKeys: { [k: string]: string } = {
    movie: "Movie Results",
    tv: "Tv Shows Results",
  };
  const queries = useQueries(
    Object.keys(queryKeys).map((cat) => ({
      queryKey: `search_${cat}`,
      queryFn: () => getSearchResults(cat, keyword!),
    }))
  );
  // console.log(queries);

  const isLoading = queries.some((query) => query.isLoading);
  const queryResult = queries.map((query) => query.data as IGetMoviesResult | IGetShowsResult);
  console.log(queryResult);

  return <>Search</>;
};

export default Search;
