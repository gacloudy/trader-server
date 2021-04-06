const yaml = require('./yaml.js');
const mysql = require('mysql');

const getConnection = () => { 

  const dbInfo = yaml.getDBInfo();


  const connection = mysql.createConnection({
      host: dbInfo.host,
      port: dbInfo.port,
      database: dbInfo.database,
      user: dbInfo.user,
      password: dbInfo.password
    });
  
  return connection;
};
   


  exports.getConnection = getConnection;  
