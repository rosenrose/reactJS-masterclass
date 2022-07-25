import { AnimatePresence, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQueries, useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import { getShows, IGetShowsResult, getShowDetails, IShowDetails } from "../api";
import { makeImagePath, makeLayoutId } from "../utils";
import {
  ITEMS_PER_ROW,
  Wrapper,
  Loader,
  Banner,
  Title,
  Overview,
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

const Tv = () => {
  const queryKeys = ["on_the_air", "airing_today", "popular", "top_rated"];
  const categories = ["Lastest Shows", "Airing Today", "Popular Shows", "Top Rated Shows"];

  const queries = useQueries(
    queryKeys.map((cat) => ({ queryKey: ["tv", cat], queryFn: () => getShows(cat) }))
  );
  // console.log(queries);

  const isLoading = queries.some((query) => query.isLoading);
  const queryResult = queries.map((query) => query.data as IGetShowsResult);
  const latestData = queryResult[0];
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
    navigate(`/tv/${category}/${id}`);
  };
  const bigMovieMatch = useMatch("/tv/:category/:id");
  // console.log(bigMovieMatch);

  const { scrollY } = useViewportScroll();

  const { data: clickedMovie } = useQuery<IShowDetails | null>(
    ["tv", bigMovieMatch?.params.id],
    () => getShowDetails(bigMovieMatch?.params.id)
  );
  // console.log(clickedMovie);

  const slide = (category: string, data: IGetShowsResult, direction: "left" | "right") => {
    if (isSliding[category]) return;
    toggleSliding(category);

    let totalMovies = data.results.length;
    if (category === "on_the_air") {
      totalMovies -= 1;
    }
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
      ) : (
        <>
          <Banner bgimage={makeImagePath(latestData?.results[0].backdrop_path ?? "")}>
            <Title>{latestData?.results[0].name}</Title>
            <Overview>{latestData?.results[0].overview}</Overview>
          </Banner>
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
                      .slice(cat === "on_the_air" ? 1 : 0)
                      .slice(ITEMS_PER_ROW * page[cat], ITEMS_PER_ROW * (page[cat] + 1))
                      .map((movie) => (
                        <Box
                          key={movie.id}
                          bgimage={makeImagePath(movie.poster_path!, "w500")}
                          variants={boxVariants}
                          initial="initial"
                          whileHover="whileHover"
                          transition={{ type: "tween" }}
                          onClick={() => onBoxClick(cat, movie.id)}
                          layoutId={makeLayoutId(cat, movie.id)}
                        >
                          <Info variants={infoVariants}>
                            <h4>{movie.name}</h4>
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
                  onClick={() => navigate("/tv")}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie
                  layoutId={makeLayoutId(bigMovieMatch.params.category!, bigMovieMatch.params.id!)}
                  style={{ top: scrollY.get() + 100 }}
                >
                  {clickedMovie && (
                    <>
                      <BigCover bgimage={makeImagePath(clickedMovie.poster_path!, "w500")} />
                      <BigTitle>{clickedMovie.name}</BigTitle>
                      <BigOverview>
                        <p>{clickedMovie.overview}</p>
                        <p>First Air Date: {clickedMovie.first_air_date}</p>
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

export default Tv;
