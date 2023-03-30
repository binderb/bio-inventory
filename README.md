# bio-inventory
Full-stack web application that employs Node.js/Express, Sequelize, and Handlebars to manage consumable inventory in a biomedical lab setting. Users maintian a library of item "specs", from which individual item "instances" can be created and updated as they are used and replenished. 

Key Features: 
- Authenticated logins with multiple privilege levels.
- Generation and scanning of QR codes for inventory items, so that physical items can be paired with their inventory entries.
- Logging for all system changes, enabling easy tracking.
- Flexible, hierarchical location models for easy tracking of items within a workspace.
- Organization of vendor data.

## Usage

This app requires Node.js, as well as a running instance of MySQL. To deploy, pull down the repo and provide login credentials for an authorized MySQL user in a `.env` file. Then, start the server with `npm run start`.

To add custom branding to the UI, add a `logo.png` file to the `/public/images/` directory.

## Credits

All code for this project was written by the developer.

## License

Please refer to the LICENSE in the repo.
