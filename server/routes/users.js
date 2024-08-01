const express = require("express");
const router = express.Router();
const {signup,login,getAllUsers,editUserById,deleteUserById} = require("../controllers/users")
const {requireAdminAuth} = require("../middleware/requireAuth")

router.post("/signup", signup);
router.post("/login", login);
router.get("/",requireAdminAuth, getAllUsers);//admin only
router.delete("/:id",requireAdminAuth,deleteUserById);//admin only
router.put("/:id",requireAdminAuth ,editUserById);//admin only

module.exports = router;