const Sequelize = require('sequelize');
const { Spec, Item } = require('../models');

module.exports = {
  getAllSpecs: async (req, res) => {
    try {
      const allSpecsData = await Spec.findAll({
        attributes: {
          include: [
            [Sequelize.literal('(SELECT COUNT(*) FROM item WHERE item.spec_id = spec.id)'), "total_records"],
            [Sequelize.literal('(SELECT COUNT(*) FROM item WHERE item.spec_id = spec.id AND item.status = "unopened")'), "total_unopened"],
            [Sequelize.literal('(SELECT COUNT(*) FROM item WHERE item.spec_id = spec.id AND item.status = "opened")'), "total_opened"],
            [Sequelize.literal('(SELECT COUNT(*) FROM item WHERE item.spec_id = spec.id AND item.status = "empty")'), "total_empty"]
          ]
        }
      });
      const allSpecs = allSpecsData;
      res.status(200).json(allSpecs);
    } catch (err) {
      res.status(500).json({message: `Internal Server Error: ${err.name}: ${err.message}`});
    }
  }
}