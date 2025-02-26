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
  const databaseUrl = process.env.DATABASE_URL; // Se usa directamente la variable de entorno
  if (!databaseUrl) {
    throw new Error("DATABASE_URL no está definida en las variables de entorno.");
  }
  sequelize = new Sequelize(databaseUrl, {
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false,
      },
    },
  });
} else {
  sequelize = new Sequelize(dbConfig.database, dbConfig.username, dbConfig.password, {
    host: dbConfig.host,
    dialect: dbConfig.dialect,
  });
}

// Función para importar modelos
const importModel = async (file) => {
  const modelModule = await import(`file://${path.resolve(__dirname, file)}`);
  const model = modelModule.default(sequelize, Sequelize.DataTypes);
  db[model.name] = model;
};

// Cargar modelos dinámicamente
const loadModels = async () => {
  try {
    const files = (await fs.readdir(__dirname)).filter(
      (file) => file.endsWith('.js') && file !== 'index.js'
    );

    for (const file of files) {
      await importModel(file);
    }

    // Asociar modelos si tienen la función `associate`
    Object.keys(db).forEach((modelName) => {
      if (db[modelName].associate) {
        db[modelName].associate(db);
      }
    });
  } catch (error) {
    console.error("Error al cargar modelos:", error);
    throw error;
  }
};

// Llamar a loadModels correctamente en una función asíncrona
const initDB = async () => {
  await loadModels();
};

await initDB(); // Ejecutar inicialización correctamente

db.sequelize = sequelize;
db.Sequelize = Sequelize;

export default db;
