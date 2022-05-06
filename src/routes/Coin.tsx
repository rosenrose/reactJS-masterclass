import { useParams } from "react-router-dom";

// interface Params {
//   coinId:string
// }

const Coin = () => {
  // const { coinId } = useParams<Params>();
  const { coinId } = useParams();
  return <h2>Coin: {coinId}</h2>;
};

export default Coin;
