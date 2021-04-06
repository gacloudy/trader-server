async function testDB() {
  var mysql = require('mysql');
  const util = require('util');
  var pool = mysql.createPool({
    connectionLimit: 10,
    host: '133.125.50.231',
    user: 'trader',
    password: 'tradertrader',
    database: 'trader',
    port: 3306
  });
  
  
  pool.query = util.promisify(pool.query)

  var results = [];
  try {
    results = await pool.query('SELECT * FROM shares_mst')
    pool.end(); // mysqlのコネクションのプロセスを終了させる。（2018-11-07追記）
  } catch (err) {
    throw new Error(err)
  }

  return results;

}



exports.testDB = testDB;  
