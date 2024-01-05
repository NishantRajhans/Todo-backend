const express= require('express');
const router=express.Router();
const {createTodo,getTodo,getAllTodo,updateTodo,deleteTodo}=require("../controllers/todo")
const {AuthMiddleWare}=require("../middleware/auth");
router.get("/getTodo/:id",AuthMiddleWare,getTodo);
router.get("/getAllTodo",AuthMiddleWare,getAllTodo);
router.delete("/deleteTodo/:id",AuthMiddleWare,deleteTodo);
router.post("/createTodo",AuthMiddleWare,createTodo);
router.put("/updateTodo/:id",AuthMiddleWare,updateTodo);
module.exports=router