const express = require('express');
const jwt=require("jsonwebtoken");
require("dotenv").config();
exports.AuthMiddleWare=async(req, res, next)=>{
   try{
    const token=req.header("Authorization").replace("Bearer ", "");
    if(!token){
        return res.status(201).json({
            message:"Token is required"
        })
    }
    try{
        const decode=await jwt.verify(token,process.env.JWT_SECRET);
        req.user=decode
    }catch(err){
        return res.status(200).json({
            message:"error while verifying token"
        })
    }
    next();
   }catch(err){
    return res.status(400).json({
        message:"error while fetching token"
    })
   }
}