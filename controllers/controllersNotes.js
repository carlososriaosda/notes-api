const prisma = require("../pris");

async function getNote(req,res) {
const {by,value}= req.query;
  
  if (Object.keys(req.query).length===0) {
      const notes = await prisma.note.findMany()
      return res.json(notes)
    }


let where ={}

  switch(by){
    case"id":    
      const id = Number(value)
      if(!Number.isInteger(id)){
       return res.json({message:"invalid id"})
      }
      where= {id}
      break ;
    
    default:
     return res.json({message:`"by" must be ID or title`})
      
     
  }

try{
    const note = await prisma.note.findUnique({
      where
    })
    if(!note){
      return res.json({message:"note not found"})
    }
    res.status(200).json(note)
  }
  catch (error) {
    next(error); 
}
}  

async function createNote(req, res) {
  const { title, content, userId } = req.body;

  try {
    const newNote = await prisma.note.create({
      data: { title, content, userId }
    })

    res.status(201).json(newNote) // devuelve la nota creada
  } 
  catch (error) {
    next(error); 
}
}

async function updateNote(req,res) {
  const id = Number(req.params.id);

  const {title,content,userId}= req.body;  

  if(!Number.isInteger(id)){
    return res.status(404).json({message:"invalid id"})
  }
  
  try{
    
    const note = await prisma.note.findUnique({
      where: {id}
    })
    
    if(!note){
      return res.status(404).json({message: "note not found"})
    }
    const updatedNote= await prisma.note.update({  
      where:{id},
      data:{title,content,userId}
    })
    res.status(200).json(updatedNote)
  }
  catch (error) {
    next(error); 
}
  
}

async function deleteNote(req,res) {
  const id = Number(req.params.id);

  if(!Number.isInteger(id)){
    return res.status(404).json({message:"invalid id"})
  }
  try{
    const noteDelete= await prisma.note.findUnique({
      where:{id}
    })
    if(!noteDelete){
     return res.status(404).json({message:"note not found"})
    }
    await prisma.note.delete({
      where:{id}
    })
    res.status(200).json({message: "successfully deleted note"})
  }
   catch (error) {
    next(error); 
}
  
  
}


module.exports = {
    getNote,
    createNote,
    updateNote,
    deleteNote
     }
