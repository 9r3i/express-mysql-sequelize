const db = require("../models");
const winners = db.winners;
const countries = db.countries;
const sports = db.sports;
const Op = db.Sequelize.Op;

/* OPTIONS method handler */
exports.options = (req,res) => {
  req.params;
  res.status(204).send('');
};

/* create and save a new winner */
exports.create = (req, res) => {
  /* validate request */
  if (!req.body.athlete) {
    res.status(400).send(
      db.output('error','athlete name can not be empty',null));
    return;
  }
  /* create a winner object */
  const winner = {
    athlete: req.body.athlete,
    date: req.body.date && req.body.date.match(/^\d{4}-\d{2}-\d{2}$/)
          ? req.body.date : '1970-01-01',
    country_group: req.body.country_group
                   && req.body.country_group.match(/^[A-Z]$/)
                   ? req.body.country_group : 'A',
  };
  /* prepare all integer keys and add to the object */
  const winnerKeys=[
    'age','year','gold','silver',
    'bronze','total','sportId','countryId'
  ];
  var errKey=false;
  for(var i in winnerKeys){
    if(typeof req.body[winnerKeys[i]]==='undefined'){
      errKey='require "'+winnerKeys[i]+'" value';
      break;
    }
    winner[winnerKeys[i]]=parseInt(req.body[winnerKeys[i]],10);
  }
  if(errKey){
    res.status(400).send(
      db.output('error',errKey,null));
    return;
  }
  /* save the winner into database */
  winners.create(winner)
    .then(data => {
      res.status(200).send(
        db.output('success','success create data',data));
    })
    .catch(err => {
      res.status(500).send(
        db.output('error',err.message||'failed creating a winner',null));
    });
};

/* find all winners from the database */
exports.findAll = (req, res) => {
  /* default ordering */
  const orderingDefault = [[ 'id', 'ASC' ]];
  const ordering = req.body.sortModel && req.body.sortModel.length>0
    ? req.body.sortModel.map(a=>{
      const cols = a.colId.split('.');
      cols.push(a.sort.toUpperCase());
      return cols;
    })
    : orderingDefault;
  /* wherance for countries */
  var countryValues = false;
  if(req.body.filterModel && req.body.filterModel.hasOwnProperty('country.name')){
    countryValues = req.body.filterModel['country.name'].values;
  }
  const countryWhere = countryValues ? {name: countryValues} : {};
  /* wherance conditions for winners */
  const whereDef = {};
  var whereVar = false;
  if(req.body.filterModel && req.body.filterModel.year){
    const fyear = req.body.filterModel.year;
    if(fyear.operator=='OR'&&fyear.filterType=='number'){
      whereVar = {
        [Op.or]: [
          {year:db.yearCondition(fyear.condition1)},
          {year:db.yearCondition(fyear.condition2)},
        ]
      };
    }else if(fyear.operator=='AND'&&fyear.filterType=='number'){
      whereVar = {
        [Op.and]: [
          {year:db.yearCondition(fyear.condition1)},
          {year:db.yearCondition(fyear.condition2)},
        ]
      };
    }else if(fyear.operator=='OR'&&fyear.filterType=='date'){
      whereVar = {
        [Op.or]: [
          {date:db.dateCondition(fyear.condition1)},
          {date:db.dateCondition(fyear.condition2)},
        ]
      };
    }else if(fyear.operator=='AND'&&fyear.filterType=='date'){
      whereVar = {
        [Op.and]: [
          {date:db.dateCondition(fyear.condition1)},
          {date:db.dateCondition(fyear.condition2)},
        ]
      };
    }
    whereVar=db.yearCondition(fyear);
  }
  const whereWin = whereVar ? whereVar : whereDef;
  /* table relation */
  countries.hasMany(winners, {foreignKey: 'countryId'});
  winners.belongsTo(countries, {foreignKey: 'countryId'});
  sports.hasMany(winners, {foreignKey: 'sportId'});
  winners.belongsTo(sports, {foreignKey: 'sportId'});
  /* start finding and count the rows */
  winners.findAndCountAll({
    include: [
      {
        model: countries,
        required: true,
        where: countryWhere,
      },
      {
        model: sports,
        required: true,
      }
    ],
    offset: parseInt(req.body.startRow,10),
    limit: parseInt(req.body.endRow,10) - parseInt(req.body.startRow,10),
    order: ordering,
    where: whereWin,
  })
    .then(data => {
      res.status(200).send(
        db.output('success','success get data',{
          lastRow: data.count,
          rows: data.rows
        }));
    })
    .catch(err => {
      res.status(500).send(
        db.output('error',err.message||'failed retrieving winners',null));
    });
};

/* find one by id */
exports.findOne = (req, res) => {
  const id = req.params.id;
  /* table relation */
  countries.hasMany(winners, {foreignKey: 'countryId'});
  winners.belongsTo(countries, {foreignKey: 'countryId'});
  sports.hasMany(winners, {foreignKey: 'sportId'});
  winners.belongsTo(sports, {foreignKey: 'sportId'});
  /* find by id */
  winners.findOne({
    include: [
      {
        model: countries,
        required: true,
      },
      {
        model: sports,
        required: true,
      }
    ],
    where: {
      id: id
    }
  })
    .then(data => {
      if(data){
        res.status(200).send(
          db.output('success','success get data',data));
      }else{
        res.status(404).send(
          db.output('error',`winner with id=${id} is not found`,null));
      }
    })
    .catch(err => {
      res.status(500).send(
        db.output('error',`failed retrieving a winner with id=${id}`,null));
    });
};

/* update a single winner by id with data request */
exports.update = (req, res) => {
  const id = req.params.id;
  /* validate request */
  if (!req.body.athlete) {
    res.status(400).send(
      db.output('error','athlete name can not be empty',null));
    return;
  }
  /* create a winner object */
  const winner = {
    athlete: req.body.athlete,
    date: req.body.date && req.body.date.match(/^\d{4}-\d{2}-\d{2}$/)
          ? req.body.date : '1970-01-01',
    country_group: req.body.country_group
                   && req.body.country_group.match(/^[A-Z]$/)
                   ? req.body.country_group : 'A',
  };
  /* prepare all integer keys and add to the object */
  const winnerKeys=[
    'age','year','gold','silver',
    'bronze','total','sportId','countryId'
  ];
  var errKey=false;
  for(var i in winnerKeys){
    if(typeof req.body[winnerKeys[i]]==='undefined'){
      errKey='require "'+winnerKeys[i]+'" value';
      break;
    }
    winner[winnerKeys[i]]=parseInt(req.body[winnerKeys[i]],10);
  }
  if(errKey){
    res.status(400).send(
      db.output('error',errKey,null));
    return;
  }
  /* update the winner */
  winners.update(winner, {
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send(
          db.output('success',`winner with id=${id} has been updated`,null));
      } else {
        res.status(400).send(
          db.output('error',`failed to update winner with id=${id}`,null));
      }
    })
    .catch(err => {
      res.status(500).send(
        db.output('error',`failed to update winner with id=${id}`,null));
    });
};

/* delete a winner by id */
exports.delete = (req, res) => {
  const id = req.params.id;
  winners.destroy({
    where: { id: id }
  })
    .then(num => {
      if (num == 1) {
        res.status(200).send(
          db.output('success','winner has been deleted',null));
      } else {
        res.status(400).send(
          db.output('error','failed to delete a winner',null));
      }
    })
    .catch(err => {
      res.status(500).send(
        db.output('error','failed to delete a winner',null));
    });
};

/* delete all winners from the database */
exports.deleteAll = (req, res) => {
  winners.destroy({
    where: {},
    truncate: false
  })
    .then(nums => {
      res.send(
        db.output('success',`${nums} winners has been deleted`,null));
    })
    .catch(err => {
      res.status(500).send(
        db.output('error',err.message||'failed deleting all winners',null));
    });
};
