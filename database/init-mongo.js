db = db.getSiblingDB(process.env.MONGO_INITDB_DATABASE);
db.dropDatabase();

// Import seed data
load("/seed-data/seed.js");
