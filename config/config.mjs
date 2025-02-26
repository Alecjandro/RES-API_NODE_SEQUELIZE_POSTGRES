export default {
  development: {
    username: "postgres",
    password: "postgres",
    database: "inventarios",
    host: "db",
    dialect: "postgres"
  },
  test: {
    username: "postgres",
    password: "postgres",
    database: "database_test",
    host: "db",
    dialect: "postgres"
  },
  production: {
    use_env_variable: process.env.DATABASE_URL, // Render proporciona esta variable
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
