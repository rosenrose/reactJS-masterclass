import { useLocation } from "react-router-dom";

const Search = () => {
  const location = useLocation();
  // console.log(location);
  const params = new URLSearchParams(location.search);
  const keyword = params.get("query");

  return <>Search</>;
};

export default Search;
