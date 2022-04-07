module.exports = {
  DBHOST: "localhost",
  DBUSER: "test",
  DBPASS: "test",
  DBNAME: "athlete",
  dialect: "mysql",
  pool: {
    max: 7,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
};
