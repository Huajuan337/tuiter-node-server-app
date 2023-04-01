import express from 'express'; 
import HelloController from './controllers/hello-controller.js';
import UserController from './controllers/users/users-controller.js';
import TuitController from './controllers/tuits/tuits-controller.js';
import cors from 'cors';

const app = express();
app.use(cors());            // allow cross-origin requests (configure cors right after instantiating express)
app.use(express.json());    // parse json from HTTP request bodies


HelloController(app);
UserController(app);
TuitController(app);
app.listen(process.env.PORT || 4000); 