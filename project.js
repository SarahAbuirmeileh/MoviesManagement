const { displayMenu, userChoice } = require('./userInteraction');

async function main() {
  let choice;
  while (choice !== "9") {
    displayMenu();
    choice = await userChoice();
  }
}

main();
