import { useEffect, useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import styled from "styled-components";

const Container = styled.div`
  padding: 0 1.2rem;
  margin: 0 auto;
  max-width: 30rem;
`;

const Header = styled.header`
  height: 10vh;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const Title = styled.h1`
  color: ${(props) => props.theme.accentColor};
  font-size: 3rem;
`;

const Loader = styled.p`
  text-align: center;
`;

// interface Params {
//   coinId:string
// }
interface Location {
  state: {
    name: string;
  };
}

const Coin = () => {
  // const { coinId } = useParams<Params>();
  const { coinId } = useParams();

  const location = useLocation() as Location;
  // console.log(location);

  const [isLoading, setIsLoading] = useState(true);

  return (
    <Container>
      <Header>
        <Title>{location.state?.name || "Loading..."}</Title>
      </Header>
      {isLoading ? <Loader>Loading</Loader> : <h2>"</h2>}
    </Container>
  );
};

export default Coin;
