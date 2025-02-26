

export default {
  development: {
    username: "postgres",
    password: "postgres",
    database: "inventarios",
    host: "127.0.0.1",
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
    use_env_variable: "DATABASE_URL",// Nombre más claro
    dialect: "postgres",
    dialectOptions: {
      ssl: {
        require: true,
        rejectUnauthorized: false
      }
    }
  }
};
