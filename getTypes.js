function getTypes(obj) {
  if (typeof obj === "object" && obj !== null) {
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
    return obj === null ? "null" : typeof obj;
  }
}

const path = "https://api.themoviedb.org/3";
const key = "";

["search"]
  .map((cat) => [cat, `${path}/search/multi?api_key=${key}&query=action`])
  .forEach(([cat, url]) => {
    fetch(url)
      .then((response) => response.json())
      .then((json) => {
        // console.log(json, getTypes(json), objectToEntries(json));
        console.log(url, getTypes(json));
        document.querySelector(`#${cat}`).textContent = getTypes(json);
      });
  });

function objectToEntries(obj) {
  if (typeof obj === "object" && obj !== null) {
    if (Array.isArray(obj)) {
      return obj.map((value) => objectToEntries(value));
    } else {
      return Object.entries(obj).map(([key, value]) => [
        key,
        typeof value === "object"
          ? Array.isArray(value)
            ? value.map((val) => objectToEntries(val))
            : objectToEntries(value)
          : value,
      ]);
    }
  } else {
    return obj;
  }
}
