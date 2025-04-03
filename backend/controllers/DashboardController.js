class DashboardController {
  static index(req, res, next) {
    res.status(200).message({ success: true, message: "This Data" });
  }
}

module.exports = DashboardController;
