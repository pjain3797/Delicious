const express = require("express");
const app = express();
// stripe=> payment => payment?
const cookieParser = require("cookie-parser");
const bodyParser=require("body-parser");
const bookingController = require("./controllers/bookingController");
app.post("/webhook-checkout",bodyParser.raw({ type: 'application/json' }), bookingController.createBooking);

// to get cookies from browser 
//  4 routers

const planRouter = require("./routers/planRouter");

const userRouter = require("./routers/userRouter");
// ui 
const viewRouter = require("./routers/viewRouter");
const bookingRouter = require("./routers/bookingRouter");


// converts buffer to json=>http body => data => json => req.body 
app.use(express.json());
// when u are using forms to submit data => post data =>url encode => req.body (add)
app.use(express.urlencoded({ extended: true }));
// =>serve static files  to client=> frontend JS,img,videos,css
// /js/script.js
app.use(express.static("public"));

// plans/js/scripts.js>?
app.use("/plans", express.static("public"))
// cookies?
app.use(cookieParser());

// pug => render
// express => rendering engine
app.set("view engine", "pug");
// /where will tou get all the templates
app.set("views", "views");

// routers

app.use("/", viewRouter);

app.use("/api/plans", planRouter);
app.use("/api/users", userRouter);
app.use("/api/bookings", bookingRouter);
// wild card matching
// app.use("*",function(req,res){
//   res.render("404 Page Not found")
// })
// app.get("/plans",);
// createPlans
// plans/1
// plans/2
// app.patch("/plans/:id", );
// createPlan
// app.post("/plans");

// user
// enviorment variables => hosting
const port = process.env.PORT || 3000
app.listen(port, () => {
  console.log("Server is listening at port 3000");
});
