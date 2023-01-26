import Sequelize from 'sequelize';
import { Location } from '../models/index.js';

// Get all locations.
export const getAllLocations = async (req, res) => {

}

// Get all top-level locations.
export const getAllTopLevelLocations = async (req, res) => {
  try {
    const locationData = await Location.findAll({
      where: {
        parent_id: null
      }
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Get all children of a particular location.
export const getAllChildLocations = async (req, res) => {
  try {
    const locationData = await Location.findAll({
      where: {
        parent_id: req.params.id
      },
      order: [['name','ASC']]
    });
    res.status(200).json(locationData);
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Get one location by id.
export const getOneLocation = async (req, res) => {
  
}

// Create one location.
export const createOneLocation = async (req, res) => {
  try {
    // Validate input.
    if (!req.body.name || req.body.name == '' || !req.body.type || req.body.type == '') {
      res.status(403).json({message: `Please make sure that all required fields have an appropriate value!`});
      return;
    }
    const nameCheck = await Location.findOne({
      where: {
        name: {
          [Sequelize.Op.like] : '%' + req.body.name + '%'
        }
      }
    });
    if (nameCheck) {
      res.status(403).json({message: `A location with the given name already exists in the database. Please modify your entry.`});
      return;
    }
    // Create record.
    const newLocation = await Location.create(req.body);
    res.status(201).json(newLocation);
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Update one location.
export const updateOneLocation = async (req, res) => {

}

// Delete one location.
export const deleteOneLocation = async (req, res) => {
  
}

// Get enumerated types defined in the location model.
export const getTypes = async (req, res) => {
  res.status(200).json(Location.getAttributes().type.values);
}