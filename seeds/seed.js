import sequelize from '../config/connection.js';
import { User, Category } from '../models/index.js';
import userSeeds from './userSeeds.json' assert { type: 'json' };
import categorySeeds from './categorySeeds.json' assert { type: 'json' };

const seedDatabase = async () => {
  await sequelize.sync({force: true});
  await User.bulkCreate(userSeeds, {
    individualHooks: true,
    returning: true
  });
  await Category.bulkCreate(categorySeeds);
}

seedDatabase();