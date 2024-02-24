const Ctrl = require('./controller');
const middleware = require('../../middleware');

var app = module.exports = express.Router();
app.route('/api/getTaskList').get(middleware.checkAuth, Ctrl.getTaskList);
app.route('/api/addUpdateTask').post(middleware.checkAuth, Ctrl.addUpdateTask);
app.route('/api/deleteTask').delete(middleware.checkAuth, Ctrl.deleteTask);

