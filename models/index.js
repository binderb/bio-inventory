import User from './User.js';
import Spec from './Spec.js';
import Item from './Item.js';
import Category from './Category.js';
import Location from './Location.js';
import Vendor from './Vendor.js';

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
  as: 'location',
  foreignKey: 'location_id',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});

Item.belongsTo(Location, {
  as: 'location',
  foreignKey: 'location_id'
});

Location.hasMany(Item, {
  as: 'sublocation',
  foreignKey: 'sublocation_id',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});

Item.belongsTo(Location, {
  as: 'sublocation',
  foreignKey: 'sublocation_id'
});

Location.hasOne(Location, {
  foreignKey: 'parent_id',
  onUpdate: 'CASCADE',
  onDelete: 'SET NULL'
});


export {
  User,
  Spec,
  Item,
  Category,
  Location,
  Vendor
}