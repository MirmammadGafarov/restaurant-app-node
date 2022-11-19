const mongoose = require("mongoose");
const logger = require("../middleware/logger");
module.exports = mongoose
  .connect(process.env.DB_CONNECTION)
  .then(logger.info("Connected to MongoDB"))
  .catch((err) => logger.error(err));
