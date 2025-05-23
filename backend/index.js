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
const profileRouter = require("./routes/profileRouter");
const userRouter = require("./routes/userRouter");
const dashboardRouter = require("./routes/dashboardRouter");
const brandRouter = require("./routes/brandRouter");
const unitRouter = require("./routes/unitRouter");
const productRouter = require("./routes/productRouter");
const categoryRouter = require("./routes/categoryRouter");
const roleRouter = require("./routes/roleRouter");
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

app.use(
  "/uploads/product",
  express.static(path.join(__dirname, "public/product"))
);
//Routing Authentication
app.get("/v1/testing", (req, res) => {
  res.status(200).json({ message: "Jalan Cuyyku" });
});
app.use("/v1/auth", authRouter);

//Routing Admin
app.use("/v1/dashboard", isAuth, dashboardRouter);
app.use("/v1/profile", isAuth, profileRouter);
app.use("/v1/user", isAuth, userRouter);
app.use("/v1/brand", isAuth, brandRouter);
app.use("/v1/category", isAuth, categoryRouter);
app.use("/v1/unit", isAuth, unitRouter);
app.use("/v1/product", isAuth, productRouter);
app.use("/v1/role", isAuth, roleRouter);
app.use(errorMiddleware);

app.listen(PORT, "0.0.0.0", () => console.log("started!"));
