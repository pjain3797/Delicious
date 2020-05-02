const mongoose = require("mongoose");
// Database link
// const config = require("../configs/config");
// database connection
mongoose
    .connect(process.env.DB, {
        useUnifiedTopology: true,
        useNewUrlParser: true
    })
    .then(conn => {
        console.log("Plan DB connected");
        // console.log(conn);
    });

const bookedPlanSchema = mongoose.Schema({
    planId: {
        type: String,
        required: true
    }
    ,
    name: {
        type: String,
        required: [true, "Please enter Name of the plan"]
    },
    currentPrice: {
        type: Number,
        min: 40
    },
    bookedOn: {
        type: String,
        default: Date.now()
    }
});

const bookingSchema = new mongoose.Schema({
    userId: {
        
        type: String,
        required: true
    },
    bookedPlans: {
        type: [bookedPlanSchema],
        required: true
    }
})
const bookingModel = mongoose.model("bookingModel", bookingSchema);
module.exports = bookingModel;