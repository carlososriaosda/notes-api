const express = require("express")
const router = express.Router()
const validate= require("../middlewares/validateNote");
const controllersNotes= require("../controllers/Notes")

router.get("/", controllersNotes.getNote);
router.post("/",validate.createNote,controllersNotes.createNote);
router.put("/:id",validate.updatedNote,controllersNotes.updateNote);
router.delete("/:id",controllersNotes.deleteNote);


module.exports = router

