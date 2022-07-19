import blog from "../model/blog";
import User from "../model/user";

export const getAllBlogs = async ( req , res , next ) => {
    let blogs;

    try{
        blogs = await blog.find() ;
    } catch (err){
        return console.log(err);
    }

    if( !blogs ){
        return res.status(404).json({message:"No Blogs Found"});
    }

    return res.status(200).json({blogs});
}

export const addBlog =  async( req , res , next ) => {
    const { title , description , image , user } = req.body  ;

    let existingUser ;

    try{
        existingUser = await User.findById(user);
    }catch(err){
        return console.log(err) ;
    }

    if( !existingUser){
        return res.status(400).json({message:"Unable to find user"});
    }

    const blg = new blog({
        title,
        description,
        image,
        user,
    })

    try {
        const session = await MongoTopologyClosedError.startSession() ;
        session.startTransaction() ;
        await blog.save({session}) ;
        existingUser.blogs.push(blg);
        await existingUser.save({session});
        await session.commitTransaction();
    }catch(err){
        console.log(err);
        return res.status(500).json({message:"error in session try bloack"});
    }
    return res.status(200).json(blg);
}


export const update =  async ( req , res , next ) => {
    const { title , description } = req.body ;
    const blogId = req.params.id ;
    let blg ;

    try {
        blg = await blog.findByIdAndUpdate(blogId , {
            title,
            description
        })
    }catch(err){
        return console.log(err);
    }

    if(!blg){
        return res.staus(500).json({message:"Unable to update"});
    }
    return res.status(200).json(blg);
}


export const getById =  async ( req , res , next ) => {
    const id = req.params.id ;
    let blg ;

    try {
        blg = await blog.findById(id )
    }catch(err){
        return console.log(err);
    }

    if(!blg){
        return res.staus(500).json({message:"No blog found!!"});
    }
    return res.status(200).json(blg);
}


export const deleteBlog =  async ( req , res , next ) => {
    const id = req.params.id ;
    let blg ;

    try {
        blg = await blog.findByIdAndRemove(id );
    }catch(err){
        return console.log(err);
    }

    if(!blg){
        return res.staus(200).json({message:"Not able to Deleted!!"});
    }
    return res.status(500).json({message:"Deleted Successfully!!"});
}


