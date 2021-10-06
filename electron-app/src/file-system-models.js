const { readFile, writeFile, existsSync  } = require('fs');
const { promisify } = require('util');

const readFilePromise = promisify(readFile);
const writeFilePromise = promisify(writeFile);
const path = require('path');

function findModelData(modelName, rootPath){

};


class FileSystemModels {
  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  save(modelName, obj){
    let modelPath = this.modelPathData(modelName)
    if (existsSync(modelPath)) {
      readFilePromise(modelPath).then((res) => {
        let data = JSON.parse(res);
        let filteredModels = data.filter((element) => element.id !== obj.id)
        writeFilePromise(modelPath, JSON.stringify([...filteredModels, obj]))
      })
    } else {
      writeFilePromise(modelPath, JSON.stringify([obj]))
    }
  }

  findRecord(modelName, id){
    let modelPath = this.modelPathData(modelName)
    if (existsSync(modelPath)) {
      return readFilePromise(modelPath).then((res) => {
        let data = JSON.parse(res);
        return data.find((element) => element.id == id)
      })
    } else {
      return new Promise.resolve();
    }
  }

  modelPathData(modelName){
    return path.join(this.rootPath, `${modelName}.json`);
  }
}

module.exports = FileSystemModels;
