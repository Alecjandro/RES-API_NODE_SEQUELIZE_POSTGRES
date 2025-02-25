import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Producto extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Producto.belongsTo(models.Proveedor, {
        foreignKey: 'proveedor_id',
        as: 'proveedores',
      });

      Producto.belongsTo(models.Categoria, {
        foreignKey: 'categoria_id',
        as: 'categorias',
      });
    }
  }

  Producto.init(
    {
      nombre: DataTypes.STRING,
      cantidad: DataTypes.INTEGER,
      precio:DataTypes.DECIMAL,
      categoria_id: DataTypes.INTEGER,
      proveedor_id: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Producto',
      tableName: 'productos',
    }
  );

  return Producto;
};