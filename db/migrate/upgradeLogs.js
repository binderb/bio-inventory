import path from 'path';
import * as url from 'url';
const __dirname = url.fileURLToPath(new URL('.', import.meta.url));
import { promises as fs } from 'fs';
import sequelize from '../../config/connection.js';
import { User, Speclog, Itemlog } from '../../models/index.js';

// LEGACY SUPPORT SCRIPT
// This script transforms the legacy "activity_log" column found in old versions of the Spec and Item models, extracting all the relevant information and mapping them to the new Speclog and Itemlog models.
// In order to use the script properly, follow these steps:
// 1. Blank out the database by running schema.sql.
// 2. Seed/structure the database using npm run seed.
// 3. Populate database with users, categories, locations, vendors, specs, and items using MySQL (need this to retrieve user ID's for foreign keys).
// 3. Export the old "activity_log" field from the legacy Spec and Item models, move the SQL files to this directory, and name them "spec_logs.sql" and "item_logs.sql", respectively.
// 4. Run this script using npm run upgradeLogs.

const upgradeLogs = async () => {
  await sequelize.sync({force: false});
  const specBody = await fs.readFile(path.resolve(__dirname,'spec_logs.sql'),'utf-8');
  // get spec logs
  const specPattern = /(?<=').*?\](?='\))/g;
  const specArray = Array.from(specBody.matchAll(specPattern));
  const specJSON = specArray.map(e => JSON.parse(e[0].replaceAll('\\','').replaceAll('model','spec')));
  const specLogs = [];
  for (let oldSpecLogArray of specJSON) {
    for (let oldSpecLog of oldSpecLogArray) {
      console.log(oldSpecLog);
      const userInitials = oldSpecLog.entry.split(' ')[0];
      const userData = await User.findOne({
        where: {
          initials: userInitials
        }
      });
      const specIDPattern = new RegExp(`(?<=\\()(.*?)(?=,.*${oldSpecLog.date})`,'g');
      const specID = specBody.match(specIDPattern)[0];
      const specLogBody = {
        user_id: userData.id,
        spec_id: specID,
        created: oldSpecLog.date,
        body: oldSpecLog.entry
      }
      specLogs.push(specLogBody);
    }
  }
  const newSpecLogs = Speclog.bulkCreate(specLogs);

  // get item logs
  const itemBody = await fs.readFile(path.resolve(__dirname,'item_logs.sql'),'utf-8');
  const itemPattern = /(?<=').*?\](?='\))/g;
  const itemArray = Array.from(itemBody.matchAll(itemPattern));
  const itemJSON = itemArray.map(e => JSON.parse(e[0].replaceAll('\\','').replaceAll('instance','item')));
  const itemLogs = [];
  for (let oldItemLogArray of itemJSON) {
    for (let oldItemLog of oldItemLogArray) {
      console.log(oldItemLog);
      const userInitials = oldItemLog.entry.split(' ')[0];
      const userData = await User.findOne({
        where: {
          initials: userInitials
        }
      });
      const itemIDPattern = new RegExp(`(?<=\\()(.*?)(?=,.*${oldItemLog.date})`,'g');
      const itemID = itemBody.match(itemIDPattern)[0];
      const itemLogBody = {
        user_id: userData.id,
        item_id: itemID,
        created: oldItemLog.date,
        body: oldItemLog.entry
      }
      itemLogs.push(itemLogBody);
    }
  }
  const newItemLogs = Itemlog.bulkCreate(itemLogs);
}

upgradeLogs();
