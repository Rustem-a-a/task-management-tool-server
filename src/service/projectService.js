import Project from "../models/projectModel.js";
import ApiError from "../exceptions/apiError.js";


class ProjectService{
    async createProject ({user,name,start,finish,deadline}){
        const possibleProject = await Project.findOne({name});
        if (possibleProject) {
            throw ApiError.BadRequest( `Project with name ${name} has existed`);
        }
        const project = await Project.create({name, start, finish, deadline, author: user.id})
        await project.populate({
                path: 'author',
                select: 'username'
            })
        return project
    }
    async edit ({id, name,start,finish,deadline}){
        const project = await Project.findById(id);
        if (!project) {
            throw ApiError.BadRequest( `Project with id ${id} not found`);
        }
        if(name) project.name=name
        if(start) project.start=start
        if(finish) project.finish=finish
        if(deadline) project.deadline=deadline
        await project.save()
        return project
    }
    async delete (id) {
        const project = await Project.findById(id);
        if (!project) {
            throw ApiError.BadRequest( `Project with id ${id} not found`);
        }
        const deletedProject = await project.deleteOne()
        return deletedProject
    }
}

export default new ProjectService()