require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const path = require("path");
const errorHandler = require("./middleware/errorHandler");
const authenticate = require("./middleware/authenticateHandler");
const PORT = process.env.PORT;
const FRONTEND = process.env.FRONTEND_URL;

//Import Routing
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const dashboardRouter = require("./routes/dashboard");
const brandRouter = require("./routes/brand");
const productRouter = require("./routes/product");
const categoryRouter = require("./routes/category");
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
app.use("/api/", authenticate, dashboardRouter);
app.use("/api/user", authenticate, userRouter);
app.use("/api/brand", authenticate, brandRouter);
app.use("/api/category", authenticate, categoryRouter);
app.use("/api/product", authenticate, productRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log("started!"));
