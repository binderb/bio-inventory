import Sequelize from 'sequelize';
import sequelize from '../config/connection.js';
import { Spec, Speclog, Category, Vendor, Item, Location } from '../models/index.js';

// -----------------------------------------------
// Common functions for API and view
// -----------------------------------------------

// Common GET one function.
export const findSpecByPk = async (id) => {
  const specData = await Spec.findByPk(id, {
    include: [
      {model: Category},
      {model: Vendor},
      {
        model: Item,
        attributes: {
          include: [
            [Sequelize.literal('(SELECT items.current_amount / spec.amount FROM spec WHERE spec.id = items.spec_id)'),'percent_remaining'],
          ]
        },
        include: [
          {model: Location, as: 'location'},
          {model: Location, as: 'sublocation'}
        ]
      },
      {model: Speclog}
    ],
    order: [
      [{model: Speclog}, 'created', 'DESC'],
      [{model: Item}, 'id', 'ASC']
    ]
  });
  if (specData) {
    for (let i=0; i<specData.dataValues.items.length; i++) {
      const stock_index = await sequelize.query(`
      SELECT x.row_num FROM (SELECT t.id, t.spec_id, ROW_NUMBER() OVER (ORDER BY t.id) AS row_num FROM item t WHERE t.spec_id = ${specData.id}) x WHERE x.id = ${specData.dataValues.items[i].id}
      `, {type: Sequelize.QueryTypes.SELECT});
      specData.dataValues.items[i].dataValues.stock_index = stock_index[0].row_num;
    }
  }
  
  return specData;
}



// -----------------------------------------------
// API Routes
// -----------------------------------------------

// Get all specs.
export const getAllSpecs = async (req, res) => {
  try {
    const allSpecsData = await Spec.findAll({
      attributes: {
        include: [
          [Sequelize.literal('(SELECT COUNT(*) FROM item WHERE item.spec_id = spec.id)'), "total_records"],
          [Sequelize.literal('(SELECT COUNT(*) FROM item WHERE item.spec_id = spec.id AND item.status = "unopened")'), "total_unopened"],
          [Sequelize.literal('(SELECT COUNT(*) FROM item WHERE item.spec_id = spec.id AND item.status = "opened")'), "total_opened"],
          [Sequelize.literal('(SELECT COUNT(*) FROM item WHERE item.spec_id = spec.id AND item.status = "empty")'), "total_empty"]
        ]
      },
      include: {
        model: Vendor,
        attributes: [
          'name'
        ]
      }
    });
    const allSpecs = allSpecsData;
    res.status(200).json(allSpecs);
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Get one spec by id.
export const getOneSpec = async (req, res) => {
  try {
    const specData = await findSpecByPk(req.params.id);
    if (specData) res.status(200).json(specData);
    else res.status(404).json({message: `No spec found with the given ID!`});
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Get one spec by part number.
export const getOneSpecByPN = async (req, res) => {
  try {
    const specData = await Spec.findOne({
      where: {
        pn: req.params.pn
      }
    });
    if (specData) res.status(200).json(specData);
    else res.status(404).json({message: `No spec found with the given ID!`});
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Create one spec.
export const createOneSpec = async (req, res) => {
  try {
    // Generate part number.
    const maxPN = await Spec.max('pn');
    const newPN = parseInt(maxPN) + 1;
    req.body.pn = newPN;
    // Validate input.
    req.body.amount = parseFloat(req.body.amount);
    req.body.reorder_qty_threshold = (!req.body.reorder_qty_threshold) ? null : parseFloat(req.body.reorder_qty_threshold);
    req.body.reorder_amt_threshold = (!req.body.reorder_amt_threshold) ? null : parseFloat(req.body.reorder_amt_threshold);
    if (!req.body.name || req.body.name == '' || !req.body.status || req.body.status == '' || !req.body.amount || isNaN(req.body.amount) || isNaN(req.body.reorder_qty_threshold) || isNaN(req.body.reorder_amt_threshold) || !req.body.category_id || req.body.category_id == '' || !req.body.vendor_id || req.body.vendor_id == '' || !req.body.units || req.body.units == '') {
      res.status(403).json({message: `Please make sure that all required fields have an appropriate value!`});
      return;
    }
    const nameCheck = await Spec.findOne({
      where: {
        name: {
          [Sequelize.Op.like] : '%' + req.body.name + '%'
        }
      }
    });
    if (nameCheck) {
      res.status(403).json({message: `A spec with the given name already exists in the database (PN: ${nameCheck.pn}). Please modify your entry.`});
      return;
    }
    // Create record.
    const newSpec = await Spec.create(req.body);
    // Create log entry.
    const logBody = `${req.session.initials} created spec.`;
    await Speclog.create({
      user_id: req.session.userid,
      spec_id: newSpec.id,
      body: logBody
    });
    res.status(201).json(newSpec);
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Update one spec.
export const updateOneSpec = async (req, res) => {
  try {
    // Make sure the record exists.
    const specData = await findSpecByPk(req.params.id);
    if (!specData) {
      res.status(404).json({message: `No spec found with the given ID!`});
      return;
    }
    // Validate input.
    req.body.amount = parseFloat(req.body.amount);
    req.body.reorder_qty_threshold = (!req.body.reorder_qty_threshold) ? null : parseFloat(req.body.reorder_qty_threshold);
    req.body.reorder_amt_threshold = (!req.body.reorder_amt_threshold) ? null : parseFloat(req.body.reorder_amt_threshold);
    if (!req.body.name || req.body.name == '' || !req.body.amount || isNaN(req.body.amount) || isNaN(req.body.reorder_qty_threshold) || isNaN(req.body.reorder_amt_threshold)) {
      res.status(403).json({message: `Please make sure that all required fields have an appropriate value!`});
      return;
    }
    const nameCheck = await Spec.findOne({
      where: {
        name: {
          [Sequelize.Op.like] : '%' + req.body.name + '%'
        },
        id: {
          [Sequelize.Op.not] : specData.id
        }
      }
    });
    if (nameCheck) {
      res.status(403).json({message: `A spec with the given name already exists in the database (PN: ${nameCheck.pn}). Please modify your entry.`});
      return;
    }
    const updatedSpec = await Spec.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    const newSpec = await findSpecByPk(req.params.id);
    // Identify differences between existing and incoming record.
    const modifications = [];
    if (specData.name != newSpec.name) modifications.push(`name (${specData.name} \u2192 ${newSpec.name})`);
    if (specData.category_id != newSpec.category_id) modifications.push(`category (${specData.category.name} \u2192 ${newSpec.category.name})`);
    if (specData.vendor_id != newSpec.vendor_id) modifications.push(`vendor (${specData.vendor.name} \u2192 ${newSpec.vendor.name})`);
    if (specData.amount != newSpec.amount) modifications.push(`amount (${specData.amount} \u2192 ${newSpec.amount})`);
    if (specData.units != newSpec.units) modifications.push(`units (${specData.units} \u2192 ${newSpec.units})`);
    if (specData.reorder_qty_threshold != newSpec.reorder_qty_threshold) modifications.push(`reorder_qty_threshold (${specData.reorder_qty_threshold} \u2192 ${newSpec.reorder_qty_threshold})`);
    if (specData.reorder_amt_threshold != newSpec.reorder_amt_threshold) modifications.push(`reorder_amt_threshold (${specData.reorder_amt_threshold} \u2192 ${newSpec.reorder_amt_threshold})`);
    // Generate log entry.
    if (modifications.length > 0) {
      const logBody = `${req.session.initials} updated fields: ${modifications.join(', ')}.`;
      await Speclog.create({
        user_id: req.session.userid,
        spec_id: req.params.id,
        body: logBody
      });
    }
    res.status(200).json(newSpec);
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Delete one spec.
export const deleteOneSpec = async (req, res) => {
  try {
    const specData = await findSpecByPk(req.params.id);
    if (!specData) {
      res.status(404).json({message: `No spec found with the given ID!`});
      return;
    }
    if (specData.items.length > 0) {
      res.statsu(403).json({message: `Cannot delete a spec that has associated items.`});
      return;
    }
    const deletedSpec = await Spec.destroy({
      where: {
        id: req.params.id
      }
    });
    res.status(200).json(deletedSpec);
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Get enumerated units defined in the spec model.
export const getUnits = async (req, res) => {
  res.status(200).json(Spec.getAttributes().units.values);
}

// Get enumerated units defined in the spec model.
export const getStatuses = async (req, res) => {
  res.status(200).json(Spec.getAttributes().status.values);
}

// Get next PN.
export const getNextPN = async (req, res) => {
  const pn = await Spec.max('pn');
  const newPN = parseInt(pn) + 1;
  res.status(200).json({pn: newPN});
}