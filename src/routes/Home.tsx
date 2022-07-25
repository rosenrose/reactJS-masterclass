import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQueries, useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult, getMovieDetails, IMovieDetails } from "../api";
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
  display: flex;
  gap: 0.5rem;
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
  initial: (direction: number) => ({ x: window.innerWidth * direction }),
  animate: { x: 0 },
  exit: (direction: number) => ({ x: -1 * window.innerWidth * direction }),
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
  height: 50%;
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
  padding: 0 1rem;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;

  p {
    line-height: 1.4;
  }
`;

const Home = () => {
  const queryKeys = ["now_playing", "popular", "top_rated", "upcoming"];
  const categories = ["Lastest Movies", "Popular Movies", "Top Rated Movies", "Upcoming Movies"];

  const queries = useQueries(
    queryKeys.map((cat) => ({ queryKey: ["movie", cat], queryFn: () => getMovies(cat) }))
  );
  // console.log(queries);
  const isLoading = queries.some((query) => query.isLoading);
  const queryResult = queries.map((query) => query.data as IGetMoviesResult);
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
    navigate(`/movies/${category}/${id}`);
  };
  const bigMovieMatch = useMatch("/movies/:category/:id");
  // console.log(bigMovieMatch);

  const { scrollY } = useViewportScroll();

  const { data: clickedMovie } = useQuery<IMovieDetails | null>(
    ["movie", bigMovieMatch?.params.id],
    () => getMovieDetails(bigMovieMatch?.params.id)
  );
  // console.log(clickedMovie);

  const slide = (category: string, data: IGetMoviesResult, direction: "left" | "right") => {
    if (isSliding[category]) return;
    toggleSliding(category);

    let totalMovies = data.results.length;
    if (category === "now_playing") {
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
          <Banner bgimage={makeImagePath(latestData?.results[0].backdrop_path)}>
            <Title>{latestData?.results[0].title}</Title>
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
                      .slice(cat === "now_playing" ? 1 : 0)
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
                      <BigOverview>
                        <p>{clickedMovie.overview}</p>
                        <p>Release Date: {clickedMovie.release_date}</p>
                        <p>
                          Runtime:{" "}
                          {Math.floor(clickedMovie.runtime / 60)
                            .toString()
                            .padStart(2, "0")}{" "}
                          : {(clickedMovie.runtime % 60).toString().padStart(2, "0")}
                        </p>
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

export default Home;
