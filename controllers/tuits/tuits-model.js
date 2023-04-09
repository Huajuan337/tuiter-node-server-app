import mongoose from 'mongoose';
import tuitsSchema from './tuits-schema.js'

// create mongoose model from the schema
const tuitsModel = mongoose.model('TuitModel', tuitsSchema);

export default tuitsModel;