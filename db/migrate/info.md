Earlier production versions of this software used a different database schema; these tools can help extract and reformat old data.

Strategy:
- Seed the database using legacy database backups (must update column names manually).
- Run the upgradeLogs script to parse the legacy backups in this directory ("spec_logs.sql" and "item_logs.sql", containing dumped rows from a query that selects the primary key and the legacy "activity_log" column) and insert proper fields into the new schema.