const {db} = require('../db/sequelize')
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (app) => {
    app.post('/api/login', (req, res) => {

        db.User.findOne({ where: { email: req.body.email}})
        .then(user => {

            if(!user){
                const message = "L'utilisateur n'existe pas"
                return res.status(404).json({message})
            }

            bcrypt.compare(req.body.password, user.password)
            .then(isPasswordValid => {
                if(!isPasswordValid){
                    const message = "Mot de passe incorrecte";
                    return res.status(401).json({message})
                }


                // JWT
                const token = jwt.sign(
                    {userId: user.id},
                    privateKey,
                    {expiresIn: '24h'}
                )

                const message = "L'utilisateur a ete conecte avec sucess"
                return res.json({message, data: user, token})

            })
            .catch(error => {
                const message = "Mot de passe ou nom d'utilisateur eronee"
                return res.status(400).json({message, data: error})
            })
        })
        .catch(error => {
            const message = "L'utilisateur n'a pas pu etre connecte. Reessayer dans quelques instants"
            return res.status(404).json({message, data: error})
        })
        
    })
}