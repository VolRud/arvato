const REQUEST_URL = 'https://dummyjson.com/products';

export const serverRequest = () => {
  return fetch(REQUEST_URL, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json'
    },
  })
  .then(response => response.json())
  .then(data => {
    return data;
  })
  .catch(error => {
    return error;
  });
}
