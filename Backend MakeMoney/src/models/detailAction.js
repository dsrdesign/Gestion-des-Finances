module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "Detail",
        {
            id: {
                type: DataTypes.INTEGER,
                primaryKey: true,
                autoIncrement: true
            },
            montant: {
                type: DataTypes.INTEGER,
                allowNull: false,
                validate: {
                    notNull: {msg: "Le montant est requis"}
                }
            },
            date: {
                type: DataTypes.DATEONLY,
                allowNull: false,
                validate: {
                    notNull: {message: "La date est requis"}
                }
            },
            description: {
                type: DataTypes.STRING,
                defaultValue: "Aucune description",
                allowNull: true
            },
            // actionId: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false
            // },
            // userId: {
            //     type: DataTypes.INTEGER,
            //     allowNull: false
            // }

        },
        {
            timestamps: false,
            createAt: false,
            updateAt: false
        }

    )
}