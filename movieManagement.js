const { readTheFile, writeToFile } = require('./handlingFile');

class movie {
  constructor(title, year, runtime, director, genre, language, country) {
    this.title = title;
    this.year = year;
    this.runtime = runtime;
    this.director = director;
    this.genre = genre;
    this.language = language;
    this.country = country;
  }
}

// Save in array
let movies = [];

const getMovies = async () => {
  try {
    const data = await readTheFile();
    movies = Object.values(JSON.parse(data))
  } catch (err) {
    console.log('An error occurred ^_^');
    console.log(err);
  }
};

  function printTitles() {
    getMovies()
    movies.forEach((f, i) => {
      console.log(`${i+1}. ${f.Title}`);
    });
  }

// to store the last updates for the movies after evry change beacuse i will use it many times
const storeMovies =  async() => {
  getMovies()
  await writeToFile( JSON.stringify(movies))
  .then(()=>{})
  .catch(err=>{
      console.log("An error happened ^_^")
      console.log(err)
  });
}

const addMovie = (title, year, runtime, director, genre, language, country)=> {
  getMovies()
  movies.push(new movie(title, year, runtime, director, genre, language, country));
  storeMovies(); // save the changes
}

const deleteMovie = i => {
  getMovies()
  if (i >= 0 && i < movies.length) {
    movies.splice(i,1); // spiling the array to remove the item
    storeMovies();
  } else {
    console.log('Invalid movie index ^-^');
  }
}

const searchByTitle= title => {
  getMovies()
    const r = movies.filter((movie) =>{
        return movie.Title.toLowerCase()=== title.toLowerCase()
    });
    r.forEach((f, i) => {
        console.log(`${i+1}. ${f.Title}`);
    });
}

const editMovie = (i, f) => {
  getMovies()
    if (i >= 0 && i < movies.length) { // cheaking for validation for the index
      movies[i] = f;
      storeMovies();
    } else {
      console.log('Invalid movie index, choose other index ^_^ ');
    }
  }

const searchByDirector =director=> {
  getMovies()
    const r = movies.filter((movie) =>{
        return movie.Director.toLowerCase()=== director.toLowerCase()
    });

    r.forEach((movie, i) => {
        console.log(`${i+1}. ${movie.Director}`);
    });
}

const searchByGenre =genre=> {
  getMovies()
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
  searchByGenre,
  storeMovies
};