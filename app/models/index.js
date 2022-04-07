const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");
const sequelize = new Sequelize(dbConfig.DBNAME, dbConfig.DBUSER, dbConfig.DBPASS, {
  host: dbConfig.DBHOST,
  dialect: dbConfig.dialect,
  operatorsAliases: false,
  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
});
const db = {};
db.Sequelize = Sequelize;
db.sequelize = sequelize;
db.winners = require("./winners.model.js")(sequelize, Sequelize);
db.countries = require("./countries.model.js")(sequelize, Sequelize);
db.sports = require("./sports.model.js")(sequelize, Sequelize);
db.yearCondition = function(fyear){
  const Op = Sequelize.Op;
  var whereVar = {};
  if(fyear.type=='inRange'){
    whereVar = {
      year: {
        [Op.between]: [fyear.filter, fyear.filterTo]
      }
    };
  }else if(fyear.type=='greaterThanOrEqual'){
    whereVar = {
      year: {
        [Op.gte]: fyear.filter
      }
    };
  }else if(fyear.type=='greaterThan'){
    whereVar = {
      year: {
        [Op.gt]: fyear.filter
      }
    };
  }else if(fyear.type=='lessThanOrEqual'){
    whereVar = {
      year: {
        [Op.lte]: fyear.filter
      }
    };
  }else if(fyear.type=='lessThan'){
    whereVar = {
      year: {
        [Op.lt]: fyear.filter
      }
    };
  }else if(fyear.type=='notEqual'){
    whereVar = {
      year: {
        [Op.not]: fyear.filter
      }
    };
  }else if(fyear.type=='equals'){
    whereVar = {
      year: fyear.filter
    };
  }
  return whereVar;
};
db.dateCondition = function(fyear){
  const Op = Sequelize.Op;
  var whereVar = {};
  if(fyear.type=='inRange'){
    whereVar = {
      year: {
        [Op.between]: [fyear.dateFrom, fyear.dateTo]
      }
    };
  }else if(fyear.type=='greaterThanOrEqual'){
    whereVar = {
      year: {
        [Op.gte]: fyear.dateFrom
      }
    };
  }else if(fyear.type=='greaterThan'){
    whereVar = {
      year: {
        [Op.gt]: fyear.dateFrom
      }
    };
  }else if(fyear.type=='lessThanOrEqual'){
    whereVar = {
      year: {
        [Op.lte]: fyear.dateFrom
      }
    };
  }else if(fyear.type=='lessThan'){
    whereVar = {
      year: {
        [Op.lt]: fyear.dateFrom
      }
    };
  }else if(fyear.type=='notEqual'){
    whereVar = {
      year: {
        [Op.not]: fyear.dateFrom
      }
    };
  }else if(fyear.type=='equals'){
    whereVar = {
      year: fyear.dateFrom
    };
  }
  return whereVar;
};
db.output = function(status, message, data){
  return {
    status: status,
    message: message,
    data: data,
  };
};
module.exports = db;
