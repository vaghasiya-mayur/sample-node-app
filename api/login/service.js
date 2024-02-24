const jwt = require('jsonwebtoken');
const userModal = require("../../collection/userModel");



module.exports = {
    auth: async (req) => {
        try {
            //check user exists or not 
            let ExistingUser = await userModal.findOne({ email: req.body.email });
            if (ExistingUser) {
                return ({ status: 200, data: { message: "User Already exists !", data: null } });
            } else {
                let userData = new userModal(req.body);
                await userData.save();
                const token = jwt.sign({ userId: req.body.email }, 'as#ndjadsa#@dsad$##k%*#MK!@', {
                    expiresIn: '1h',
                });
                let resData = {
                    name: req.body.name,
                    email: req.body.email,
                    authToken: token,
                }
                return ({ status: 200, data: { message: "User Register Successfully", data: resData } });
            }
        } catch (error) {
            return ({ status: 400, data: "Login failed" });
        }
    },

    login: async (req) => {
        try {
            let userData = await userModal.findOne({ email: req.body.email });
            if (userData && userData.password == req.body.password) {
                const token = jwt.sign({ userId: req.body.email }, 'as#ndjadsa#@dsad$##k%*#MK!@', {
                    expiresIn: '1h',
                });

                let resData = {
                    name: userData.name,
                    email: userData.email,
                    profile: userData.profile,
                    authToken: token,
                }
                return ({ status: 200, data: { data: resData } });
            } else {
                return ({ status: 200, data: { message: 'User not found' } });
            }
        } catch (error) {
            return ({ status: 400, data: "Login failed" });
        }
    },

    resetPassword: async (req) => {
        try {
            let userData = await userModal.findOne({ email: req.body.email });
            if (userData) {
                return ({ status: 200, data: { message: "success", data: req.body.email } });
            } else {
                return ({ status: 200, data: { message: 'User not found try another email !' } });
            }
        } catch (error) {
            return ({ status: 400, data: "Reset password faild !" });
        }
    },

    changePassword: async (req) => {
        try {
            let userData = await userModal.findOneAndUpdate({ email: req.body.email }, { password: req.body.password });
            if (userData) {
                return ({ status: 200, data: { message: "success", data: null } });
            } else {
                return ({ status: 200, data: { message: "error", data: null } });
            }

        } catch (error) {
            return ({ status: 400, data: "Reset password faild !" });
        }
    },


    getUserProfile: async (req) => {
        try {
            let userId = req.decoded.userId;
            let userData = await userModal.findOne({ email: userId });
            let newUserData = {
                name: userData.name,
                email: userData.email,
                profile: userData.profile,
            }
            return ({ status: 200, data: { message: "success", data: newUserData } });
        } catch (error) {
            return ({ status: 400, data: "Get profile faild !" });
        }
    },

    updateUserData: async (req) => {
        let userId = req.decoded.userId;
        let uploadFile = req.files.profile;

        if (req.files && Object.keys(req.files).length > 0) {
            let filePath = './uploads/' + uploadFile.name;
            uploadFile.mv(filePath, function (err) {
                if (err)
                    return ({ status: 500, data: { message: "error", data: err } });
            });
            await userModal.findOneAndUpdate({ email: userId }, { profile: uploadFile.name })
        }

        let userData = await userModal.findOneAndUpdate({ email: userId }, { name: req.body.name }, { new: true });
        if (userData) {
            let newUserData = {
                name: userData.name,
                email: userData.email,
                profile: userData.profile,
            }
            return ({ status: 200, data: { message: "success", data: newUserData } });
        } else {
            return ({ status: 200, data: { message: "error", data: null } });
        }
    },
}