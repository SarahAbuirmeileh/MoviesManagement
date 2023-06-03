const readline = require('readline');
const {printTitles,storeMovies, addMovie, deleteMovie, searchByTitle, searchByDirector, searchByGenre} = require('./movieManagement');
const { fetchMovie } = require('./APIRequests');


const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

function displayMenu() {
    const menue = `
    
***********************************
1. Print the title of each movie
2. Add a new movie
3. Edit a specific movie
4. Delete a movie
5. Search for movies by title
6. Search for movies by director
7. Search for movies by genre
8. Fetch Movie Data from API
9. Exit
***********************************

`
    console.log(menue)
}

function getInput(message) {
    return new Promise((resolve, reject) => {
        rl.question(`${message}: `, (answer) => {
            if (answer.trim().length === 0) {
                reject('Invalid input');
            }else {
                resolve(answer);
            }
        })
    });
}

const userChoice=  async ()=> {
  const choice = await getInput("Enter your choice ^-^ ");

  switch (choice) {
    case "1":
        printTitles()
        break;

    case "2":
        const title = await getInput("Enter the title");
        const year = await getInput("Enter the year");
        const runtime = await getInput("Enter the runtime");
        const director = await getInput("Enter the director");
        const genre = await getInput("Enter the genre");
        const language = await getInput("Enter the language");
        const country = await getInput("Enter the country");

        addMovie(title, year, runtime, director, genre, language, country);
        break;

    case "3":
        printTitles()
        const index = await getInput("Enter the index of the movie to edit: ");
        const attribute = await getInput("Enter the attribute to edit (title, year, runtime, director, genre, language, country)");
        const newValue = await getInput("Enter the new value");

        editMovie(index, attribute, newValue);
        break;

    case "4":
      printTitles()
      const deleteIndex = await getInput("Enter the index of the movie to delete");
      deleteMovie(deleteIndex);
      break;

    case "5":
      const searchTitle = await getInput("Enter the movie title to search for");
      searchByTitle(searchTitle)
      break;

    case "6":
      const searchDirector = await getInput("Enter the director to search for");
      searchByDirector(searchDirector)
      break;

    case "7":
      const searchGenre = await getInput("Enter the genre to search for");
      searchByGenre(searchGenre)
      break;

    case "8":
        const key = await getInput("Enter the key:");
        const theTitle = await getInput("Enter the title:");
        await fetchMovie(key,theTitle);
        storeMovies();
        console.log("Movie data fetched and saved to file ^-^ ");
      break;

    case "9":
      rl.close();
      return choice;

    default:
      console.log("Invalid choice, please try again ^_^ ");
      break;
  }
}

module.exports = { displayMenu, userChoice };