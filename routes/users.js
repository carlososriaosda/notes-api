const express = require("express");
const router = express.Router();
const validate= require("../middlewares/validateUser");
const controllersUsers= require("../controllers/Users");

router.get("/:id/notes",controllersUsers.userNotesById);
router.get("/",controllersUsers.getUsers);
router.post("/",validate.createUser,controllersUsers.createUser);
router.put("/:id",validate.updatedUser,controllersUsers.updateUser);
router.delete("/:id",controllersUsers.deleteUser);
 

module.exports = router;
