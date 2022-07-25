import { useState } from "react";
import { useLocation, useNavigate, useMatch } from "react-router-dom";
import { useQueries, useQuery } from "react-query";
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
import {
  getSearchResults,
  ISearchResult,
  getMovieDetails,
  IMovieDetails,
  getShowDetails,
  IShowDetails,
} from "../api";
import { makeImagePath, makeLayoutId } from "../utils";

const Search = () => {
  const location = useLocation();
  // console.log(location);
  const params = new URLSearchParams(location.search);
  const keyword = params.get("query");
  // console.log(keyword);

  const queryKeys = ["movie", "tv"];
  const categories = ["Movie Results", "Tv Shows Results"];

  const queries = useQueries(
    queryKeys.map((cat) => ({
      queryKey: ["search", cat],
      queryFn: () => getSearchResults(cat, keyword!),
    }))
  );
  // console.log(queries);

  const isLoading = queries.some((query) => query.isLoading);
  const queryResult = queries.map((query, i) => query.data as ISearchResult);
  const dataMap = Object.fromEntries(queryKeys.map((cat, i) => [cat, queryResult[i]]));

  const [page, setPage] = useState(Object.fromEntries(queryKeys.map((cat) => [cat, 0])));
  const [isSliding, setIsSliding] = useState(
    Object.fromEntries(queryKeys.map((cat) => [cat, false]))
  );
  const [direction, setDirection] = useState(Object.fromEntries(queryKeys.map((cat) => [cat, 1])));

  const toggleSliding = (category: string) =>
    setIsSliding((prev) => {
      const next = { ...prev };
      next[category] = !next[category];
      return next;
    });

  const navigate = useNavigate();
  const onBoxClick = (category: string, id: number) => {
    navigate(`/search/${category}/${id}?query=${keyword}`);
  };
  const bigMovieMatch = useMatch("/search/:category/:id");
  // console.log(bigMovieMatch);

  const { scrollY } = useViewportScroll();

  const { data: clickedMovie } = useQuery<IMovieDetails | IShowDetails | null>(
    [bigMovieMatch?.params.category, bigMovieMatch?.params.id],
    () =>
      bigMovieMatch?.params.category === "movie"
        ? getMovieDetails(bigMovieMatch?.params.id)
        : getShowDetails(bigMovieMatch?.params.id)
  );
  // console.log(clickedMovie);

  const slide = (category: string, data: ISearchResult, direction: "left" | "right") => {
    if (isSliding[category]) return;
    toggleSliding(category);

    let totalMovies = data.results.length;
    const maxPage = Math.ceil(totalMovies / ITEMS_PER_ROW);

    setPage((prev) => {
      const next = { ...prev };
      next[category] =
        direction === "left"
          ? (next[category] + maxPage - 1) % maxPage
          : (next[category] + 1) % maxPage;
      return next;
    });

    setDirection((prev) => {
      const next = { ...prev };
      next[category] = direction === "left" ? -1 : 1;
      return next;
    });
  };

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : queryResult.reduce((a, b) => a + b.results.length, 0) === 0 ? (
        "No Results"
      ) : (
        <>
          <Sliders>
            {Object.entries(dataMap).map(([cat, data], i) => (
              <Slider key={cat}>
                <Category>
                  {categories[i]}
                  <span onClick={() => slide(cat, data, "left")} style={{ cursor: "pointer" }}>
                    ◀
                  </span>
                  <span onClick={() => slide(cat, data, "right")} style={{ cursor: "pointer" }}>
                    ▶
                  </span>
                </Category>
                <AnimatePresence
                  onExitComplete={() => toggleSliding(cat)}
                  initial={false}
                  custom={direction[cat]}
                >
                  <Row
                    key={page[cat]}
                    variants={rowVariants}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    transition={rowVariants.transition}
                    custom={direction[cat]}
                  >
                    {data?.results
                      .slice(ITEMS_PER_ROW * page[cat], ITEMS_PER_ROW * (page[cat] + 1))
                      .map((movie) => (
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
                            <h4>{"title" in movie ? movie.title : movie.name}</h4>
                          </Info>
                        </Box>
                      ))}
                  </Row>
                </AnimatePresence>
              </Slider>
            ))}
          </Sliders>
          <AnimatePresence>
            {bigMovieMatch && (
              <>
                <Overlay
                  onClick={() => navigate(`/search?query=${keyword}`)}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  layoutId={makeLayoutId(bigMovieMatch.params.category!, bigMovieMatch.params.id!)}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover bgimage={makeImagePath(clickedMovie.poster_path, "w500")} />
                      <BigTitle>
                        {"title" in clickedMovie ? clickedMovie.title : clickedMovie.name}
                      </BigTitle>
                      <BigOverview>
                        {"release_date" in clickedMovie ? (
                          <>
                            <p>{clickedMovie.overview}</p>
                            <p>Release Date: {clickedMovie.release_date}</p>
                            <p>
                              Runtime:{" "}
                              {Math.floor(clickedMovie.runtime / 60)
                                .toString()
                                .padStart(2, "0")}{" "}
                              : {(clickedMovie.runtime % 60).toString().padStart(2, "0")}
                            </p>
                          </>
                        ) : (
                          <>
                            <p>{clickedMovie.overview}</p>
                            <p>First Air Date: {clickedMovie.first_air_date}</p>
                          </>
                        )}
                      </BigOverview>
                    </>
                  )}
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
