const API_ENDPOINT = "https://api.thecatapi.com/v1";

const fetchCats = async (keyword) => {
  try {
    const res = await fetch(`${API_ENDPOINT}/api/cats/search?q=${keyword}`);

    return res.json();
  } catch (err) {
    throw err;
  }
}

const fetchRandomCats = async () => {
  try {
    const res = await fetch(`${API_ENDPOINT}/images/search?limit=20`);

    return res.json();
  } catch (err) {
    throw err;
  }
}

export {
  fetchCats,
  fetchRandomCats,
};
