module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Action",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
                allowNull: false,
                validate: {
                    notNull: {msg: "L'id est requis"}
                }
            },
            codeCat: {
                type: DataTypes.STRING(5),
                allowNull: false,
                validate: {
                    notNull: {msg: "La cctegorie est requis"}
                }
            },
            action: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: "L'action est requis"}
                }
            }
            
        },
        {
            timestamps: false,
            createAt: false,
            updateAt: false
        }
    )
}