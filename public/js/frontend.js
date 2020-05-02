// selector
const login = document.querySelector(".login");
const signup = document.querySelector(".signup");
const uploadPlanImages = document.querySelector(".uploadPlanImages");
const bookPlan = document.querySelector(".bookPlan");
const stripe = Stripe("pk_test_ZN4f6Z1tmqHyaKzHblk84y2K00unLLJgRr");
const forgetPassword = document.querySelector(".forgetPassword");
const resetPassword = document.querySelector(".resetPassword");

async function sendLogin(email, password) {
  try {
    const response = await axios.post("/api/users/login", { email, password });
    if (response.data.success) {
      alert("User logged In");
      // browser
      location.assign("/me");
    } else {
      alert("some Thing went wrong");
    }
  } catch (err) {
    console.log(err);
  }
}

async function sendSignup(name, email, password, confirmPassword) {
  const response = await axios.post("/api/users/signup", {
    name,
    email,
    password,
    confirmPassword
  });
  if (response.data.success) {
    alert(`${name} successfully signedup`);
  } else {
    alert("something went wrong please try later");
    location.assign("/login");
  }
}
async function sendForgetpassword(){

}
async function sendResetPassword(){
  
}
// add event listener
if (login) {
  login.addEventListener("submit", function(event) {
    event.preventDefault();
    const inputArr = document.getElementsByTagName("input");
    const email = inputArr[0].value;
    const password = inputArr[1].value;
    sendLogin(email, password);
  });
}

if (signup) {
  signup.addEventListener("submit", function(e) {
    e.preventDefault();
    const inputArr = document.getElementsByTagName("input");
    const name = inputArr[0].value;
    const email = inputArr[1].value;
    const password = inputArr[2].value;
    const confirmPassword = inputArr[3].value;
    sendSignup(name, email, password, confirmPassword);
  });
}

if (bookPlan) {
  bookPlan.addEventListener("click", async function(e) {
    e.preventDefault();
    const planId = bookPlan.getAttribute("planId");

    const response = await axios.get("/api/bookings/" + planId);
    const session = response.data.session;
    // const userId = response.data.userId;
    // console.log(session);

    stripe
      .redirectToCheckout({
        // Make the id field from the Checkout Session creation API response
        // available to this file, so you can provide it as parameter here
        // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
        sessionId: session.id
      })
      .then(function(resultFromStripe) {
        console.log(resultFromStripe);
        if (resultFromStripe.error.message) {
          // /api/bookings/removeNewbooking

          alert("Booking Failed");

          // => remove th booking
        } else {
        }

        stripe
          .redirectToCheckout({
            // Make the id field from the Checkout Session creation API response
            // available to this file, so you can provide it as parameter here
            // instead of the {{CHECKOUT_SESSION_ID}} placeholder.
            sessionId: session.id
          })
          .then(function(resultFromStripe) {
            console.log(resultFromStripe);
            if (resultFromStripe.error.message) {
              // /api/bookings/removeNewbooking

              alert("Booking Failed");

              // => remove th booking
            } else {
            }

            // If `redirectToCheckout` fails due to a browser or network
            // error, display the localized error message to your customer
            // using `result.error.message`.
          });
      });
  });
}
if(forgetPassword){
  forgetPassword.addEventListener("submit",function(e){
e.preventDefault();

  })
}
