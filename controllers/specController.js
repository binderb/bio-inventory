import Sequelize from 'sequelize';
import { Spec, Vendor } from '../models/index.js';

// -----------------------------------------------
// Common functions for API and view
// -----------------------------------------------

// Common GET one function.
export const findSpecByPk = async (id) => {
  const specData = await Spec.findByPk(id);
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
    res.status(500).json({message: `Internal Server Error: ${err.name}: ${err.message}`});
  }
}

// Get one spec by id.
export const getOneSpec = async (req, res) => {
  const specData = await findSpecByPk(req.params.id);
  res.status(200).json(specData);
}

// Create one spec.
export const createOneSpec = async (req, res) => {

}

// Update one spec.
export const updateOneSpec = async (req, res) => {

}

// Delete one spec.
export const deleteOneSpec = async (req, res) => {
  
}