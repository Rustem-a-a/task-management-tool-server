import ProjectService from "../service/projectService.js";
import Project from "../models/projectModel.js";

class ProjectControllers {

    async createProject(req, res, next) {
        try {
            const {user,name,start,finish,deadline} = req.body
            const project = await ProjectService.createProject({user,name,start,finish,deadline})
            return res.status(200).json(project);
        } catch (e) {
            next(e)
        }
    }
    async editProject(req, res, next) {
        try {
            const updatedProject = await ProjectService.edit(req.body)
            res.status(200).json(updatedProject)
        } catch (e) {
            next(e)
        }
    }
    async deleteProject(req, res, next) {
        try {
            const id = req.params.id
            const deletedProject = await ProjectService.delete(id)
            res.status(200).json(deletedProject)
        } catch (e) {
            next(e)
        }
    }
    async getProjects(req, res, next) {
        try {
            const projects = await Project.find()
            res.status(200).json(projects)
        } catch (e) {
            next(e)
        }
    }
        }

        export default new ProjectControllers()