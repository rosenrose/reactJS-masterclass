function getTypes(obj) {
  if (typeof obj === "object") {
    if (Array.isArray(obj)) {
      let types = [...new Set(obj.map((e) => getTypes(e)))];

      if (types.length === 0) {
        types = "undefined";
      } else if (types.length === 1) {
        types = types[0];
      } else {
        types = `(${types.join(" | ")})`;
      }

      return `${types}[]`;
    } else {
      return JSON.stringify(
        Object.fromEntries(Object.entries(obj).map(([key, val]) => [key, getTypes(val)])),
        null,
        2
      )
        .replace(/"((boolean|string|number)(\[\])?)"/g, "$1")
        .replace(/\\n?|"(?=\(|\{)|(?<=(\}|\]))"/g, "");
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
