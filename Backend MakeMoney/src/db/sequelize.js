const {Sequelize, DataTypes} = require('sequelize')
const bcrypt = require('bcrypt')

const UserModel = require('../models/user')
const DepenseModel = require('../models/depenses')
const RevenuModel = require('../models/revenus')
const ActionModel = require('../models/action')
const DetailModel = require('../models/detailAction')
const CategorieModel = require('../models/categorie')

let users = require('./mock-users')
let depenses = require('./ mock-depenses')
let revenus = require('./mock-revenus')
let details = require('./mock-detail')
let actions = require('./mock-action')
let categories = require('./mock-categorie')




const sequelize = new Sequelize('finance', 'root', '', {
    host: 'localhost',
    dialect: 'mariadb',
    dialectOptions: {
        timezone: 'Etc/GMT-2',
    },
    logging: true
})

// Revenu = RevenuModel(sequelize, DataTypes)
// Action = ActionModel(sequelize, DataTypes)
// Categorie = CategorieModel(sequelize, DataTypes)
// Detail = DetailModel(sequelize, DataTypes)

const db = {}

db.sequelize = sequelize
db.User = UserModel(sequelize, DataTypes)
// db.Depense = DepenseModel(sequelize, DataTypes)
db.Action = ActionModel(sequelize, DataTypes)
db.Categorie = CategorieModel(sequelize, DataTypes)
db.Detail = DetailModel(sequelize, DataTypes)

// db.User.hasMany(db.Depense, {foreignKey: 'userId'})
// db.Depense.belongsTo(db.User, {foreignKey: 'userId'})


db.User.belongsToMany(db.Action, {through: db.Detail})
db.Action.belongsToMany(db.User, {through: db.Detail})

db.Action.hasMany(db.Detail)
db.Detail.belongsTo(db.Action)

db.User.hasMany(db.Detail)
db.Detail.belongsTo(db.User)

db.Categorie.hasMany(db.Action, {foreignKey: 'codeCat'})
db.Action.belongsTo(db.Categorie, {foreignKey: 'codeCat'})


// db.sequelize.sync({alter: true})

// const Depense = DepenseModel(sequelize, DataTypes)
// const User = UserModel(sequelize, DataTypes)


const initDb = () => {
    return sequelize.sync({alter: true}).then(_ => {
        
        // users.map(user => {
        //     bcrypt.hash(user.password, 10)
        //     .then(hash => db.User.create({
        //         email: user.email, 
        //         password: hash, 
        //         name: user.name, 
        //         surname: user.surname
        //     }))
        //     // .then(user => console.log(user.toJSON()))
        // }),

        // depenses.map(depense => {
        //     db.Depense.create({
        //         nom: depense.nom,
        //         categorie: depense.categorie,
        //         montant: depense.montant,
        //         description: depense.description,
        //         date: depense.date,
        //         userId: 1
        //     })
        //     // .then(depense => console.log(depense.toJSON()))
        // }),

        // revenus.map(revenu => {
        //     Revenu.create({
        //         nom: revenu.nom,
        //         categorie: revenu.categorie,
        //         montant: revenu.montant,
        //         description: revenu.description,
        //         date: revenu.date
        //     })
        //     // .then(revenu => console.log(revenu.toJSON()))
        // }),

        // actions.map(action => {
        //     Action.create({
        //         action: action.action,
        //         codeCategorie: action.codeCategorie
        //     })
        //     // .then(revenu => console.log(revenu.toJSON()))
        // }),

        // details.map(detail => {
        //     Detail.create({
        //         montant: detail.montant,
        //         description: detail.description,
        //         date: detail.date,
        //         idAction: detail.idAction,
        //         emailUser: detail.emailUser
        //     })
        //     // .then(revenu => console.log(revenu.toJSON()))
        // }),

        // categories.map(categorie => {
        //     db.Categorie.create({
        //         id: categorie.id,
        //         categorie: categorie.categorie,
        //         typeAction: categorie.typeAction,
        //     })
        //     // .then(revenu => console.log(revenu.toJSON()))
        // }),
        console.log('La base de donne a bien ete initialisee !')

    })
}

module.exports = {
    initDb, db
}