const express = require('express');
const router = express.Router();

const userController = require('../controller/userController')


router.post("/register", userController.createUser)
router.post("/login", userController.loginUser)
router.get("/getUser", userController.getUser)
router.put("/updateUser",userController.updateUser)
router.delete("/deleteUser", userController.deleteUser)


module.exports=router;
