import { IPrice } from "./Coin";
import { objectToEntries, Entry } from "../GetTypes";
import styled from "styled-components";

interface PriceProps {
  coinId: string;
  price: IPrice;
}

const Price = ({ coinId, price }: PriceProps) => {
  const entries = objectToEntries(price);
  // console.log(price, entries);
  return <Detail entries={entries} />;
};

const Details = styled.details`
  margin: 1rem 0;
  padding: 0 1rem;
`;
const Summary = styled.summary`
  margin-left: -1rem;
  marginbottom: 0.5rem;
  color: ${(props) => props.theme.accentColor};
`;

function Detail({ entries }: { entries: Entry[] }) {
  return (
    <>
      {entries.map(([key, value]) => (
        <Details key={key} open={true}>
          <Summary>{key}</Summary>
          {Array.isArray(value) ? <Detail entries={value} /> : value}
        </Details>
      ))}
    </>
  );
}

export default Price;
