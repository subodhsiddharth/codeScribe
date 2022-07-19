import mongoose from "mongoose";
const Schema = mongoose.Schema ;

const blogSchema = new Schema ({
    title :{
        type : String ,
        required : true
    },
    description : {
        type : String ,
        required : true 
    },
    image :{
        type : String ,
        required : true 
    },
    user :{
         type : mongoose.Types.ObjectId ,
         ref: "User",
         required : true
    }
});

export default mongoose.model("blog" , blogSchema);

// ,
//     like :{
//         type : Number,
//         default : 0 
//     },
//     dislike :{
//         type : Number,
//         default : 0
//     }