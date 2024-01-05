const mongoose=require('mongoose');
const TodoSchema=new mongoose.Schema(
    {
        Title:{
            type:String,
            required:true,
        },
        Description:{
            type:String,
            required:true,
        },
        Creater:{
            type:mongoose.Schema.Types.ObjectId,
            ref:"User"
        }
    }
)
module.exports=mongoose.model("Todo",TodoSchema);