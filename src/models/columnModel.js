import mongoose from "mongoose";

const columnSchema = new mongoose.Schema({
    columns: {
        'column-1': {
            id: {
                type: String,
                // unique: true,
                required: true,
            },
            title: String,
            taskIds: [String]
        },
        'column-2': {
            id: {
                type: String,
                // unique: true,
                required: true,
            },
            title: String,
            taskIds: [String]
        },
        'column-3': {
            id: {
                type: String,
                // unique: true,
                required: true,
            },
            title: String,
            taskIds: [String]
        }
    }
});
//
// const columnsSchema = new mongoose.Schema({
//     columns: {
//         type: Map,
//         of: columnSchema,
//     },
// });


const ColumnModel = mongoose.model('Column', columnSchema);
export default ColumnModel;