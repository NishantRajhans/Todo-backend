const { response } = require("express");
const Todo=require("../model/todo");
const User=require("../model/user");
exports.createTodo=async(req,res)=>{
    try{
        const {Title,Description}=req.body;
        if(!Title||!Description){
            return res.status(404).json({
                message:"All Fields are required"
            })
        }
        const userId=req.user.id;
        const user=await User.findById(userId);
        const todo=await Todo.create({Title:Title,Description:Description,Creater:user});
        const updateuser=await User.findByIdAndUpdate(userId,{$push:{Todo:todo._id}},{new:true})
        return res.status(200).json({
            updateuser:updateuser,
            message:"Todo created successfully"
        })
    }catch(err){
        return res.status(400).json({
            message:"error while creating todo "+err.message,
        })
    }
}
exports.getTodo=async(req,res)=>{
    try{
        const TodoId=req.params.id;
        const todo=await Todo.findById(TodoId).populate("Creater").exec();
        if(!todo){
            return res.status(400).json({
                message:"Todo not found"
            })
        }
        return res.status(200).json({
            todo:todo,
            message:"Fetch Todo sucessfully"
        })
    }catch(err){
        return res.status(400).json({
            message:"error while getting Todo "+err.message,
        })
    }
}
exports.getAllTodo=async(req,res)=>{
    try{
        const userId=req.user.id;
        const todo=await Todo.find({Creater:userId}).populate("Creater").exec();
        if(!todo){
            return res.status(400).json({
                message:"No todo found"
            })
        }
        return res.status(200).json({
            todo:todo,
            message:"Todos fetched successfully"
        })
    }catch(err){
        return res.status(400).json({
            message:"error while getting all todo "+err.message,
        })
    }
}
exports.updateTodo=async(req,res)=>{
    try{
        const TodoId=req.params.id
        const {Title,Description}=req.body
        if(!Title||!Description){
            return res.status(404).json({
                message:"All fields are required"
            })
        }
        const todo=await Todo.findByIdAndUpdate(TodoId,{Title:Title,Description:Description},{new:true});
        if(!todo){
            return res.status(400).json({
                message:"Todo doesnot exist"
            })
        }
        return res.status(200).json({
            todo:todo,
            message:"Todo updated successfully"
        })
    }catch(err){
        return res.status(400).json({
            message:"error while updating Todo "+err.message,
        })
    }
}
exports.deleteTodo=async(req,res)=>{
    try{
        const TodoId=req.params.id
        const userId=req.user.id
        const todo=await Todo.deleteOne({_id:TodoId});
        const updateuser=await User.findByIdAndUpdate(userId,{$pull:{Todo:TodoId}},{new:true})
        console.log(todo)
        if(!todo) return res.status(404).json({
            message:"Todo not found",
        })
        return res.status(200).json({
            todo:todo,
            message:"Todo deleted successfully"
        });
        
    }catch(err){
        return res.status(400).json({
            message:"error while deleting Todo "+err.message,
        })
    }
}