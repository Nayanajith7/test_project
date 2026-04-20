import express from "express";
import { loginUser,createUser,getUser,deleteUser,updateUser } from "../controller/userController.js";

const router=express.Router();

router.post("/register", createUser);
router.get("/users", getUser);
router.put("/user/:id", updateUser);
router.delete("/user/:id", deleteUser);
router.post("/login",loginUser);


export default router;