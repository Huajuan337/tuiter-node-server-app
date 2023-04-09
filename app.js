import express from 'express'; 
import HelloController from './controllers/hello-controller.js';
import UserController from './controllers/users/users-controller.js';
import TuitController from './controllers/tuits/tuits-controller.js';
import cors from 'cors';
import mongoose from 'mongoose';

// connect to mongoDB tuits database
const CONNECTION_STRING = process.env.DB_CONNECTION_STRING 
                        || 'mongodb://127.0.0.1:27017/tuiter'; 
console.log("connect: ",CONNECTION_STRING)
mongoose.connect(CONNECTION_STRING)


const app = express();
app.use(cors());            // allow cross-origin requests (configure cors right after instantiating express)
app.use(express.json());    // parse json from HTTP request bodies


HelloController(app);
UserController(app);
TuitController(app);
app.listen(process.env.PORT || 4000); 