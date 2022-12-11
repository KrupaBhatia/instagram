const mongoose = require('mongoose');
const ObjectId = mongoose.Schema.Types.ObjectId;

const postSchema = new mongoose.Schema({
    
    userId: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    
    desc : {
        type : String,
        max : 500
    },
    img : {
        type : String
    },
    likes : {
        type : Array,
        default : []
    },
    
    tags: [{
        type: String,
        required: true,
        trim: true
    }],
    isDeleted :{
        type : Boolean,
        default : false
    },

   }, { timestamps: true });

module.exports = mongoose.model('Post', postSchema);