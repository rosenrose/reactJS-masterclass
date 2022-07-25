import { useState } from "react";
import { useLocation, useNavigate, useMatch } from "react-router-dom";
import { useQueries } from "react-query";
import { AnimatePresence, useViewportScroll } from "framer-motion";
import {
  ITEMS_PER_ROW,
  Wrapper,
  Loader,
  Sliders,
  Slider,
  Category,
  Row,
  rowVariants,
  Box,
  boxVariants,
  Info,
  infoVariants,
  Overlay,
  BigMovie,
  BigCover,
  BigTitle,
  BigOverview,
} from "./Home";
import { getSearchResults, ISearchMovieResult, ISearchTvResult } from "../api";
import { makeImagePath, makeLayoutId } from "../utils";

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
  const queryResult = queries.map((query, i) => query.data as ISearchMovieResult | ISearchTvResult);
  const dataMap = Object.fromEntries(Object.keys(queryKeys).map((cat, i) => [cat, queryResult[i]]));

  const pageMap = Object.fromEntries(Object.keys(queryKeys).map((cat) => [cat, 0]));
  const [page, setPage] = useState(pageMap);

  const slidingMap = Object.fromEntries(Object.keys(queryKeys).map((cat) => [cat, false]));
  const [isSliding, setIsSliding] = useState(slidingMap);

  const toggleSliding = (category: string) =>
    setIsSliding((prev) => {
      const next = { ...prev };
      next[category] = !next[category];
      return next;
    });

  const navigate = useNavigate();
  const onBoxClick = (category: string, id: number) => {
    navigate(`/search/${category}/${id}`);
  };
  const bigMovieMatch = useMatch("/search/:category/:id");
  // console.log(bigMovieMatch);

  const { scrollY } = useViewportScroll();

  // const clickedMovie =
  //   bigMovieMatch?.params.id &&
  //   queryResult
  //     .flatMap((data) => data.results)
  //     .find((movie) => movie.id === parseInt(bigMovieMatch.params.id!));
  // console.log(clickedMovie);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : queryResult.reduce((a, b) => a + b.results.length, 0) === 0 ? (
        "No Results"
      ) : (
        <>
          <Sliders>
            {Object.entries(dataMap).map(([cat, data]) => (
              <Slider key={cat}>
                <Category
                  onClick={() => {
                    if (isSliding[cat]) return;
                    toggleSliding(cat);

                    if (data) {
                      let totalMovies = data.results.length;
                      if (cat === "now_playing") {
                        totalMovies -= 1;
                      }
                      const maxPage = Math.ceil(totalMovies / ITEMS_PER_ROW);

                      setPage((prev) => {
                        const next = { ...prev };
                        next[cat] = (next[cat] + 1) % maxPage;
                        return next;
                      });
                    }
                  }}
                >
                  {queryKeys[cat]} ▶
                </Category>
                <AnimatePresence onExitComplete={() => toggleSliding(cat)} initial={false}>
                  <Row key={page[cat]} {...rowVariants}>
                    {data?.results
                      .slice(1)
                      .slice(ITEMS_PER_ROW * page[cat], ITEMS_PER_ROW * (page[cat] + 1))
                      .map((movie) => {
                        // console.log(data instanceof ISearchMovieResult);
                        return (
                          <Box
                            key={movie.id}
                            bgimage={makeImagePath(movie.poster_path, "w500")}
                            variants={boxVariants}
                            initial="initial"
                            whileHover="whileHover"
                            transition={{ type: "tween" }}
                            onClick={() => onBoxClick(cat, movie.id)}
                            layoutId={makeLayoutId(cat, movie.id)}
                          >
                            <Info variants={infoVariants}>
                              <h4>{"a"}</h4>
                            </Info>
                          </Box>
                        );
                      })}
                  </Row>
                </AnimatePresence>
              </Slider>
            ))}
          </Sliders>
          <AnimatePresence>
            {bigMovieMatch && (
              <>
                <Overlay
                  onClick={() => navigate("/")}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  layoutId={makeLayoutId(bigMovieMatch.params.category!, bigMovieMatch.params.id!)}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {/* {clickedMovie && (
                    <>
                      <BigCover bgimage={makeImagePath(clickedMovie.poster_path, "w500")} />
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
                    </>
                  )} */}
                </BigMovie>
              </>
            )}
          </AnimatePresence>
        </>
      )}
    </Wrapper>
  );
};

export default Search;
