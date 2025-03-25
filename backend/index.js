require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const errorMiddleware = require("./middlewares/errorMiddleware");
const isAuth = require("./middlewares/authenticateMiddleware");
const PORT = process.env.PORT;
const FRONTEND = process.env.FRONTEND_URL;

//Import Routing
const authRouter = require("./routes/authRouter");
const userRouter = require("./routes/userRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const brandRouter = require("./routes/brandRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
const cookieParser = require("cookie-parser");

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: FRONTEND,
    credentials: true
  })
);

app.use("/uploads", express.static(path.join(__dirname, "public/product")));
//Routing Authentication
app.use("/api/auth", authRouter);
//Routing Admin
app.use("/api/dashboard", isAuth, dashboardRouter);
app.use("/api/user", isAuth, userRouter);
app.use("/api/brand", isAuth, brandRouter);
app.use("/api/category", isAuth, categoryRouter);
app.use("/api/product", productRouter);

app.use(errorMiddleware);

app.listen(PORT, () => console.log("started!"));
