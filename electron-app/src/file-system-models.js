const { readFile, writeFile, existsSync } = require('fs');
const { promisify } = require('util');
const { v4 } = require('uuid');
const readFilePromise = promisify(readFile);
const writeFilePromise = promisify(writeFile);
const path = require('path');
const uuidv4 = v4;

class FileSystemModels {
  constructor(rootPath) {
    this.rootPath = rootPath;
  }

  update(modelName, obj) {
    let modelPath = this.modelPathData(modelName)
    if (existsSync(modelPath)) {
      return readFilePromise(modelPath).then((res) => {
        let data = JSON.parse(res);
        let filteredModels = data.filter((element) => element.id !== obj.id)
        writeFilePromise(modelPath, JSON.stringify([...filteredModels, obj]))
      })
    }
  }


  destroy(modelName, id) {
    let modelPath = this.modelPathData(modelName)
    if (existsSync(modelPath)) {
      return readFilePromise(modelPath).then((res) => {
        let data = JSON.parse(res);
        let filteredModels = data.filter((element) => element.id !== id)
        return writeFilePromise(modelPath, JSON.stringify(filteredModels))
      })
    }
  }

  create(modelName, obj) {
    let modelPath = this.modelPathData(modelName);
    obj.id = uuidv4();
    if (existsSync(modelPath)) {
      return readFilePromise(modelPath).then((res) => {
        let data = JSON.parse(res);
        writeFilePromise(modelPath, JSON.stringify([...data, obj]))
        return obj;
      })
    } else {
      writeFilePromise(modelPath, JSON.stringify([obj]))
    }
  }

  findRecord(modelName, id) {
    let modelPath = this.modelPathData(modelName)
    if (existsSync(modelPath)) {
      return readFilePromise(modelPath).then((res) => {
        let data = JSON.parse(res);
        return data.find((element) => element.id == id)
      })
    } else {
      return Promise.resolve();
    }
  }

  findAll(modelName) {
    let modelPath = this.modelPathData(modelName)
    if (existsSync(modelPath)) {
      return readFilePromise(modelPath).then((regit s) => {
        let data = JSON.parse(res);
        return data
      })
    } else {
      return Promise.resolve([]);
    }
  }

  modelPathData(modelName) {
    return path.join(this.rootPath, `${modelName}.json`);
  }
}

module.exports = FileSystemModels;
