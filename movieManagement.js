const { readTheFile, writeToFile } = require('./handlingFile');

// Save in array
let movies = [];

const getMovies = () => {
  readTheFile('FilmsProject/films.json')
    .then((data) => {
      movies = JSON.parse(data);
      console.log('Movies loaded successfully!');
      console.log(movies);
    })
    .catch((err) => {
      console.log('An error occurred  ^_^');
      console.log(err);
    });
}

  function printTitles() {
    movies.forEach((f, i) => {
      console.log(`${i+1}. ${f.Title}`);
    });
  }


// to store the last updates for the movies after evry change beacuse i will use it many times
const storeMovies =  async() => {
  const data =  JSON.stringify(movies);
  console.log(typeof data)
  await writeToFile('FilmsProject/films.json', data)
  .then(()=>{
      console.log("successfully!!")
  })
  .catch(err=>{
      console.log("An error happened ^_^")
      console.log(err)
  });
}

const addMovie = movie=> {
  movies.push(movie);
  storeMovies(); // save the changes
}

const deleteMovie = i => {
  if (i >= 0 && i < movies.length) {
    movies.splice(i,1); // spiling the array to remove the item
    storeMovies();
  } else {
    console.log('Invalid movie index ^-^');
  }
}

const searchByTitle= title => {
    const r = movies.filter((movie) =>{
        return movie.Title.toLowerCase()=== title.toLowerCase()
    });
    r.forEach((f, i) => {
        console.log(`${i+1}. ${f.Title}`);
    });
}

const editMovie = (i, f) => {
    if (i >= 0 && i < movies.length) { // cheaking for validation for the index
      movies[i] = f;
      storeMovies();
    } else {
      console.log('Invalid movie index, choose other index ^_^ ');
    }
  }

const searchByDirector =director=> {
    const r = movies.filter((movie) =>{
        return movie.Director.toLowerCase()=== director.toLowerCase()
    });

    r.forEach((movie, i) => {
        console.log(`${i+1}. ${movie.Director}`);
    });
}

const searchByGenre =genre=> {
    const r = movies.filter((movie) =>{
        return movie.Genre.toLowerCase()=== genre.toLowerCase()
    });

    r.forEach((movie, i) => {
        console.log(`${i+1}. ${movie.Title}`);
    });
}

module.exports = {
  printTitles,
  getMovies,
  addMovie,
  editMovie,
  deleteMovie,
  searchByTitle,
  searchByDirector,
  searchByGenre
};
