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

interface Info {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  is_new: boolean;
  is_active: boolean;
  type: string;
  tags: { id: string; name: string; coin_counter: number; ico_counter: number }[];
  team: { id: string; name: string; position: string }[];
  description: string;
  message: string;
  open_source: boolean;
  started_at: string;
  development_status: string;
  hardware_wallet: boolean;
  proof_type: string;
  org_structure: string;
  hash_algorithm: string;
  links: {
    explorer: string;
    facebook: string;
    reddit: string;
    source_code: string;
    website: string;
    youtube: string;
  };
  links_extended: { url: string; type: string }[];
  whitepaper: { link: string; thumbnail: string };
  first_data_at: string;
  last_data_at: string;
}

interface Price {
  id: string;
  name: string;
  symbol: string;
  rank: number;
  circulating_supply: number;
  total_supply: number;
  max_supply: number;
  beta_value: number;
  first_data_at: string;
  last_updated: string;
  quotes: {
    USD: {
      price: number;
      volume_24h: number;
      volume_24h_change_24h: number;
      market_cap: number;
      market_cap_change_24h: number;
      percent_change_15m: number;
      percent_change_30m: number;
      percent_change_1h: number;
      percent_change_6h: number;
      percent_change_12h: number;
      percent_change_24h: number;
      percent_change_7d: number;
      percent_change_30d: number;
      percent_change_1y: number;
      ath_price: number;
      ath_date: string;
      percent_from_price_ath: number;
    };
  };
}

const Coin = () => {
  // const { coinId } = useParams<Params>();
  const { coinId } = useParams();

  const location = useLocation() as Location;
  // console.log(location);

  const [isLoading, setIsLoading] = useState(true);
  const [info, setInfo] = useState<Info>();
  const [price, setPrice] = useState<Price>();

  useEffect(() => {
    fetch(`https://api.coinpaprika.com/v1/coins/${coinId}`)
      .then((response) => response.json())
      .then((infoData) => {
        setInfo(infoData);
        return fetch(`https://api.coinpaprika.com/v1/tickers/${coinId}`);
      })
      .then((response) => response.json())
      .then((priceData) => {
        setPrice(priceData);
        setIsLoading(false);
      });
  }, []);

  return (
    <Container>
      <Header>
        <Title>{location.state?.name || "Loading..."}</Title>
      </Header>
      {isLoading ? <Loader>Loading</Loader> : <h2>{info?.type}</h2>}
    </Container>
  );
};

export default Coin;

// function getTypes(obj) {
//   if (typeof obj === "object") {
//     if (Array.isArray(obj)) {
//       return getTypes(obj[0]) + "[]";
//     } else {
//       return JSON.stringify(
//         Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, getTypes(val)]))
//       )
//         .replace(/"(boolean|string|number)(\[\])?"/g, "$1")
//         .replace(/\\|"(?=\{)|(?<=(\}|\]))"/g, "");
//     }
//   } else {
//     return typeof obj;
//   }
// }
// getTypes(temp1);
