import { useState } from "react";

const GetTypes = () => {
  const [a, b] = useState("");
  const [c, d] = useState("");

  fetch(`https://api.coinpaprika.com/v1/coins/btc-bitcoin`)
    .then((response) => response.json())
    .then((json) => {
      b(getTypes(json));
    });
  fetch(`https://api.coinpaprika.com/v1/tickers/btc-bitcoin`)
    .then((response) => response.json())
    .then((json) => {
      d(getTypes(json));
    });

  return (
    <>
      <pre>{a}</pre>
      <pre>{c}</pre>
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
