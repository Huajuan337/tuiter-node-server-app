import people from './users.js'
let users = people

// use express instance app to declare http get responds pattern /api/users to call a function
const UserController = (app) => {
   app.get('/api/users', findUsers); 
   app.get('/api/users/:uid', findUserById); 
   app.post('/api/users', createUser); 
   app.delete('/api/users/:uid', deleteUser); 
   app.put('/api/users/:uid', updateUser);

}

// function runs when /api/users requested sponds wih users in JSON array with users
const findUsers = (req, res) => {
    const type = req.query.type         // retrieve type parameter from query
    
    if (type) {                                     // if type parameter in query, find users of that type
        usersOfType = people.filter(user => user.type === type)     // if type parameter is present, filter users by type
        res.json(usersOfType)                           // respond with users of that type 
        return 
    }
    res.json(users)             // respond with new user to client
}

const findUserById = (req, res) => {   
    const userId = req.params['uid']; 
    const user = users.find(user => user._id === userId)
    res.json(user); 
}

const createUser = (req, res) => {

    const newUser = req.body;                       // extract new user from BODY in request
    newUser._id = (new Date()).getTime() + "";      // add an _id property with unique timestamp
    users.push(newUser);                            // append new user to users array
    res.json(newUser);                              // respond with new user to client
}

const deleteUser = (req, res) => {
    const userId = req.params['uid'];           // extract userId from path parameter uid 
    users = users.filter(user => user._id !== userId)   // filter out the user with the given userId
    res.sentStatus(200)                         // respond with success code 
}


const updateUser = (req, res) => {
    const userId = req.params['uid'];           // extract userId from path parameter uid
    const updates = req.body;                   // extract new user from BODY in request
    users = users.map(user =>                   // if current user'id matches userId, update user
        user._id === userId ? 
        {...user, ...updates} :                 // merge current user with updates
        user);                                  // otherwise, return current user
    res.sentStatus(200)                         // respond with success code 
}

export default UserController; 