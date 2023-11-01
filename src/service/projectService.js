import Project from "../models/projectModel.js";
import ApiError from "../exceptions/apiError.js";
import Column from "../models/columnModel.js";
import Task from "../models/taskModel.js";

const exampleData = {
    columns: {
        'column-1': {
            id: 'column-1',
            title: 'Queue',
            taskIds: [],
        },
        'column-2': {
            id: 'column-2',
            title: 'Development',
            taskIds: [],
        },
        'column-3': {
            id: 'column-3',
            title: 'Done',
            taskIds: [],
        },
    },
};
class ProjectService{
    async createProject (project){
        const possibleProject = await Project.findOne({name:project.name});
        if (possibleProject) {
            throw ApiError.BadRequest( `Project with name ${project.name} has existed`);
        }
        console.log(11111)
        const columnsData = new Column({columns: exampleData.columns});
        const column = await columnsData.save()
        const createdProject = await Project.create({...project, author: project.user.id,columnId:column._id})
        return createdProject
    }
    async edit (editData){
        const project = await Project.findById(editData._id);
        if (!project) {
            throw ApiError.BadRequest( `Project with id ${editData._id} not found`);
        }
        const updatedProject = await Project.findByIdAndUpdate(editData._id,editData,{new:true})
        return updatedProject
    }
    async delete (id) {
        const project = await Project.findById(id);
        if (!project) {
            throw ApiError.BadRequest( `Project with id ${id} not found`);
        }
        await Column.deleteMany({ _id: { $in: project.columnId} })
        await Task.deleteMany({ _id: { $in: project.tasks} })
        const deletedProject = await project.deleteOne()
        return deletedProject
    }
}

export default new ProjectService()