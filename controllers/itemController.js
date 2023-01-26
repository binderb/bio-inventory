import Sequelize from 'sequelize';
import sequelize from '../config/connection.js';
import { Item, Itemlog, Spec, Location } from '../models/index.js';
import { format_datetime } from '../utils/helpers.js';

// -----------------------------------------------
// Common functions for API and view
// -----------------------------------------------

// Common GET one function.
export const findItemByPk = async (id) => {

  const itemData = await Item.findByPk(id, {
    include: [
      {model: Spec},
      {model: Location, as: 'location'},
      {model: Location, as: 'sublocation'},
      {model: Itemlog},
    ],
    attributes: {
      include: [
        [Sequelize.literal('(SELECT item.current_amount / spec.amount FROM spec WHERE spec.id = item.spec_id)'),'percent_remaining'],
        [Sequelize.literal('(SELECT COUNT(*) FROM item t WHERE t.spec_id = item.spec_id)'), 'stock_total']
      ]
    },
    order: [[{model: Itemlog}, 'created', 'DESC']]
  });
  const stock_index = await sequelize.query(`
  SELECT x.row_num FROM (SELECT t.id, t.spec_id, ROW_NUMBER() OVER (ORDER BY t.id) AS row_num FROM item t WHERE t.spec_id = ${itemData.spec_id}) x WHERE x.id = ${itemData.id}
  `, {type: Sequelize.QueryTypes.SELECT});
  itemData.dataValues.stock_index = stock_index[0].row_num;
  return itemData;
}

// Get all items.
// export const getAllItems = async (req, res) => {
  
// }

// Get one item by id.
export const getOneItem = async (req, res) => {
  try {
    const itemData = await findItemByPk(req.params.id);
    if (itemData) res.status(200).json(itemData);
    else res.status(404).json({message: `No item found with the given ID!`});
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Create one item.
export const createOneItem = async (req, res) => {
  try {
    // Validate input.
    const specStringArray = req.body.spec_pn.split(' ');
    req.body.spec_pn = (specStringArray[0]) ? specStringArray[0] : null;
    req.body.current_amount = parseFloat(req.body.current_amount);
    req.body.boxgrid = (req.body.boxgrid == '') ? null : req.body.boxgrid;
    req.body.sublocation_id = (req.body.sublocation_id == '') ? null : req.body.sublocation_id;
    if (!req.body.date_received || req.body.date_received == '' || !req.body.status || req.body.status == '' || !req.body.location_id || req.body.location_id == '' || !req.body.current_amount || isNaN(req.body.current_amount) || (req.body.boxgrid && req.body.boxgrid.length < 2)) {
      res.status(403).json({message: `Please make sure that all required fields have an appropriate value!`});
      return;
    }
    const itemSpec = await Spec.findOne({
      where: {
        pn: req.body.spec_pn
      }
    });
    if (!itemSpec) {
      res.status(403).json({message: `No matching spec found. Please be sure to select from the autocomplete menu.`});
      return;
    }
    // Create record.
    req.body.spec_id = itemSpec.id;
    const newItem = await Item.create(req.body);
    // Create log entry.
    const logBody = `${req.session.initials} created item.`;
    await Itemlog.create({
      user_id: req.session.userid,
      item_id: newItem.id,
      body: logBody
    });
    res.status(201).json(newItem);
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Update one item.
export const updateOneItem = async (req, res) => {
  try {
    // Make sure the record exists.
    const itemData = await findItemByPk(req.params.id);
    if (!itemData) {
      res.status(404).json({message: `No item found with the given ID!`});
      return;
    }
    // Validate input.
    req.body.current_amount = parseFloat(req.body.current_amount);
    req.body.boxgrid = (req.body.boxgrid == '') ? null : req.body.boxgrid;
    req.body.sublocation_id = (req.body.sublocation_id == '') ? null : req.body.sublocation_id;
    if (!req.body.date_received || req.body.date_received == '' || !req.body.current_amount || isNaN(req.body.current_amount) || (req.body.boxgrid && req.body.boxgrid.length < 2)) {
      res.status(403).json({message: `Please make sure that all required fields have an appropriate value!`});
      return;
    }
    // Update record.
    const updatedItem = await Item.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    const newItem = await findItemByPk(req.params.id);
    // Identify differences between existing and incoming record.
    const modifications = [];
    const oldDate = format_datetime(itemData.date_received);
    const newDate = format_datetime(newItem.date_received);
    if (itemData.lot != newItem.lot) modifications.push(`lot (${itemData.lot} \u2192 ${newItem.lot})`);
    if (itemData.status != newItem.status) modifications.push(`status (${itemData.status} \u2192 ${newItem.status})`);
    if (itemData.location_id != newItem.location_id) modifications.push(`location (${itemData.location.name} \u2192 ${newItem.location.name})`);
    if (itemData.sublocation_id != newItem.sublocation_id) modifications.push(`sublocation (${(itemData.sublocation) ? itemData.sublocation.name : null} \u2192 ${(newItem.sublocation) ? newItem.sublocation.name : null})`);
    if (itemData.boxgrid != newItem.boxgrid) modifications.push(`boxgrid (${itemData.boxgrid} \u2192 ${newItem.boxgrid})`);
    if (itemData.current_amount != newItem.current_amount) modifications.push(`current amount (${itemData.current_amount} \u2192 ${newItem.current_amount})`);
    if (oldDate != newDate) modifications.push(`date received (${oldDate} \u2192 ${newDate})`);
    // Generate log entry.
    if (modifications.length > 0) {
      const logBody = `${req.session.initials} updated fields: ${modifications.join(', ')}.`;
      await Itemlog.create({
        user_id: req.session.userid,
        item_id: req.params.id,
        body: logBody
      });
    }
    res.status(200).json(newItem);
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Delete one item.
export const deleteOneItem = async (req, res) => {
  // Make sure the record exists.
  const itemData = await findItemByPk(req.params.id);
  if (!itemData) {
    res.status(404).json({message: `No item found with the given ID!`});
    return;
  }
  await Item.destroy({
    where: {
      id: req.params.id
    }
  });
  res.status(200).json(itemData);
}

// Get enumerated statuses defined in the item model.
export const getStatuses = async (req, res) => {
  res.status(200).json(Item.getAttributes().status.values);
}