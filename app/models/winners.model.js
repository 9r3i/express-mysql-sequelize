module.exports = (sequelize, Sequelize) => {
  const Winner = sequelize.define("olympic_winners", {
    athlete: {
      type: Sequelize.STRING,
      validate: {
        notEmpty: true,
      }
    },
    age: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: true,
      }
    },
    gold: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: true,
      }
    },
    silver: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: true,
      }
    },
    bronze: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: true,
      }
    },
    total: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: true,
      }
    },
    year: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: true,
      }
    },
    sportId: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: true,
      }
    },
    date: {
      type: Sequelize.DATEONLY,
      validate: {
        isDate: true,
        is: /^\d{4}-\d{2}-\d{2}$/,
      }
    },
    countryId: {
      type: Sequelize.INTEGER,
      validate: {
        isInt: true,
      }
    },
    country_group: {
      type: Sequelize.STRING,
      validate: {
        is: /^[A-Z]$/,
      }
    }
  });
  return Winner;
};
