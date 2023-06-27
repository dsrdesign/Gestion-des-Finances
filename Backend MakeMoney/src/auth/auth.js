const jwt = require('jsonwebtoken')
const privateKey = require('../auth/private_key')

module.exports = (req, res, next) => {
    const authorizationHeader = req.headers.authorizationHeader

    if(!authorizationHeader){
        const message = "Vous n'avez pas fourni de jeton d'authentification"
        return res.status(401).json({message})
    }

    const token = authorizationHeader.split(' ')[1]
    const decodedToken = jwt.verify(token, privateKey, (error, decodedToken) => {
        if(error){
            const message = "L'utilisateur n'est pas autorise a acceder a cette ressource"
            return res.status(401).json({message, data: error})
        }

        const userId = decodedToken.userId
        if(req.body.userId && req.body.userId !== userId){
            const message = "L'identifiant de l'utilisateur est invalide."
            res.status(401).json({message})
        }else{
            next()
        }
    })
}