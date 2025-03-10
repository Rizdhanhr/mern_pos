require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const errorHandler = require("./middleware/errorHandler");
const authenticate = require("./middleware/authenticateHandler");
const PORT = process.env.PORT;
const FRONTEND = process.env.FRONTEND_URL;

//Import Routing
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const dashboardRouter = require("./routes/dashboard");
const brandRouter = require("./routes/brand");
const categoryRouter = require("./routes/category");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use(
  cors({
    origin: FRONTEND
  })
);

//Routing Authentication
app.use("/login", authRouter);

//Routing Admin
app.use("/user", authenticate, userRouter);
app.use("/", dashboardRouter);
app.use("/brand", brandRouter);
app.use("/category", categoryRouter);

app.use(errorHandler);

app.listen(PORT, () => console.log("hello world!"));
