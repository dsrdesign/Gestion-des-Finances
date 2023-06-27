module.exports = (sequelize, DataTypes) => {
    return sequelize.define(
        "User", 
        {
            id: {
                type: DataTypes.INTEGER(11),
                primaryKey: true,
                autoIncrement: true
            },
            email : {
                type: DataTypes.STRING,
                allowNull: false,
                unique: {
                    msg: "L'email est deja pris"
                },
                validate: {
                    isEmail: {msg: 'Utilisez un email valide'},
                    notNull: {msg: "L'email est une propiete requise"}
                }
            },
            password: {
                type: DataTypes.STRING,
                allowNull: false,
                validate: {
                    notNull: {message: "Le mot de passe est une propiete requise"}
                }
            },
            name: {
                type: DataTypes.STRING
            },
            surname: {
                type: DataTypes.STRING
            },


        }
    )
}