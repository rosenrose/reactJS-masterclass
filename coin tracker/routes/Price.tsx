import { IPrice } from "./Coin";
import { ObjectToDetails } from "../util";

interface PriceProps {
  coinId: string;
  price: IPrice;
}

const Price = ({ coinId, price }: PriceProps) => {
  // console.log(price, entries);
  return <ObjectToDetails obj={price} />;
};

export default Price;
