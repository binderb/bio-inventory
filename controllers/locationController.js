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

}

// Update one location.
export const updateOneLocation = async (req, res) => {

}

// Delete one location.
export const deleteOneLocation = async (req, res) => {
  
}