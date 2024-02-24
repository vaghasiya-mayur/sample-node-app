const taskModal = require("../../collection/taskModel");

module.exports = {
    getTaskList: async (req) => {
        try {
            let userId = req.decoded.userId;
            let lstTask = await taskModal.find({ $and: [{ email: userId }, { isdelete: !true }] });
            return ({ status: 200, data: { message: "success", data: lstTask } });
        } catch (error) {
            return ({ status: 400, data: "Get task list faild !" });
        }
    },
    addUpdateTask: async (req) => {
        try {
            if (!req.body._id) {
                let userId = req.decoded.userId;
                let objTask = new taskModal(req.body);
                objTask._id = new mongoose.Types.ObjectId();
                objTask.email = userId;
                await objTask.save();
                return ({ status: 200, data: { message: "success", data: objTask } });
            } else {
                let updateObj = {
                    label: req.body.label,
                    desc: req.body.desc,
                    status: req.body.status
                }
                let objTask = await taskModal.findOneAndUpdate({ _id: req.body._id }, updateObj, { new: true });
                return ({ status: 200, data: { message: "success", data: objTask } });
            }
        } catch (error) {
            return ({ status: 400, data: "add update task faild !" });
        }
    },
    deleteTask: async (req) => {
        try {
            let taskId = req.body._id;
            await taskModal.findOneAndUpdate({ _id: taskId }, { isdelete: true });
            return ({ status: 200, data: { message: "success", data: null } });
        } catch (error) {
            return ({ status: 400, data: "delete task faild !" });
        }
    }
}