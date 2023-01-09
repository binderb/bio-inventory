const sequelize = require('../config/connection');
const { User, Category, Vendor, Location, Spec, Item } = require('../models');

const clearDatabase = async () => {
  await sequelize.sync({force: true});
  await User.destroy({
    where: {}
  });
  await Category.destroy({
    where: {}
  });
  await Vendor.destroy({
    where: {}
  });
  await Location.destroy({
    where: {}
  });
  await Spec.destroy({
    where: {}
  });
  await Item.destroy({
    where: {}
  });
}

clearDatabase();