module.exports = (sequelize, Sequelize) => {
  const Sport = sequelize.define("sports", {
    name: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      }
    }
  });
  return Sport;
};
