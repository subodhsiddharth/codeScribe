import express from 'express' ;
import mongoose from 'mongoose';
import blogRouter from './routes/blog-routes';
import router from "./routes/user-routes";

const port = 5000;
const app = express() ;

app.use( express.json() );
app.use( "/api/user" , router);
app.use("/api/blog" , blogRouter);

mongoose.connect("mongodb+srv://admin:admin121@cluster0.8hq2w.mongodb.net/?retryWrites=true&w=majority")
.then( () => app.listen(5000))
.then( () => console.log("connected to database and listing to local host of port address"))
.catch( (err)=>console.log(err)) ;
