const { db } = require("../db/sequelize")
const bcrypt = require('bcrypt')

module.exports = (app) =>{
    app.put('/api/user/update/:id', (req, res) =>{

        console.log("Le body :",req.body)
        let password
        if(req.body.password){
            bcrypt.hash(req.body.password, 10)
            .then(hash => {
                password = hash
            })
        }        

        db.User.update(
            {
                email: req.body.email, 
                password: password, 
                name: req.body.name, 
                surname: req.body.surname
            },
            
            {
            where: {id: req.params.id}
        })
        .then(user => {
            const message = "L'utilisateur a bien ete modifie"
            res.json({message, data: user})
        })
        .catch(error => {
            const message = "L'utilisateur n'a pas pu etre modifie. Reessayer dans quelques instants."
            res.status(500).json({message, data:error})
        })

    
        
        
    })
}