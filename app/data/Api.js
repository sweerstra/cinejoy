import Request from './Request';

const API_URL = 'http://f458c58b.ngrok.io';

export default {
  getAvailableMovies: brands => Request.get(`${API_URL}/movies/available/${convertBrands(brands)}`),
  getExpectedMovies: brands => Request.get(`${API_URL}/movies/expected/${convertBrands(brands)}`),
  getCinemas: () => Request.get(`${API_URL}/cinemas/euroscoop,pathe,kinepolis`)
};

function convertBrands(brands) {
  if (Array.isArray(brands)) {
    brands = brands.join(',');
  }

  if (typeof brands === 'string') {
    return brands;
  }

  throw new Error(`Brands parameter has the wrong format: ${brands}`);
}
