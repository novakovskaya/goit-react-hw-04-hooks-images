import PropTypes from "prop-types";

const BASE_URL = "https://pixabay.com/api/";
const API_KEY = "23966017-42a6e7201c4148adfb36c1add";

const fetchImagesApi = (searchQuery, page) => {
  return fetch(
    `${BASE_URL}?q=${searchQuery}&page=${page}&key=${API_KEY}&image_type=photo&orientation=horizontal&per_page=12`
  ).then((response) => {
    if (response.ok) {
      return response.json();
    }

    return Promise.reject(new Error("Requested images not found!"));
  });
};

fetchImagesApi.propTypes = {
  searchQuery: PropTypes.string.isRequired,
  page: PropTypes.number.isRequired,
};

export default fetchImagesApi;
