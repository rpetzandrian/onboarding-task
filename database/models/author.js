const { SQLContext } = require("rey-common");

const { Model, DataTypes } = SQLContext.getORMProvider();

class Author extends Model {}

Author.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    name: {
      type: DataTypes.STRING(100),
      allowNull: false,
    },
    created_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    updated_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
    deleted_at: {
      type: DataTypes.DATE,
      allowNull: true,
    },
  },
  {
    sequelize: SQLContext.getContext(),
    underscored: true,
    paranoid: true,
    tableName: "author",
  }
);

Author.associate = (models) => {
  Author.hasMany(models.Article, {
    as: "article",
    foreignKey: "author_id",
  });
};

module.exports = Author;
