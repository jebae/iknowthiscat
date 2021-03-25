const API_ENDPOINT = "https://api.thecatapi.com/v1";

const request = async url => {
  try {
    const res = await fetch(url);

    return await res.json();
  } catch (err) {
    throw err;
  }
}

const fetchCats = async (keyword) => {
  try {
    const breeds = await request(`${API_ENDPOINT}/breeds/search?q=${keyword}`);
    const images = breeds.map(async breed => {
      return await request(`${API_ENDPOINT}/images/search?limit=20&breed_ids=${breed.id}`);
    });

    return (await Promise.all(images)).reduce((acc, cur) => acc.concat(cur), []);
  } catch (err) {
    throw err;
  }
}

const fetchRandomCats = async () => {
  try {
    return await request(`${API_ENDPOINT}/images/search?limit=20`);
  } catch (err) {
    throw err;
  }
}

export {
  fetchCats,
  fetchRandomCats,
};
