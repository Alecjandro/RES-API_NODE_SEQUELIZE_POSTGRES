import { Sequelize } from 'sequelize';
import path from 'path';
import { fileURLToPath } from 'url';
import process from 'process';
import config from '../config/config.mjs'; // Importamos config.mjs como un módulo ES

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const env = process.env.NODE_ENV || 'development';
const dbConfig = config[env];

const db = {};

// Conectar Sequelize
let sequelize;
if (dbConfig.use_env_variable) {
  sequelize = new Sequelize(process.env[dbConfig.use_env_variable], dbConfig);
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, dbConfig);
}

// Leer modelos
const importModel = async (file) => {
  const modelModule = await import(path.join(__dirname, file));
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
};

// Cargar modelos dinámicamente
const loadModels = async () => {
  const files = (await import('fs')).readdirSync(__dirname)
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

await loadModels(); // Ejecuta la carga de modelos

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
