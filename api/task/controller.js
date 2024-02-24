const taskService = require('./service');

module.exports = {
    getTaskList: async (req, res) => {
        const data = await taskService.getTaskList(req);
        res.status(data.status).send(data.data)
    },
    addUpdateTask: async (req, res) => {
        const data = await taskService.addUpdateTask(req);
        res.status(data.status).send(data.data)
    },
    deleteTask: async (req, res) => {
        const data = await taskService.deleteTask(req);
        res.status(data.status).send(data.data)
    },
}