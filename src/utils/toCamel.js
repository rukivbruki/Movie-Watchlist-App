const toCamel = (string) => {
  return string.replace(/([-_][a-z])/ig, ($1) => {
    return $1.toUpperCase()
        .replace(`-`, ``)
        .replace(`_`, ``);
  });
};

const isArray = function (arr) {
  return Array.isArray(arr);
};

const isObject = function (obj) {
  return obj === Object(obj) && !isArray(obj) && typeof obj !== `function`;
};

const keysToCamel = function (obj) {
  if (isObject(obj)) {
    const n = {};

    Object.keys(obj)
        .forEach((key) => {
          n[toCamel(key)] = keysToCamel(obj[key]);
        });

    return n;
  } else if (isArray(obj)) {
    return obj.map((i) => {
      return keysToCamel(i);
    });
  }

  return obj;
};


export {keysToCamel};
