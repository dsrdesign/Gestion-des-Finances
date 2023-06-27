const { db } = require("../db/sequelize")

module.exports = (app) => {
    app.get('/api/user/:id', (req, res) => {
        db.User.findByPk(req.params.id)
            .then(user =>{
                if(user === null){
                    const message = "Cette utilisateur n'hesite pas"
                    return res.status(404).json({message})
                }
                const message = "L'utilisateur a bien ete rectouve !"
                res.json({message, data:user})
            })
            .catch(error =>{
                const message = "Oups erreur l'utilisateur n'a pas pu etre recupere.Reesayer dans quelques instants "
                res.status(400).json({message, data: error})
            })
    })
}