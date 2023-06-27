const { where } = require("sequelize")
const { db } = require("../db/sequelize")

// Depense = db.Depense

module.exports = (app) => {
    app.get('/api/categorie', (req, res) => {

      db.Categorie.findAll(

        {
            where: {typeAction: req.query.typeAction}
        }
      )
        .then(categories => {
          const message = "La liste des categorie a ete bien recupere !"
          res.json({message, data:categories})

        })
        
    })
}