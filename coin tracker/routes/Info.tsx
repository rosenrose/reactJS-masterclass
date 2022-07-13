import { IInfo } from "./Coin";
import { ObjectToDetails } from "../util";

interface PriceProps {
  coinId: string;
  info: IInfo;
}

const Info = ({ coinId, info }: PriceProps) => {
  // console.log(price, entries);
  return <ObjectToDetails obj={info} />;
};

export default Info;
