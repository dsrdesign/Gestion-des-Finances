const { ValidationError, UniqueConstraintError } = require("sequelize")
const bcrypt = require('bcrypt')
const { db } = require("../db/sequelize")




module.exports = (app) => {
    app.post('/api/sign', (req, res) => {
        bcrypt.hash(req.body.password, 10)
        .then(hash => {
            db.User.create(
            {
                email: req.body.email, 
                password: hash, 
                name: req.body.name, 
                surname: req.body.surname
            })
            .then(user => {
                const message = "Un utilisateur a ete cree"
                return res.json({message,data: user})
            })
            .catch(error => {
                if(error instanceof ValidationError)
                {
                    return res.status(404).json({message: error.message, data:error})
                }else if(error instanceof UniqueConstraintError)
                {
                    return res.status(410).json({message: error.message, data:error})
                }

                
            })
        })
        .catch(error => {
            const message = "L'utilisateur n'a pa pu etre cree veuillez reessayer plustard"
            return res.status(415).json({message, data: error})
        })
        
    })
}