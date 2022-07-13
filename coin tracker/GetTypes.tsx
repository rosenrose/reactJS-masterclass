import { useQueries } from "react-query";
import { ObjectToDetails } from "./util";

const GetTypes = () => {
  const result = useQueries([
    {
      queryKey: "0",
      queryFn: () =>
        fetch(`https://api.coinpaprika.com/v1/coins/btc-bitcoin`).then((response) =>
          response.json()
        ),
    },
    {
      queryKey: "1",
      queryFn: () =>
        fetch(`https://api.coinpaprika.com/v1/tickers/btc-bitcoin`).then((response) =>
          response.json()
        ),
    },
  ]);

  console.log("0", result[0].data);
  // console.log("1", result[1].data);
  // console.log("0", objectToEntries(result[0].data));
  // console.log("1", objectToEntries(result[1].data));

  return (
    <>
      {result.map((r) => r.isLoading).every((isLoading) => !isLoading) && (
        <>
          <pre>{getTypes(result[0].data)}</pre>
          <pre>{getTypes(result[1].data)}</pre>
          <ObjectToDetails obj={result[0].data} />
          <ObjectToDetails obj={result[1].data} />
        </>
      )}
    </>
  );
};

function getTypes(obj: object): string {
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      const types = Array.from(new Set(obj.map((e) => getTypes(e))));
      let result = "";

      if (types.length === 0) {
        result = "undefined";
      } else if (types.length === 1) {
        result = types[0];
      } else {
        result = `(${types.join(" | ")})`;
      }

      return `${result}[]`;
    } else {
      return JSON.stringify(
        Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, getTypes(val)])),
        null,
        2
      )
        .replace(/"((boolean|string|number|undefined)(\[\])?)"/g, "$1")
        .replace(/\s?\\n?\s?|"(?=\(|\{)|(?<=(\}|\]))"/g, "");
    }
  } else {
    return typeof obj;
  }
}

export default GetTypes;
