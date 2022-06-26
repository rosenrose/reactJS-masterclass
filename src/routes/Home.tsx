import { AnimatePresence, motion } from "framer-motion";
import { useState } from "react";
import { useQueries, useQuery } from "react-query";
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

const Box = styled(motion.div)<{ bgimage: string | undefined }>`
  height: 10rem;
  background-image: url(${(props) => props.bgimage || ""});
  background-size: cover;
  background-position: center center;
`;

const rowVariants = {
  initial: { x: window.innerWidth },
  animate: { x: 0 },
  exit: { x: -1 * window.innerWidth },
  transition: { type: "tween", duration: 1 },
};

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

  return (
    <Wrapper>
      {isLoading ? (
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
                    >
                      {movie.snippet.title}
                    </Box>
                  ))}
              </Row>
            </AnimatePresence>
          </Slider>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
