import mongoose from "mongoose";

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isActivated: {
        type:Boolean,
        default: false
    },
    activationLink:{
        type:String
    },
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Project'
        }
    ],
    roles:[
        {
            type: String,
            ref: 'Role'
        }
    ],
})

const UserModel =  mongoose.model('User', UserSchema);
export default UserModel;