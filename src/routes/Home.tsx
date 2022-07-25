import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQueries } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { makeImagePath, makeLayoutId } from "../utils";

export const ITEMS_PER_ROW = 6;

export const Wrapper = styled.div`
  height: 200vh;
  padding-top: ${(props) => props.theme.headerHeight};
`;

export const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Banner = styled.div<{ bgimage: string }>`
  height: 70vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
  padding: 4rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgimage});
  background-size: cover;
  background-position: center center;
`;

export const Title = styled.h2`
  font-size: 4rem;
`;

export const Overview = styled.p`
  width: 50%;
  font-size: 1.5rem;
  text-overflow: ellipsis;
`;

export const Sliders = styled.div`
  display: flex;
  flex-direction: column;
  gap: 15rem;
  margin-top: 2rem;
`;
export const Slider = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  position: relative;

  &:last-child {
    margin-bottom: 20rem;
  }
`;

export const Category = styled.h2`
  font-size: 2rem;
  padding: 0 1rem;
  cursor: pointer;
`;

export const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${ITEMS_PER_ROW}, 1fr);
  gap: 0.3rem;
  position: absolute;
  top: 4rem;
`;

export const rowVariants = {
  initial: { x: window.innerWidth },
  animate: { x: 0 },
  exit: { x: -1 * window.innerWidth },
  transition: { type: "tween", duration: 1 },
};

export const Box = styled(motion.div)<{ bgimage: string }>`
  height: 10rem;
  background-image: url(${(props) => props.bgimage});
  background-size: cover;
  background-position: center center;
  cursor: pointer;

  &:last-child {
    transform-origin: right;
  }
  &:first-child {
    transform-origin: left;
  }
`;

export const boxVariants = {
  initial: { scale: 1 },
  whileHover: { scale: 1.3, y: -20, transition: { delay: 0.2, type: "tween" } },
};

export const Info = styled(motion.div)`
  padding: 1rem;
  background-color: ${(props) => props.theme.black.lighter};
  opacity: 0;
  position: absolute;
  bottom: 0;
  width: 100%;

  h4 {
    text-align: center;
    font-size: 1.1rem;
  }
`;

export const infoVariants = {
  whileHover: { opacity: 1, transition: boxVariants.whileHover.transition },
};

export const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

export const BigMovie = styled(motion.div)`
  position: absolute;
  width: 40vw;
  height: 70vh;
  left: 0;
  right: 0;
  margin: 0 auto;
  background-color: ${(props) => props.theme.black.lighter};
  border-radius: 1rem;
  overflow: hidden;
`;

export const BigCover = styled.div<{ bgimage: string }>`
  width: 100%;
  height: 80%;
  background-image: linear-gradient(to top, black, transparent), url(${(props) => props.bgimage});
  background-size: cover;
  background-position: center 20%;
`;

export const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 2.2rem;
  margin-top: -4rem;
  padding: 1rem;
`;

export const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 0.8rem;
  padding: 0 1rem;
`;

const Home = () => {
  const queryKeys: { [k: string]: string } = {
    now_playing: "Lastest Movies",
    popular: "Popular Movies",
    top_rated: "Top Rated Movies",
    upcoming: "Upcoming Movies",
  };
  const queries = useQueries(
    Object.keys(queryKeys).map((cat) => ({ queryKey: cat, queryFn: () => getMovies(cat) }))
  );
  // console.log(queries);

  const isLoading = queries.some((query) => query.isLoading);
  const queryResult = queries.map((query) => query.data as IGetMoviesResult);
  const latestData = queryResult[0];
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
    navigate(`/movies/${category}/${id}`);
  };
  const bigMovieMatch = useMatch("/movies/:category/:id");
  // console.log(bigMovieMatch);

  const { scrollY } = useViewportScroll();

  const clickedMovie =
    bigMovieMatch?.params.id &&
    queryResult
      .flatMap((data) => data.results)
      .find((movie) => movie.id === parseInt(bigMovieMatch.params.id!));
  // console.log(clickedMovie);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgimage={makeImagePath(latestData?.results[0].backdrop_path)}>
            <Title>{latestData?.results[0].title}</Title>
            <Overview>{latestData?.results[0].overview}</Overview>
          </Banner>
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
                            <h4>{movie.title}</h4>
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
                  onClick={() => navigate("/")}
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
                      <BigTitle>{clickedMovie.title}</BigTitle>
                      <BigOverview>{clickedMovie.overview}</BigOverview>
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

export default Home;
