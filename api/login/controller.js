const loginService = require('./service');

module.exports = {
    auth: async (req, res) => {
        const data = await loginService.auth(req);
        res.status(data.status).send(data.data)
    },

    login: async (req, res) => {
        const data = await loginService.login(req);
        res.status(data.status).send(data.data)
    },

    resetPassword: async (req, res) => {
        const data = await loginService.resetPassword(req);
        res.status(data.status).send(data.data)
    },

    changePassword: async (req, res) => {
        const data = await loginService.changePassword(req);
        res.status(data.status).send(data.data)
    },

    getUserProfile: async (req, res) => {
        const data = await loginService.getUserProfile(req);
        res.status(data.status).send(data.data)
    },

    updateUserData: async (req, res) => {
        const data = await loginService.updateUserData(req);
        res.status(data.status).send(data.data)
    },
}