const { ValidationError } = require("sequelize")
const { db } = require("../db/sequelize")
const categorie = require("../models/categorie")

// Depense = db.Depense

module.exports = (app) => {
    app.post('/api/depenses/creat', (req, res) => {
        db.Depense.create(
        {
            userId: req.body.userId,
            categorie: req.body.categorie,
            nom: req.body.nom,
            montant: req.body.montant,
            date: req.body.date,
            description: req.body.description
        })
        .then(depense=> {
            const message = "Une depense a ete avec success"
            return res.json({message, data: depense})
        })
        .catch(error => {
            const message = "Oups un erreur c'est produite"
            return res.status(400).json({message, data: error})
        })
    }),
    app.post('/api/depenses/create/', (req, res) => {
        db.Categorie.findOne({
            where: {id: req.body.categorie}
        })
        .then(categorie=> {
            db.Action.create(
            {
                action: req.body.nom,
                codeCat: categorie.id
            })
            .then(action => {
                db.Detail.create(
                {
                    montant: req.body.montant,
                    date: req.body.date,
                    description: req.body.description,
                    ActionId: action.id,
                    UserId: req.query.userId
                })
                .then(detail => {
                    const message = "Une depense a ete cree avec success"
                    return res.json({message, data: detail})
                })
                .catch(error => {
                    if(error instanceof ValidationError)
                    {
                        return res.status(404).json({message: error.message, data:error})
                    }
                })
    
    
            })
            .catch(error => {
                if(error instanceof ValidationError)
                {
                    return res.status(404).json({message: error.message, data:error})
                }
            })
            // .then(detail => {
            //     const message = "Une depense a ete cree avec success"
            //     return res.json({message, data: detail})
            // })
            // .catch(error => {
            //     if(error instanceof ValidationError)
            //     {
            //         return res.status(404).json({message: error.message, data:error})
            //     }
            // })


            
        })
        .catch(error => {
            const message = "Oups un erreur c'est produite"
            return res.status(400).json({message, data: error})
        })
    })
}