const { DataTypes } = require("sequelize");
// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define(
    "banner",
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      image: {
        type: DataTypes.STRING,
        allowNull: false,
      },
      endAt: {
        type: DataTypes.STRING,
      },
      startAt: {
        type: DataTypes.STRING,
      },
      status: {
        type: DataTypes.BOOLEAN,
      },
    },
    { timestamps: false }
  );
};
