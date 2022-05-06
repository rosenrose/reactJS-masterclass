import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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

const CoinsList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const Coin = styled.li`
  background-color: white;
  color: ${(props) => props.theme.bgColor};
  border-radius: 1rem;

  a {
    padding: 1rem;
    display: block;
    transition: color 0.2s ease-in;

    &:hover {
      color: ${(props) => props.theme.accentColor};
    }
  }
`;

const Loader = styled.p`
  text-align: center;
`;

interface CoinInterface {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
}

const Coins = () => {
  const [coins, setCoins] = useState<CoinInterface[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetch("https://api.coinpaprika.com/v1/coins")
      .then((response) => response.json())
      .then((json) => {
        setCoins(json.slice(0, 50));
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      <Header>
        <Title>Coins</Title>
      </Header>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <CoinsList>
          {coins.map((coin) => (
            <Coin key={coin.id}>
              <Link to={`/${coin.id}`}>{coin.name} &rarr;</Link>
            </Coin>
          ))}
        </CoinsList>
      )}
    </Container>
  );
};

export default Coins;
