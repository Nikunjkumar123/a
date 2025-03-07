const express = require('express');
const authenticationRouter = express.Router();
const {RegisterUser,LoginUser,LogoutUser,forgotPasswordUser,verifyTokenOTP,updatePasswordOTP,verifyEmailUser,verifyEmailOTP, CheckUser, getAllUsers, deleteUser, LoginAdminUser} = require('../controllers/auth.controllers.js');
const verifyToken = require('../Middleware/verifyToken.js');

authenticationRouter.route('/register').post(RegisterUser);
authenticationRouter.route('/check').get(CheckUser)
authenticationRouter.route('/Login').post(LoginUser);
authenticationRouter.route('/admin/Login').post(LoginAdminUser);
authenticationRouter.route('/Logout').post(verifyToken,LogoutUser);
authenticationRouter.route('/forgotPassword').post(forgotPasswordUser);
authenticationRouter.route('/verifyEmail').post(verifyEmailUser); //1
authenticationRouter.route('/verifyEmailOTP').post(verifyEmailOTP); //2
authenticationRouter.route('/verifyToken').post(verifyTokenOTP);
authenticationRouter.route('/updatePassword').post(updatePasswordOTP);
authenticationRouter.route("/get-all-users").get(getAllUsers)


module.exports=authenticationRouter;