
// coach Rami did not write this sentance but my code did not work without it
const fetch = require('node-fetch');

const fetchMovie = async  (key, title)=> {

    const apiUrl = `https://api.example.com/movies?apikey=${key}&title=${encodeURIComponent(title)}`;
  
    try {
      const response = await fetch(apiUrl);
      return await response.json();
    } catch (err) {
      console.error('Error fetching movie data ^_^')
      console.log(err)
      return null; // beacuse the function should retuurn sth
    }
  }

module.exports = {
  fetchMovie
};
