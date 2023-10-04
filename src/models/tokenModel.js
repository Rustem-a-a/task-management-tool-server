import mongoose from 'mongoose'

const tokenModel = new mongoose.Schema({
    user:{type:mongoose.Types.ObjectId, ref:'User'},
    refreshToken:{type: String, required:true}
})

const Token = mongoose.model('Token',tokenModel)
export default Token