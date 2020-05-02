const express = require("express");
const bookingRouter = express.Router();
const { createCheckoutSession } = require("../controllers/bookingController");
const {protectRoute}=require("../controllers/authController");
// bookingRouter.use(protectRoute)

bookingRouter.get("/:id",protectRoute, createCheckoutSession);
module.exports = bookingRouter;