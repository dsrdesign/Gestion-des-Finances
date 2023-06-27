const { db } = require("../db/sequelize")

module.exports = (app) => {
    app.delete('/api/deleteAction/:id', (req, res) =>{
        console.log("Mon Id: ", req.params.id)
        db.Action.destroy({
            where: {id: req.params.id}
        })
        .then(action => {
            const message = `L'action a bien ete supprime`
            res.json({message, data: action})
        })
        .catch(error => {
            const message ="Une erreur lors de la suppresion"
            res.status(400).json({message, data: error})
        })
    })
}