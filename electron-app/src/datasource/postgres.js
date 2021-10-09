const { Client } = require('pg')

class Postgres {
  constructor({ connectionString }) {
    this.connectionString = connectionString
  }

  async scan() {
    const query = `SELECT table_name FROM information_schema.tables WHERE table_schema='public'`;
    const client = new Client({
      connectionString: this.connectionString,
    })
    client.connect()
    let res = await client.query(query)
    let tables = res.rows.map(r => r.table_name)
    return tables;
  }

  async query(query) {
    const client = new Client({
      connectionString: this.connectionString,
    })
    client.connect()
    let res = await client.query(query)
    return res.rows;
  }
}

module.exports = Postgres;

//const connectionString = 'postgresql://dbuser:secretpassword@database.server.com:3211/mydb'


//'e844c6f9-ba13-4b59-b196-051911913fd2'