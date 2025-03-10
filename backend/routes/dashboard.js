const express = require("express");
const dashboardRouter = express.Router();
const dashboardController = require("../controllers/dashboardController");

//tanpa controller
// dashboardRouter.get('/',(req,res) => {
//     res.render('dashboard/index');
// });

//dengan controller
dashboardRouter.get('/', dashboardController.index);
module.exports = dashboardRouter;