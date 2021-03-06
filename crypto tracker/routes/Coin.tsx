import { useQuery } from "react-query";
import { useLocation, useParams, Routes, Route, Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { Helmet } from "react-helmet";
import { fetchCoinInfo, fetchCoinPrice } from "../api";
import Price from "./Price";
import Chart from "./Chart";
import Info from "./Info";

const Container = styled.div`
  padding: 0 1.2rem;
  margin: 0 auto;
  max-width: 40rem;
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

const Overview = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: rgba(0, 0, 0, 0.5);
  padding: 1rem 1.2rem;
  border-radius: 1rem;
`;

const OverviewItem = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;

  span:first-child {
    font-size: 0.8rem;
    font-weight: 400;
    text-transform: uppercase;
    margin-bottom: 0.3rem;
  }
`;

const Description = styled.p`
  margin: 1.2rem 0;
`;

const Tabs = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  margin: 1.5rem 0;
  gap: 1rem;
`;

const Tab = styled.span<{ isActive: boolean }>`
  padding: 0.5rem 0;
  border-radius: 1rem;
  text-align: center;
  text-transform: uppercase;
  font-size: 0.8rem;
  font-weight: 400;
  background-color: rgba(0, 0, 0, 0.5);
  color: ${(props) => props.theme[props.isActive ? "accentColor" : "textColor"]};

  a {
    display: block;
  }
`;

const HomeBtn = styled.button`
  margin: 0.5rem;
  padding: 0.5rem;
  font-size: 1.5rem;
  border-radius: 50%;
  cursor: pointer;
`;

// interface Params {
//   coinId: string;
// }
interface Location {
  state: {
    name: string;
  };
}

export interface IInfo {
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
    explorer: string[];
    facebook: string[];
    reddit: string[];
    source_code: string[];
    website: string[];
    youtube: string[];
  };
  links_extended: {
    url: string;
    type: string;
    status?: { subscribers?: number; contributors?: number; stars?: number; followers?: number };
  }[];
  whitepaper: { link: string; thumbnail: string };
  first_data_at: string;
  last_data_at: string;
}

export interface IPrice {
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

  const { isLoading: isInfoLoading, data: info } = useQuery<IInfo>(["info", coinId], () =>
    fetchCoinInfo(coinId!)
  );
  const { isLoading: isPriceLoading, data: price } = useQuery<IPrice>(
    ["price", coinId],
    () => fetchCoinPrice(coinId!),
    { refetchInterval: 1000 * 60 }
  );
  const isLoading = isInfoLoading || isPriceLoading;

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  const infoMatch = useMatch("/:coinId/info");
  // console.log(priceMatch, chartMatch);

  return (
    <Container>
      <Helmet>
        <title>{location.state?.name || (isLoading ? "Loading..." : info?.name)}</title>
      </Helmet>
      <Header>
        <Title>{location.state?.name || (isLoading ? "Loading..." : info?.name)}</Title>
      </Header>
      <Link to="/">
        <HomeBtn>&larr;</HomeBtn>
      </Link>
      {isLoading ? (
        <Loader>Loading</Loader>
      ) : (
        <>
          <Overview>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.rank}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Rank:</span>
              <span>{info?.symbol}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Price:</span>
              <span>${price?.quotes.USD.price}</span>
            </OverviewItem>
          </Overview>
          <Description>{info?.description}</Description>
          <Overview>
            <OverviewItem>
              <span>Total Suply:</span>
              <span>{price?.total_supply}</span>
            </OverviewItem>
            <OverviewItem>
              <span>Max Supply:</span>
              <span>{price?.max_supply}</span>
            </OverviewItem>
          </Overview>
          <Tabs>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
            <Tab isActive={infoMatch !== null}>
              <Link to="info">Info</Link>
            </Tab>
          </Tabs>
          <Routes>
            <Route path="chart" element={<Chart coinId={coinId!} />} />
            <Route path="price" element={<Price coinId={coinId!} price={price!} />} />
            <Route path="info" element={<Info coinId={coinId!} info={info!} />} />
          </Routes>
        </>
      )}
    </Container>
  );
};

export default Coin;
