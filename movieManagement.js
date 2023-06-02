const { readTheFile, writeToFile } = require('./handlingFile');

// Save in array
let movies = [];

const getMovies = async() => {
      const data = await readTheFile('films.json', "utf-8", (err,data)=>{
        if (err){
            console.log("An error happened while reading the file")
            console.log(err)
        }else{
            console.log("Bringing the data has been made successfully! ")
        }
    }); 
    // bring the data from the json file using async/await
    movies = JSON.parse(data); // paring it to json
  }


  function printTitles() {
    movies.forEach((f, i) => {
      console.log(`${i+1}. ${f.Title}`);
    });
  }


// to store the last updates for the movies after evry change beacuse i will use it many times
const storeMovies =  async() => {
    const data = JSON.stringify(movies);
    await writeToFile('films.json', data, "utf-8", (err,data)=>{
        if (err){
            console.log("An error happened")
            console.log(err)
        }else{
            console.log('The changes has been saved successfully!');
        }
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
  getMovies,
  printTitles,
  addMovie,
  editMovie,
  deleteMovie,
  searchByTitle,
  searchByDirector,
  searchByGenre,
};
