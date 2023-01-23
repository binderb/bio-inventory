import { Category } from '../models/index.js';

// Get all categories.
export const getAllCategories = async (req, res) => {
  const categoryData = await Category.findAll();
  res.status(200).json(categoryData);
}

// Get one category by id.
export const getOneCategory = async (req, res) => {

}

// Create one category.
export const createOneCategory = async (req, res) => {

}

// Update one category.
export const updateOneCategory = async (req, res) => {

}

// Delete one category.
export const deleteOneCategory = async (req, res) => {
  
}