const User = require('./User');
const Spec = require('./Spec');
const Item = require('./Item');
const Category = require('./Category');
const Location = require('./Location');
const Vendor = require('./Vendor');

Category.hasMany(Spec, {
  foreignKey: 'category_id',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});

Spec.belongsTo(Category, {
  foreignKey: 'category_id'
});

Vendor.hasMany(Spec, {
  foreignKey: 'vendor_id',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});

Spec.belongsTo(Vendor, {
  foreignKey: 'vendor_id'
});

Spec.hasMany(Item, {
  foreignKey: 'spec_id',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});

Item.belongsTo(Spec, {
  foreignKey: 'spec_id'
});

Location.hasMany(Item, {
  foreignKey: 'location_id',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});

Item.belongsTo(Location, {
  foreignKey: 'location_id'
});

Location.hasMany(Item, {
  foreignKey: 'sublocation_id',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});

Item.belongsTo(Location, {
  foreignKey: 'sublocation_id'
});

Location.hasOne(Location, {
  foreignKey: 'parent_id',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});


module.exports = {
  User,
  Spec,
  Item,
  Category,
  Location,
  Vendor
}