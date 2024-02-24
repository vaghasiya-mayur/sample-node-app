const { Schema } = require("mongoose");

var taskModal = new Schema({
    email: {
        type: String
    },
    label: {
        type: String
    },
    desc: {
        type: String
    },
    status: {
        type: String //todo,progress,done
    },
    isdelete: {
        type: Boolean,
        default: false
    },
    cdt: {
        type: Date,
        default: new Date()
    },
});

module.exports = connection.model('task', taskModal, 'task');