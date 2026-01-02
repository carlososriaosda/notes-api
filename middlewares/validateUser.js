function createUser (req,res,next){
    const{name,email}= req.body;

    if((!name||!email)){
       return res.json({message: "name and email is required"})
    }
    next();
}

function updatedUser(req, res, next) {
  const { name,email } = req.body;

  if (!name && !email) {
    return res.status(400).json({ message: "name or email is required" });
  }
  next();
}

module.exports={
    createUser,
    updatedUser
}