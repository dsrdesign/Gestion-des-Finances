module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Revenu",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true,
            },
            nom: {
                type: DataTypes.STRING,
                allowNull: false,
            },
            categorie:{
                type: DataTypes.STRING,
                allowNull: false,
            },
            montant: {
                type: DataTypes.INTEGER,
                allowNull: false,
            },
            date: {
                type: DataTypes.STRING,
                allowNUll: true,
                defaultValue: DataTypes.NOW
            },
            description: {
                type: DataTypes.STRING,
                defaultValue: "Aucune description",
                allowNull: true,
            }
            
        },
        {
            timestamps: false,
            createAt: false,
            updateAt: false
        }
    )
}