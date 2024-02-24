const Ctrl = require('./controller');
const middleware = require('../../middleware');

var app = module.exports = express.Router();
app.route('/api/auth').post(Ctrl.auth);
app.route('/api/login').post(Ctrl.login);

app.route('/api/resetPassword').post(Ctrl.resetPassword);
app.route('/api/changePassword').post(Ctrl.changePassword);

app.route('/api/getUserProfile').get(middleware.checkAuth, Ctrl.getUserProfile);
app.route('/api/updateUserData').post(middleware.checkAuth, Ctrl.updateUserData);
