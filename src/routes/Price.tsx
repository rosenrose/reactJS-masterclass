import { IPrice } from "./Coin";
import styled from "styled-components";

interface PriceProps {
  coinId: string;
  price: IPrice;
}

const Price = ({ coinId, price }: PriceProps) => {
  // console.log(price, entries);
  return <ObjectToDetails obj={price} />;
};

const Details = styled.details.attrs({ open: true })`
  margin: 1rem 0;
  padding: 0 1rem;
`;
const Summary = styled.summary`
  margin-left: -1rem;
  marginbottom: 0.5rem;
  color: ${(props) => props.theme.accentColor};
`;
const Li = styled.li`
  margin: 0.5rem 0;
  padding: 0.5rem;
  background-color: ${(props) => props.theme.accentBgColor};
`;

export function ObjectToDetails({ obj }: { obj: any }) {
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      return (
        <>
          {obj.map((value) => (
            <Li key={value}>{<ObjectToDetails obj={value} />}</Li>
          ))}
        </>
      );
    } else {
      return (
        <>
          {Object.entries(obj).map(([key, value]) => (
            <Details key={key}>
              <Summary>{key}</Summary>
              {typeof value === "object" ? (
                Array.isArray(value) ? (
                  <>
                    {value.map((val, i) => (
                      <Li key={i}>{<ObjectToDetails obj={val} />}</Li>
                    ))}
                  </>
                ) : (
                  <ObjectToDetails obj={value} />
                )
              ) : (
                <>{String(value)}</>
              )}
            </Details>
          ))}
        </>
      );
    }
  } else {
    return <>{String(obj)}</>;
  }
}

export default Price;
