import Sequelize from 'sequelize';
import sequelize from '../config/connection.js';
import { Category, Item, Itemlog, Spec, Speclog, Location, Vendor } from '../models/index.js';
import { format_datetime } from '../utils/helpers.js';
import * as fs from 'fs';

// Get all specs.
export const getBioTrackerJSON = async (req, res) => {
  try {
    const allCategoriesData = await Category.findAll();
    const allSpecsData = await Spec.findAll();
    const allItemsData = await Item.findAll();
    const allVendorsData = await Vendor.findAll();
    const allLocationsData = await Location.findAll();
    const allSpecLogsData = await Speclog.findAll();
    const allItemLogsData = await Itemlog.findAll();
    const allData = {
      categories: allCategoriesData,
      specs: allSpecsData,
      items: allItemsData,
      vendors: allVendorsData,
      locations: allLocationsData,
      speclogs: allSpecLogsData,
      itemlogs: allItemLogsData
    }
    const json = JSON.stringify(allData);
    const filename = 'inventory-backup.json';
    fs.writeFile(filename, json, function (err, response) {
      res.download(filename);
      fs.rmSync(filename);
    });
  } catch (err) {
    res.status(500).json({message: `${err.name}: ${err.message}`});
  }
}