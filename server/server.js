
import express from 'express'
import morgan from 'morgan';
import cors from 'cors'
import connect from './database/db.js';
import routeWay from './rooute/route.js';

const app = express();

// middleware
app.use(express.json())
app.use(cors())
app.use(morgan('tiny'))
app.disable('x-powerer-by')




app.use('/api',routeWay)
 connect().then(()=>{

    try {
        app.listen(3000,()=>console.log('server running on 3000'))
    } catch (error) {
        console.log("connection not running! ")
    }
}).catch((error)=>{
    console.warn('db not connected !',error)
})

