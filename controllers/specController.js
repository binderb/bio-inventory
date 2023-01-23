import Sequelize from 'sequelize';
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
            [Sequelize.literal('(SELECT items.current_amount / spec.amount FROM spec WHERE spec.id = items.spec_id)'),'percent_remaining']
          ]
        },
        include: [
          {model: Location, as: 'location'},
          {model: Location, as: 'sublocation'}
        ]
      },
      {model: Speclog}
    ]
  });
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

// Create one spec.
export const createOneSpec = async (req, res) => {
  try {
    const newSpec = await Spec.create(req.body);
    res.status(201).json(newSpec);
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Update one spec.
export const updateOneSpec = async (req, res) => {
  try {
    const specData = await findSpecByPk(req.params.id);
    if (!specData) {
      res.status(404).json({message: `No spec found with the given ID!`});
      return;
    }
    const updatedSpec = await Spec.update(req.body, {
      where: {
        id: req.params.id
      },
    });
    res.status(200).json(updatedSpec);
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
    const deletedSpec = await Spec.delete({
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