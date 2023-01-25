import Sequelize from 'sequelize';
import { Item, Itemlog, Spec, Location } from '../models/index.js';

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
        [Sequelize.literal('(SELECT x.position FROM (SELECT t.id, t.spec_id, @rownum := @rownum + 1 AS position FROM item t JOIN (SELECT @rownum := 0) r) x WHERE x.spec_id = item.spec_id AND x.id = item.id)'),'stock_index'],
        [Sequelize.literal('(SELECT COUNT(*) FROM item t WHERE t.spec_id = item.spec_id)'), 'stock_total']
      ]
    },
    order: [[{model: Itemlog}, 'created', 'DESC']]
  });
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

}

// Update one item.
export const updateOneItem = async (req, res) => {

}

// Delete one item.
export const deleteOneItem = async (req, res) => {
  
}