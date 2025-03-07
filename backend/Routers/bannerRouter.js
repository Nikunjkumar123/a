const express = require("express");
const BannerRouters = express.Router();

const {
  allBanners,
  addBanners,
  deleteBanner,
  updateBanner,
  getBannerById,
} = require("../controllers/banner.controller.js");
const verifyToken = require("../Middleware/verifyToken.js");

BannerRouters.route("/").get(allBanners).post(verifyToken,addBanners); 

BannerRouters.route("/:id").get(getBannerById).delete(verifyToken,deleteBanner).patch(verifyToken,updateBanner); 

module.exports = BannerRouters;
