import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';
import fs from 'fs/promises'; // Importar fs/promises correctamente
import config from '../config/config.mjs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const db = {};

// Conectar Sequelize
let sequelize;
if (env === 'production') {
  if (!dbConfig.database_url) {
    throw new Error("DATABASE_URL no está definida en las variables de entorno.");
  }
  sequelize = new Sequelize(dbConfig.database_url, {
    dialect: dbConfig.dialect,
    dialectOptions: dbConfig.dialectOptions,
  });
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect
  });
}

// Función para importar modelos
const importModel = async (file) => {
  const modelModule = await import(path.join(__dirname, file));
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
};

// Cargar modelos dinámicamente
const loadModels = async () => {
  const files = (await fs.readdir(__dirname))
    .filter(file => file.endsWith('.js') && file !== 'index.js');

  for (const file of files) {
    await importModel(file);
  }

  // Asociar modelos si tienen la función `associate`
  Object.keys(db).forEach(modelName => {
    if (db[modelName].associate) {
      db[modelName].associate(db);
    }
  });
};

await loadModels();

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
