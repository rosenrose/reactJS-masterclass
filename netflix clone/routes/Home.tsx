import { AnimatePresence, motion, useViewportScroll } from "framer-motion";
import { useState } from "react";
import { useQueries, useQuery } from "react-query";
import { useMatch, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { getMovies, IGetMoviesResult, MAX_RESULTS } from "../api";
import { getThumbnail } from "../utils";

const ROW_COUNT = 3;
const ITEMS_PER_ROW = Math.floor(MAX_RESULTS / ROW_COUNT);

const Wrapper = styled.div`
  height: 200vh;
  padding-top: ${(props) => props.theme.headerHeight};
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgimage: string | undefined }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
  padding: 4rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgimage || ""});
  background-size: cover;
  background-position: center center;
`;

const Title = styled.h2`
  font-size: 4rem;
`;

const Overview = styled.p`
  width: 50%;
  font-size: 1.5rem;
  text-overflow: ellipsis;
`;

const Slider = styled.div`
  position: relative;
  top: -10rem;
`;

const Row = styled(motion.div)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(${ITEMS_PER_ROW}, 1fr);
  gap: 0.3rem;
  position: absolute;
`;

const rowVariants = {
  initial: { x: window.innerWidth },
  animate: { x: 0 },
  exit: { x: -1 * window.innerWidth },
  transition: { type: "tween", duration: 1 },
};

const Box = styled(motion.div)<{ bgimage: string | undefined }>`
  height: 10rem;
  background-image: url(${(props) => props.bgimage || ""});
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

const boxVariants = {
  initial: { scale: 1 },
  whileHover: { scale: 1.3, y: -20, transition: { delay: 0.2, type: "tween" } },
};

const Info = styled(motion.div)`
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

const infoVariants = {
  whileHover: { opacity: 1, transition: boxVariants.whileHover.transition },
};

const Overlay = styled(motion.div)`
  width: 100%;
  height: 100%;
  position: fixed;
  top: 0;
  background-color: rgba(0, 0, 0, 0.5);
  opacity: 0;
`;

const BigMovie = styled(motion.div)`
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

const BigCover = styled.div`
  width: 100%;
  height: 50%;
  background-size: cover;
  background-position: center center;
`;

const BigTitle = styled.h3`
  color: ${(props) => props.theme.white.lighter};
  font-size: 2.2rem;
  margin-top: -4rem;
  padding: 1rem;
`;

const BigOverview = styled.p`
  color: ${(props) => props.theme.white.lighter};
  font-size: 0.8rem;
  padding: 1rem;
`;

const Home = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>("getMovies", getMovies);
  const { data: thumbnail } = useQuery<string>("getThumbnail", () =>
    getThumbnail(data?.items[0].contentDetails.videoId)
  );

  const [page, setPage] = useState(0);
  const [isSliding, setIsSliding] = useState(false);
  const toggleSliding = () => setIsSliding((prev) => !prev);

  const queries = useQueries(
    (data?.items || []).slice(1).map((movie) => {
      const id = movie.contentDetails.videoId;
      return {
        queryKey: id,
        queryFn: () => getThumbnail(id).then((thumbnail) => [id, thumbnail]),
      };
    })
  );
  const thumbnails: { [key: string]: string } = Object.fromEntries(
    queries.map((query) => query.data || [])
  );

  const navigate = useNavigate();
  const onBoxClick = (id: string) => {
    navigate(`/movies/${id}`);
  };
  const bigMovieMatch = useMatch("/movies/:id");
  // console.log(bigMovieMatch);

  const { scrollY } = useViewportScroll();

  const clickedMovie =
    bigMovieMatch?.params.id &&
    data?.items.find((movie) => movie.contentDetails.videoId === bigMovieMatch.params.id);
  // console.log(clickedMovie);

  return (
    <Wrapper>
      {isLoading || !thumbnail ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner
            bgimage={thumbnail}
            onClick={() => {
              if (isSliding) return;
              toggleSliding();

              if (data) {
                const totalMovies = data.items.length - 1;
                const maxPage = Math.ceil(totalMovies / ITEMS_PER_ROW);
                setPage((prev) => (prev + 1) % maxPage);
              }
            }}
          >
            <Title>{data?.items[0].snippet.title}</Title>
            <Overview>{data?.items[0].snippet.description}</Overview>
          </Banner>
          <Slider>
            <AnimatePresence onExitComplete={toggleSliding} initial={false}>
              <Row key={page} {...rowVariants}>
                {data?.items
                  .slice(1)
                  .slice(ITEMS_PER_ROW * page, ITEMS_PER_ROW * (page + 1))
                  .map((movie) => (
                    <Box
                      key={movie.contentDetails.videoId}
                      bgimage={thumbnails[movie.contentDetails.videoId]}
                      variants={boxVariants}
                      initial="initial"
                      whileHover="whileHover"
                      transition={{ type: "tween" }}
                      onClick={() => onBoxClick(movie.contentDetails.videoId)}
                      layoutId={movie.contentDetails.videoId}
                    >
                      <Info variants={infoVariants}>
                        <h4>{movie.snippet.title}</h4>
                      </Info>
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
          <AnimatePresence>
            {bigMovieMatch && (
              <>
                <Overlay
                  onClick={() => navigate("/")}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                />
                <BigMovie layoutId={bigMovieMatch.params.id} style={{ top: scrollY.get() + 100 }}>
                  {clickedMovie && (
                    <>
                      <BigCover
                        style={{
                          backgroundImage: `linear-gradient(to top, black, transparent), url(${
                            thumbnails[clickedMovie.contentDetails.videoId]
                          })`,
                        }}
                      />
                      <BigTitle>{clickedMovie.snippet.title}</BigTitle>
                      <BigOverview>{clickedMovie.snippet.description}</BigOverview>
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
