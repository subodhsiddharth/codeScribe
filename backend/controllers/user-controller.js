import user from "../model/user";
import bcrypt from "bcryptjs";

export const getAllUser = async( req , res , next ) => {
    let users ;
    try {
        users = await user.find() ;
    }catch(err){
        console.log( err );
    }

    if( !users ){
        return res.status(404).json({ message : "No user Found" });
    }

    res.status(200).json({users})
}

export const signup = async (req ,res,next) => {
    const {name,email,password} = req.body ;

    let existingUser ;
    try{
        existingUser = await user.findOne({ email });
    }catch(err){
        return console.log(err)
    }

    if( existingUser){
        return res.status(400).json({message:"User Already exist"});
    }

    const hashedPassword = bcrypt.hashSync( password );
    
    const usr = new user({
        name,
        email,
        password : hashedPassword,
        blogs : [],
    });

    try{
        await usr.save();
    }
    catch(err){
        return console.log(err);
    }

    return res.status(201).json({usr});
}

export const login = async (req ,res,next) => {
    const { email,password } = req.body ;

    let existingUser ;
    try{
        existingUser = await user.findOne({ email });
    }catch(err){
        return console.log(err) ;
    }

    if( !existingUser ){
        return res.status(404).json({message:"User Not found !!"});
    }

    const isPasswordCorrect = bcrypt.compareSync(password,existingUser.password) ;

    if ( isPasswordCorrect ){
        return res.status(200).json({existingUser, message:"Login Successful"});
    }
    else{
        return res.status(404).json({message:"User or Password is not correct "});
    }
}


export default { getAllUser , signup , login } ;