module.exports = (sequelize, DataTypes) =>{
    return sequelize.define(
        "Categorie",
        {
            id: { 
                type: DataTypes.STRING(5),
                primaryKey: true,
                unique: {
                    msg: "Ce code d'une categorie est unique"
                },
                allowNull: false
            },
            categorie: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {msg: "La categorie est requise"}
                }  
            },
            typeAction: {
                type: DataTypes.STRING,
                allowNull: false
            }
            
        },
        {
            timestamps: false,
            createAt: false,
            updateAt: false
        }
    )
}