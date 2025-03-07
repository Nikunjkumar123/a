const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const connectDB = require("./db/db.js");
const authenticationRouter = require("./Routers/authenticationRouter.js");
const myprofileRouter = require("./Routers/myprofileRouter.js");
const fileUpload = require("express-fileupload");
const cloudinary = require("./utils/cloudinary.js");
const verifyToken = require("./Middleware/verifyToken.js");
const mainCategoryRouter = require("./Routers/mainCategoryRouter.js");
const subcategoriesRouters = require("./Routers/subcategoriesRouters.js");
const productsFinalRouters = require("./Routers/productsFinalRouters.js");
const BannerRouters = require("./Routers/bannerRouter.js");
const cartRouter = require("./Routers/Cart.router.js");
const orderRouter = require("./Routers/order.router.js");
const featureProductRouter = require("./Routers/featureProductRouter.js");
const featureCategoryRouter = require("./Routers/featureCategoryRouter.js");
const paymentRouter = require("./Routers/payment.route.js");

app.use(express.json());
app.use(express.static("./public"));
app.use(cookieParser());

app.use(
  cors({
    origin: [
      "http://localhost:3000",
      "http://localhost:3001",
      "https://mrandmrsperfecttrips.in",
      "https://www.mrandmrsperfecttrips.in",
      "https://admin.mrandmrsperfecttrips.in",
    ], //frotend url
    credentials: true,
    methods: "GET,POST,DELETE,PATCH",
    allowedHeaders: "Content-Type, Authorization",
  })
);
app.options("*", cors());

app.use(fileUpload({ useTempFiles: true }));

app.get("/", (req, res) => {
  res.send("API WORKING FINE");
});

app.use("/api/v1/auth", authenticationRouter);
app.use("/api/v1/myprofile", myprofileRouter);
app.use("/api/v1/products/mainCategory", mainCategoryRouter);
app.use("/api/v1/products/sub-categories", subcategoriesRouters);
app.use("/api/v1/products/productsFinal", productsFinalRouters);
app.use("/api/v1/Banners", BannerRouters);
app.use("/api/v1/cart", verifyToken, cartRouter);
app.use("/api/v1/order", orderRouter);
app.use("/api/v1/feature-product", featureProductRouter);
app.use("/api/v1/feature-category", featureCategoryRouter);
app.use("/api/v1/payment", paymentRouter);

connectDB(process.env.URL);
app.listen(process.env.PORT, () => {
  console.log("connected to Port", process.env.PORT);
});
