import mongoose from "mongoose";

const RoleModel = new mongoose.Schema({
    value:{type:String,unique:true,default:"USER"}
})

const Role = mongoose.model('Role',RoleModel);
export default Role;


