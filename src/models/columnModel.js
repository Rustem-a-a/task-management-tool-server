import mongoose from "mongoose";

// const columnsSchema = new mongoose.Schema({
//     columns: [
//         {
//             id: {type: String},
//             title: {type: String},
//             taskIds: [{type: String}],
//         }
//     ]
// })
const columnSchema = new mongoose.Schema({
    id: String,
    title: String,
    taskIds: [String],
});

const columnsSchema = new mongoose.Schema({
    columns: {
        type: Map,
        of: columnSchema,
    },
});


const ColumnModel = mongoose.model('Column', columnsSchema);
export default ColumnModel;