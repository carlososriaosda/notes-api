
function createNote (req,res,next){
    const{title,content,userId}= req.body;

    if((!title||!content||!userId)){
       return res.json({message: "title,content and userId is required"})
    }
    next();
}

function updatedNote(req, res, next) {
  const { title, content, userId } = req.body;

  if (!title && !content && !userId) {
    return res.status(400).json({ message: "title, content, or userId is required" });
  }
  next();
}

module.exports={
    createNote,
    updatedNote,
}