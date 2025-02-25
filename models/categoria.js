import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Categoria extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file llamará esta función automáticamente.
     */
    static associate(models) {
      Categoria.hasMany(models.Producto, {
        foreignKey: 'categoria_id',
        as: 'productos'
      });
    }
  }

  Categoria.init(
    {
      nombre: DataTypes.STRING
    },
    {
      sequelize,
      modelName: 'Categoria',
      tableName: 'categorias',
    }
  );

  return Categoria;
};
