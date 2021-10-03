// preload with contextIsolation enabled
const { contextBridge } = require('electron')
const { existsSync, mkdirSync  } = require('fs');
const { getHomeDirectory } = require('./paths');
const FileSystemModels = require('./file-system-models');

let homeDirectory = getHomeDirectory(process.env.HOME);

function ensureHomeExists(dir){
  if (existsSync(dir)) {
    return
  }
  mkdirSync(dir);
}


ensureHomeExists(homeDirectory)


fsModels = new FileSystemModels(homeDirectory);

contextBridge.exposeInMainWorld('desktopAPI', {
  dataStore: {
    save(modelName, obj) {
      return fsModels.save(modelName, obj)
    },
    findRecord(modelName, id) {
      return fsModels.findRecord(modelName, id)
    },
  }
})
