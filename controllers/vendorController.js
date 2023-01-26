import Sequelize from 'sequelize';
import { Vendor } from '../models/index.js';

// Get all vendors.
export const getAllVendors = async (req, res) => {
  const vendorData = await Vendor.findAll();
  res.status(200).json(vendorData);
}

// Get one vendor by id.
export const getOneVendor = async (req, res) => {

}

// Create one vendor.
export const createOneVendor = async (req, res) => {
  try {
    // Validate input.
    if (!req.body.name || req.body.name == '') {
      res.status(403).json({message: `Please make sure that all required fields have an appropriate value!`});
      return;
    }
    const nameCheck = await Vendor.findOne({
      where: {
        name: {
          [Sequelize.Op.like] : '%' + req.body.name + '%'
        }
      }
    });
    if (nameCheck) {
      res.status(403).json({message: `A vendor with the given name already exists in the database. Please modify your entry.`});
      return;
    }
    // Create record.
    const newVendor = await Vendor.create(req.body);
    res.status(201).json(newVendor);
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}

// Update one vendor.
export const updateOneVendor = async (req, res) => {

}

// Delete one vendor.
export const deleteOneVendor = async (req, res) => {
  
}