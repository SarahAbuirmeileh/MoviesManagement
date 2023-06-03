const fs = require('fs');

const readTheFile = () => {
    return new Promise((resolve, reject) => {
      fs.readFile('films.json', 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

const writeToFile= (data)=>{
    const p =  new Promise((res, rej) => {
        fs.writeFile('films.json', data, 'utf-8', (err) => {
            if (err){
                rej(err)
            } else {
                res()
            }
        });
    });
    return p;
}

module.exports = {
  readTheFile,
  writeToFile
};
