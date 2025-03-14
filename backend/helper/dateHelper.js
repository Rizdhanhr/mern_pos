const moment = require("moment");

const formatDate = isoDate => {
  return (isoDate = moment(isoDate, moment.ISO_8601).format(
    "DD/MM/YYYY HH:mm:ss"
  ));
};

module.exports = {
  formatDate
};
