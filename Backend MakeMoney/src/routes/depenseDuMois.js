const { where } = require("sequelize")
const { db } = require("../db/sequelize")
const {Op} = require('sequelize')
const categorie = require("../models/categorie")

// Depense = db.Depense

module.exports = (app) => {
    app.get('/api/actionsMois', (req, res) => {

        db.Detail.findAll(
            {
                where: {
                    date : {
                        [Op.gte]: '2023-04-01', 
                        // $gt: new Date(new Date('2023-01-01') - 24 * 60 * 1000)
                    }
                },
                include: [
                    {
                    model: db.Action,
                    include: {
                        model: db.Categorie,
                        where: {typeAction: req.query.typeAction},
                    },
                    required: true
                    },
                    {
                    model: db.User,
                    where: {id: req.query.userId}

                    }
                    
                    
                ]
            
            }
        )
        .then(details => {
            let somme = 0
          
          for (let i = 0; i < details.length; i++) {
            somme += details[i].montant;
            console.log("La somme est: ", somme)
          }
          console.log("Somme totale est : ", somme);
          
          const message = "La somme est :"
          res.json({message, data:somme})

        })
        
    })
}