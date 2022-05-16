import { useQuery } from "react-query";
import { fetchCoinHistory } from "../api";
import ApexChart from "react-apexcharts";

interface ChartProps {
  coinId: string;
}
interface IHistorical {
  time_open: string;
  time_close: string;
  open: number;
  high: number;
  low: number;
  close: number;
  volume: number;
  market_cap: number;
}

const Chart = ({ coinId }: ChartProps) => {
  const { isLoading, data } = useQuery<IHistorical[]>(
    ["history", coinId],
    () => fetchCoinHistory(coinId),
    { refetchInterval: 1000 * 10 }
  );

  return (
    <div>
      {isLoading ? (
        "Loading chart..."
      ) : (
        <>
          <ApexChart
            type="line"
            series={[
              {
                data: data!.map((price) => price.close)!,
                name: "Close Price",
              },
            ]}
            options={{
              chart: {
                width: 500,
                height: 500,
                toolbar: { show: false },
                background: "transparent",
              },
              theme: { mode: "dark" },
              stroke: { curve: "smooth", width: 4 },
              grid: { show: false },
              xaxis: {
                labels: { show: false },
                axisTicks: { show: false },
                axisBorder: { show: false },
                type: "datetime",
                categories: data!.map((price) => price.time_close),
              },
              yaxis: { labels: { formatter: (value) => value.toFixed(0) } },
              fill: {
                type: "gradient",
                gradient: { gradientToColors: ["#575fcf"], stops: [0, 100] },
              },
              colors: ["#0be881"],
              tooltip: {
                y: {
                  formatter: (value) => "$" + value.toFixed(2),
                },
              },
            }}
          />
          <ApexChart
            type="candlestick"
            series={[
              {
                data: data!.map((price) => ({
                  x: price.time_close,
                  y: [price.open, price.high, price.low, price.close],
                })),
              },
            ]}
            options={{
              chart: {
                width: 500,
                height: 500,
                toolbar: { show: false },
                background: "transparent",
              },
              theme: { mode: "dark" },
              xaxis: {
                type: "datetime",
              },
              yaxis: { labels: { formatter: (value) => value.toFixed(0) } },
              tooltip: {
                y: {
                  formatter: (value) => "$" + value.toFixed(2),
                },
              },
            }}
          />
        </>
      )}
    </div>
  );
};

export default Chart;
