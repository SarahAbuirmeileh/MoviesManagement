const fs = require('fs');

const readTheFile = (file) => {
    return new Promise((resolve, reject) => {
      fs.readFile(file, 'utf-8', (err, data) => {
        if (err) {
          reject(err);
        } else {
          resolve(data);
        }
      });
    });
  }

  const writeToFile= (file, data)=>{
    const p =  new Promise((res, rej) => {
        fs.writeFile(file, data, 'utf-8', (err) => {
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
