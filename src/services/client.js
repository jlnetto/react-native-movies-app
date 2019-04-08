
const BASE_URL = 'http://www.omdbapi.com/?apikey=8a433248&type=movie'

import axios from 'axios'

const omdbApi = axios.create({
  baseURL: BASE_URL,
});

export default omdbApi