const { SQLContext } = require("rey-common");
const { Model, DataTypes } = SQLContext.getORMProvider();

class Article extends Model {}

Article.init(
  {
    id: {
      type: DataTypes.BIGINT,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    author_id: {
      type: DataTypes.BIGINT,
      allowNull: false,
    },
    title: {
      type: DataTypes.STRING(255),
      allowNull: false,
    },
    content: {
      type: DataTypes.TEXT,
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
    paranoid: true, //soft-delete
    underscored: true, //snake_case
    tableName: "article",
  }
);

Article.associate = (models) => {
  Article.belongsTo(models.Author, {
    as: "author",
  });
};

module.exports = Article;
