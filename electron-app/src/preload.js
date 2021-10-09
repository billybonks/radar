// preload with contextIsolation enabled
const { contextBridge } = require('electron')
const { existsSync, mkdirSync } = require('fs');
const { getHomeDirectory } = require('./paths');
const FileSystemModels = require('./file-system-models');
const Datasource = require('./datasource');

let homeDirectory = getHomeDirectory(process.env.HOME);

function ensureHomeExists(dir) {
  if (existsSync(dir)) {
    return
  }
  mkdirSync(dir);
}


ensureHomeExists(homeDirectory)


fsModels = new FileSystemModels(homeDirectory);

contextBridge.exposeInMainWorld('desktopAPI', {
  dataStore: {
    update(modelName, obj) {
      return fsModels.update(modelName, obj)
    },
    create(modelName, obj) {
      return fsModels.create(modelName, obj)
    },
    findRecord(modelName, id) {
      return fsModels.findRecord(modelName, id)
    },
    findAll(modelName) {
      return fsModels.findAll(modelName)
    },
    destroy(modelName, id) {
      return fsModels.destroy(modelName, id)
    },
  },
  datasource: {
    async scan(id) {
      let homeDirectory = getHomeDirectory(process.env.HOME);
      fsModels = new FileSystemModels(homeDirectory);

      let model = await fsModels.findRecord('datasource', id);
      let ds = new Datasource(model);
      let tables = await ds.scan();
      await fsModels.update('datasource', { ...model, tables, lastScan: Date.now() });
    }
  }
});

