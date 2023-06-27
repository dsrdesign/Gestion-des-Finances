module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Depense",
        {
            id: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true
            },
            userId: {
                type: DataTypes.INTEGER(11),
                allowNUll: false,
                
            },
            nom: {
                type: DataTypes.STRING,
                allowNull: false
            },
            categorie:{
                type: DataTypes.STRING,
                allowNull: false
            },
            montant: {
                type: DataTypes.INTEGER,
                allowNull: false
            },
            date: {
                type: DataTypes.DATE,
                allowNUll: false
            },
            description: {
                type: DataTypes.STRING,
                defaultValue: "Aucune description",
                allowNull: true
            }
            
        },
        {
            timestamps: false,
            createAt: false,
            updateAt: false
        }
    )
}