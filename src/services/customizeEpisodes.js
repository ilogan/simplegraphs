// use to add new keys to objects in an array
export const addKeyToObjectList = (objectList, newKey, defaultValue) => {
  try {
    // can give object an array of keys and values
    if (
      Array.isArray(newKey) &&
      Array.isArray(defaultValue) &&
      newKey.length === defaultValue.length
    ) {
      const newObject = objectList.map(obj => {
        newKey.forEach((k, i) => {
          obj[k] = defaultValue[i];
        });
        return obj;
      });
      console.log("customarr", newObject);

      return newObject;
    }

    const newObject = objectList.map(obj => ({
      ...obj,
      [newKey]: defaultValue
    }));
    console.log("custom", newObject);
    return newObject;
  } catch (e) {
    console.error("There was an issue", e.message);
    return null;
  }
};

export const customizeEpisodes = episodeList => {
  // const keys = ["graph"];
  // const vals = [{ show: false }];
  return addKeyToObjectList(episodeList, "graph", { show: false });
};
