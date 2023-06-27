const { where } = require("sequelize")
const { db } = require("../db/sequelize")
const categorie = require("../models/categorie")

// Depense = db.Depense

module.exports = (app) => {
    app.get('/api/depenses', (req, res) => {

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
        .then(details => {
          const message = "La liste a ete bien recupere !"
          res.json({message, data:details})

        })

      // if(req.query.userId){

      //   const userId = req.query.userId
      //   const typeAction = req.query.typeAction
      //   const actio = []
      //   console.log("Mon userId: ",userId)
      //   console.log("TypeAction: ",typeAction)

      //   db.Categorie.findAll(

      //   //   {
      //   // //   include: [
      //   // //     // {
      //   // //     //   model: db.Action,
      //   // //     //   // include: {
      //   // //     //   //   model: db.Categorie,
      //   // //     //   //   where: {typeAction: typeAction}
      //   // //     //   // }
      //   // //     // },
      //   // //     {
      //   // //       model: db.User,
      //   // //       where: {id: userId} 
      //   // //     }
      //   // // ]
      //   //   // where: {codeCat: 'tran'}
      //   // }

      //   )
      //   .then(
      //     details => {
      //       // const idActions = []
      //       // console.log("Taille: ",actions.length)
      //       // console.log("Notre id: ",actions[0].id)
            
      //       // for (let i = 0; i < actions.length; i++) {
      //       //   idActions[i] = actions[i].id;
              
      //       // }
      //       // console.log(idActions);
      //       // for (const idAction of idActions) {
      //       //   db.Detail.findAll({
      //       //     include: 
      //       //       [
      //       //         {model: db.Action, where: {id: idAction}},
      //       //         {model: db.User, where: {id: userId}}
      //       //       ]
      //       //   })
      //       //   .then(details=> {
      //       //     console.log("Nos details sont: ",details);
      //       //   })
      //       //   .catch(error => {
      //       //      console.log("Erreur lors de la recuperation des detail: ", error)
      //       //   })
      //       // }
      //       console.log("Mes details: ", details[0].Action.Categorie.categorie);
      //       const message = 'La liste des depenses a bien été récupérée.'
      //       res.json({ message, data: details })
      //     }
      //   )
      //   .catch(error => {
      //     const message = "La liste de depense n'a pas pu etre recupere"
      //     res.status(400).json({message, data: error})
      //   })


      // }else{
      //   console.log("Il y'a pas de userId")
      // }

        
    })
}