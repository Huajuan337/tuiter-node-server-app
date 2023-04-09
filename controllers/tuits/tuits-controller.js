// import posts from "./tuits.js";
// let tuits = posts;
import * as tuitsDao from './tuits-dao.js';




const TuitController = (app) => {
    app.post('/api/tuits', createTuit);
    app.get('/api/tuits', findTuits);
    app.put('/api/tuits/:tid', updateTuit);
    app.delete('/api/tuits/:tid', deleteTuit);
   }
   

// Mongose model interacts with the MongoDB database asynchronously,
// we'll need to add async to all the functions in tuits-controller


/**
 * not using array anymore, actual tuits inserted into database with DAO's 
 * createTuit respond with actual tuit inserted tuit
 */
const createTuit = async (req, res) => {
    const newTuit = req.body;
    // newTuit._id = (new Date()).getTime() + "";
    newTuit.likes = 0;
    newTuit.liked = false;
    // tuits.push(newTuit);
    const insertedTuit = await tuitsDao.createTuit(newTuit);
    res.json(insertedTuit);

}

/**
 * now it's asynchronous function, retrieve tuits from database
 */
const findTuits  = async (req, res) => {
    const tuits = await tuitsDao.findTuits();           
    res.json(tuits);                                
}

/**
 * 
 */
const updateTuit = async (req, res) => {
    const tuitdIdToUpdate = req.params['tid'];
    const updates = req.body;
    // const tuitIndex = tuits.findIndex(tuit => tuit._id === tuitdIdToUpdate);
    // tuits[tuitIndex] = {...tuits[tuitIndex], ...updates};
    const status = await tuitsDao.updateTuit(tuitdIdToUpdate, updates)
    res.json(status);
}

/**
 * status reports success or failure to delete record from database
 * no longer using array
 * respond with status object
 */
const deleteTuit = async (req, res) => {
    const tuitId = req.params['tid'];
    // tuits = tuits.filter(tuit => tuit._id !== tuitId);
    const status = await tuitsDao.deleteTuit(tuitId)
    res.json(status);
}

export default TuitController; 