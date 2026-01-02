const prisma = require("../prisma");

async function createUser(req, res) {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ message: "Ocupo los 2 carnal" });
  }
  try {
    const newUser = await prisma.user.create({
      data: { name, email }
    });
    res.status(201).json(newUser);
  }  catch (error) {
    next(error); 
}
}

async function getUsers(req, res) {
  try {
    const { by, value } = req.query

    if (Object.keys(req.query).length===0) {
      const users = await prisma.user.findMany()
      return res.json(users)
    }

    if (!by || !value) {
      return res.status(400).json({ message: "by and value are required" })
    }

    let where

    switch (by) {
      case "id": {
        const id = Number(value)
        if (!Number.isInteger(id)) {
          return res.status(400).json({ message: "invalid id" })
        }
        where = { id }
        break
      }

      case "email":
        where = { email: value }
        break

      default:
        return res.status(400).json({ message: `"by" must be id or email` })
    }

    const user = await prisma.user.findUnique({ where })

    if (!user) {
      return res.status(404).json({ message: "user not found" })
    }

    res.json(user)
  }  catch (error) {
    next(error); 
}
}

async function updateUser(req,res) {
  const id = Number(req.params.id);

  const {name,email}= req.body;  

  if(!Number.isInteger(id)){
    return res.status(404).json({message:"invalid id"})
  }
  
  try {
    const user = await prisma.user.findUnique({
       where: { id } 
    });

    if (!user) {
      return res.status(404).json({ message: "user not found" });
    }

    const updatedUser = await prisma.user.update({
      where: { id },
      data: {
        ...(name !== undefined && { name }),
        ...(email !== undefined && { email })
      }
    });
    
    res.status(200).json(updatedUser);
  } 
   catch (error) {
    next(error); 
}
  
}

async function deleteUser(req,res) {
  const id = Number(req.params.id);

  if(!Number.isInteger(id)){
    return res.status(404).json({message:"invalid id"})
  }
  try{
    const userDelete= await prisma.user.findUnique({
      where:{id}
    })

    if(!userDelete){
     return res.status(404).json({message:"user not found"})
    }

    await prisma.user.delete({
      where:{id}
    })

    res.status(200).json({message: "successfully deleted user"})
  }
   catch (error) {
    next(error); 
}
}

async function userNotesById(req,res) {
  const id = Number(req.params.id)

  if(!Number.isInteger(id)){
    return res.status(404).json({message:"invalid id"})
  }

  try{
    const notes= await prisma.user.findUnique({
      where:{id}
    })

    if(!notes){
     return res.json({message:"user not found"})
    }

    const notesWithUser= await prisma.note.findMany({
      where: {userId:id},
      include:{user:true} 
    })

    res.status(200).json(notesWithUser);
    
  }
   catch (error) {
    next(error); 
}

}

module.exports = { 
  createUser,
  getUsers,
  updateUser,
  deleteUser,
  userNotesById
 };
