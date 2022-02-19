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
  renderJinja(value, vars) {
    return new Promise(function (resolve, reject) {
      let json = JSON.stringify(vars)
      var python = require('child_process').spawn('python', ['../py/renderJinja.py', value, json]);

      python.stdout.on('data', function (data) {
        resolve(data.toString('utf8'));
      });

      python.stderr.on('data', (data) => {
        reject(data);
        console.error(`stderr: ${data}`);
      });

      python.on('close', (code) => {
        console.log(`child process exited with code ${code}`);
      });
    })
  },
  datasource: {
    async scan(id) {
      let model = await fsModels.findRecord('datasource', id);
      let ds = new Datasource(model);
      let tables = await ds.scan();
      await fsModels.update('datasource', { ...model, tables, lastScan: Date.now() });
    },
    async query(id, query) {
      let model = await fsModels.findRecord('datasource', id);
      let ds = new Datasource(model);
      return await ds.query(query);
    }
  }
});

