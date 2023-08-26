const Postgres = require('./postgres');
const FileSystemModels = require('./../file-system-models');
const { getHomeDirectory } = require('./../paths');

class Datasource {
  constructor(model) {
    if (!model) throw new Exception('datasource not found');
    this.adapter = new Postgres(model);
  }
  query(query) {
    return this.adapter.query(query);
  }

  scan() {
    return this.adapter.scan();
  }
}

module.exports = Datasource;
