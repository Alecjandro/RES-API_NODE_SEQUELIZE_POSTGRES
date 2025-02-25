import { Model, DataTypes } from 'sequelize';

export default (sequelize) => {
  class Proveedor extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Proveedor.hasMany(models.Producto, {
        foreignKey: 'proveedor_id',
        as: 'productos',
      });
    }
  }

  Proveedor.init(
    {
      nombre: DataTypes.STRING,
      contacto: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Proveedor',
      tableName: 'proveedores',
    }
  );

  return Proveedor;
};