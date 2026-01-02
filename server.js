require('dotenv').config();
const express = require("express")
const app = express()

app.use(express.json({
  type: ["application/json"]
}))

app.use((err, req, res, next) => {
  console.error("🔥 JSON ERROR:", err.message)
  res.status(400).json({ message: "Invalid JSON body" })
})

const notesRouter = require("./routes/notes")
app.use("/notes", notesRouter)

const userRouter = require("./routes/users");
app.use("/users", userRouter);

app.use((err, req, res, next) => {
  console.error(err); 
  res.status(500).json({ message: err.message }); 
});

app.listen(3000, () => {
  console.log("Servidor corriendo en puerto 3000")
})



