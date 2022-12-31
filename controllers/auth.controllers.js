const db = require("../db/db");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const asyncHandler = require("express-async-handler");
const apiError = require("../utils/apiError");




// inscréption
const register = asyncHandler(async (req, res, next) => {
  const {username,email,password,role,nombre_convives,phone} = req.body
  // 1 verifier si l'email existe deja?
  const countEmail = await db.query(
    "SELECT count(email) as number FROM users WHERE email=?",
    [req.body.email]
  );
  if (countEmail[0].number > 0) {
   
    return next(
      new apiError(
        "cet email existe deja, veillez saisir un nouveau email",
        400
      )
    );
  }

  // 2 cryptage de mot de passe

  const hash = await bcrypt.hash(password, 10);


  // creer user
  await db.query(
    "INSERT INTO users (username,email,password,role,nombre_convives,phone) VALUES (?,?,?,?,?,?)",
    [username,email,hash,role,nombre_convives,phone]
  );

  const user = await db.query("SELECT * FROM users WHERE email=?", [email])
  
  // generer un token
  const token = jwt.sign({userId:user[0].id},process.env.JWT_SECRET_KEY,{
    expiresIn: process.env.JWT_EXPIRATION
  })
    res.status(201).json({ data:user,token });
});


// connextion 
const login = asyncHandler(async (req, res,next) => {
  const {email,password} = req.body

  const user = await db.query("SELECT * FROM users WHERE email=?", [
    email
  ]);
  console.log(user[0])
  
  if (!user[0]) {
    const message = "L'utilisateur demandée n'existe pas";
    return next(new apiError(message), 404);
  }
  
  const isPasswordValid = await  bcrypt.compare(password, user[0].password)

    console.log(isPasswordValid)
    if(!isPasswordValid) {
      const message = "Email ou mot de passe  est incorrecte."
       return res.status(404).json({ message })
       
    }else{
      // jwt
      const token = jwt.sign({userId:user[0].id},process.env.JWT_SECRET_KEY,{
        expiresIn: process.env.JWT_EXPIRATION
      })
      const message = `L'utilisateur a été connecté avec succès`;
       return res.json({ message, data:user,token })
    }
  
  
  
  
});


// verifier token (autorisation)
const authorisation = (...myRole)=>{
return asyncHandler(async (req,res,next) => {
  // recuperation si le token existe dans header
  const authorizationHeader = req.headers.authorization
  
  if(!authorizationHeader) {
    const message = `Vous n'avez pas fourni de jeton d'authentification. Ajoutez-en un dans l'en-tête de la requête.`
    return next(new apiError(message), 401) 
  }
    
  // recupération token et le vérifier 
    const token = authorizationHeader.split(' ')[1]

    jwt.verify(token, process.env.JWT_SECRET_KEY, async (error, decodedToken) => {
      if(error) {
        const message = `L'utilisateur n'est pas autorisé à accèder à cette ressource.`
        return res.status(401).json({ message, data: error })
      }else{
        const userId = decodedToken.userId
        const currentUser = await db.query("SELECT * FROM users WHERE id=?",[userId])
        if(!currentUser[0]) {
          const message = `L'utilisateur n'existe pas pour ce token.`
          return next(new apiError(message), 401)
        }    
        if(!myRole.includes(currentUser[0].role)) {
          return next(new apiError("vous n'etes pas autorisé a éffectué cette tache"), 403) 
              
        }              
        next()
      }
   
 
        

      
})


})}

module.exports = {
  register,
  login,
  authorisation
}
