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

}

// Update one vendor.
export const updateOneVendor = async (req, res) => {

}

// Delete one vendor.
export const deleteOneVendor = async (req, res) => {
  
}