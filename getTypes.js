function getTypes(obj) {
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

fetch(`https://api.coinpaprika.com/v1/coins/btc-bitcoin`)
  .then((response) => response.json())
  .then((json) => {
    console.log(getTypes(json));
  });
fetch(`https://api.coinpaprika.com/v1/tickers/btc-bitcoin`)
  .then((response) => response.json())
  .then((json) => {
    console.log(getTypes(json));
  });

function objectToEntries(obj) {
  return Object.entries(obj).map(([key, value]) => [
    key,
    typeof value === "object" && !Array.isArray(value) ? objectToEntries(value) : value,
  ]);
}
