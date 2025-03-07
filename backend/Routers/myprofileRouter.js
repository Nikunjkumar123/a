const express = require('express');
const myprofileRouter=express.Router();

const {myProfile,updateMyProfile}=require('../controllers/profile.controller.js');
const verifyToken = require('../Middleware/verifyToken.js');

myprofileRouter.route('/myProfile').get(verifyToken,myProfile).patch(verifyToken,updateMyProfile);

module.exports=myprofileRouter;