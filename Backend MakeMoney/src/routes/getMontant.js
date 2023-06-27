const { db } = require("../db/sequelize")

module.exports = (app) => {
    app.get('/api/montants', (req, res) =>{

        db.Detail.findAll(
            {
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
    })
}