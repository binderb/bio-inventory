const sequelize = require('../config/connection');
const { User } = require('../models');
const userSeeds = require('./userSeeds.json');

const seedDatabase = async () => {
  await sequelize.sync({force: true});
  await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true
  });
}

seedDatabase();