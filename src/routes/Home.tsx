import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IGetMoviesResult } from "../api";
import { getThumbnail } from "../utils";

const Wrapper = styled.div`
  height: 200vh;
  padding-top: 5rem;
`;

const Loader = styled.div`
  height: 20vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Banner = styled.div<{ bgImage: string }>`
  height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
  padding: 4rem;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.5)),
    url(${(props) => props.bgImage});
  background-size: cover;
`;

const Title = styled.h2`
  font-size: 4rem;
`;

const Overview = styled.p`
  width: 50%;
  font-size: 1.5rem;
`;

const Home = () => {
  const { isLoading, data } = useQuery<IGetMoviesResult>("getMovies", getMovies);
  const [thumbnail, setThumbnail] = useState("");

  getThumbnail(data?.items[0].contentDetails.videoId).then(setThumbnail);

  return (
    <Wrapper>
      {isLoading ? (
        <Loader>Loading...</Loader>
      ) : (
        <>
          <Banner bgImage={thumbnail}>
            <Title>{data?.items[0].snippet.title}</Title>
            <Overview>{data?.items[0].snippet.description.slice(0, 140) + "..."}</Overview>
          </Banner>
        </>
      )}
    </Wrapper>
  );
};

export default Home;
