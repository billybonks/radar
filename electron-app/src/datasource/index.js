
const Postgres = require('./postgres')
const FileSystemModels = require('./../file-system-models');
const { getHomeDirectory } = require('./../paths');

class Datasource {
  constructor(model) {
    this.adapter = new Postgres(model)
  }
  query() {

  }

  scan() {
    return this.adapter.scan();
  }
}

module.exports = Datasource;

