import  Express  from "express";
import cors from 'cors'
import morgan from "morgan";
import { connection } from "./database/db.js";
import productRouter from './routes/product.routes.js'
import userRouter from './routes/user.routes.js'

const app=Express()
connection();

app.use(Express.json())
app.use(cors())
app.use(morgan('dev'))

//API Middlewares
app.use('/api', productRouter)
app.use('/api', userRouter)



const corsOptions = {
    origin: ['http://localhost:5173','http://192.168.0.22:5173/'], 
      
    optionsSuccessStatus: 200,        
  };
  
app.use(cors(corsOptions));


const PORT=3000

app.listen(PORT, ()=>{
    console.log(`Server is runnig on port ${PORT}`)
})