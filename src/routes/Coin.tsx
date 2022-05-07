import { useQuery } from "react-query";
import { useLocation, useParams, Outlet, Link, useMatch } from "react-router-dom";
import styled from "styled-components";
import { fetchCoinInfo, fetchCoinPrice } from "../api";

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
  grid-template-columns: repeat(2, 1fr);
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

// interface Params {
//   coinId: string;
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

  const { isLoading: isInfoLoading, data: info } = useQuery<Info>(["info", coinId], () =>
    fetchCoinInfo(coinId!)
  );
  const { isLoading: isPriceLoading, data: price } = useQuery<Price>(["price", coinId], () =>
    fetchCoinPrice(coinId!)
  );
  const isLoading = isInfoLoading || isPriceLoading;

  const priceMatch = useMatch("/:coinId/price");
  const chartMatch = useMatch("/:coinId/chart");
  // console.log(priceMatch);

  return (
    <Container>
      <Header>
        <Title>{location.state?.name || (isLoading ? "Loading..." : info?.name)}</Title>
      </Header>
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
              <span>Open Source:</span>
              <span>{info?.open_source ? "Yes" : "No"}</span>
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
            <Tab isActive={priceMatch !== null}>
              <Link to="price">Price</Link>
            </Tab>
            <Tab isActive={chartMatch !== null}>
              <Link to="chart">Chart</Link>
            </Tab>
          </Tabs>
          <Outlet />
        </>
      )}
    </Container>
  );
};

export default Coin;
