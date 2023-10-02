import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    id: {type: String, required: true},
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref:'Project'
        }
    ]
})

const User =  mongoose.model('User', userSchema)
export default User