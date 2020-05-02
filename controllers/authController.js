const userModel = require("../models/userModel");
const jwt = require("jsonwebtoken");
const KEY = process.env.KEY;
const email=require("../utilities/email");
// Signup
module.exports.signup = async function(req, res) {
  try {
    // 1. create user
    // 
    const user = await userModel.create(req.body);
    // payload
    const id = user["_id"];
    // 2.create Token
    const token = await jwt.sign({ id }, KEY);
    // 3. Send the token in res.cookies
    const options={
      to:user.email,
      subject:`Welcome to the Delhicious Family`,
      html:`<h1>Welcome to the Delhicious Family </h1><p>Hope to you around</p>`
    }
    await email(options);
    res.cookie("jwt", token, { httpOnly: true });
    res.json({
      success: "user successfully signed up"
    });
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
};
// Login
module.exports.login = async function(req, res) {
  try {
    // email,password
    const { email, password } = req.body;
    const user = await userModel.findOne({ email });
    // console.log(user);
    const dbPassword = user.password;
    // console.log(dbPassword);
    if (dbPassword == password) {
      const id = user["_id"];
      const token = await jwt.sign({ id }, KEY);
      // console.log(token);
      res.cookie("jwt", token, { httpOnly: true });
      return res.json({
        success: "User Logged In"
      });
    } else {
    res.json({
        data: "something Went wrong"
      });
    }
   return res.json({data:"send some data"})
  } catch (err) {
    return res.json({
      err
    });
  }
};
module.exports.isUserVerified = async function(req, res, next) {
  // 1. Get The Token
  try {
    if (req.cookies && req.cookies.jwt) {
      const token = req.cookies.jwt;
      const ans = await jwt.verify(token, KEY);
      if (ans) {
        const user = await userModel.findById(ans.id);
        req.user = user;
        next();
      } else {
        next();
      }
    } else {
      next();
    }
    // 3. If verfied Call next;
  } catch (err) {
    console.log(err);
    res.json({
      err
    });
  }
};
module.exports.protectRoute = async function(req, res, next) {
  // 1. Get The Token
  // console.log(req.headers.authorization);
  // console.log(req.headers.Authorization);
  // console.log(req.headers);
  try {
    if (req.cookies && req.cookies.jwt) {
      // 2. Verfiy the token{

      const token = req.cookies.jwt;
// payload -> userId
      const ans = await jwt.verify(token, KEY);
      if (ans) {
        const user = await userModel.findById(ans.id);
        req.user = user;
        next();
      } else {
        res.redirect("/login");
      }
    } else {
      // res.json({
      //   data: "Something went wrong"
      // });
      res.redirect("/login");
    }
    // 3. If verfied Call next;
  } catch (err) {
    res.json(err);
  }
};
module.exports.forgetPassword = async function(req, res) {
  // 1. email
  try {
    if (req.body.email) {
      const { email } = req.body;
      // get userbased on email
      const user = await userModel.findOne({ email });
      // user => generate token 
      const token = user.generateToken();
     await  user.save();
const options={to:email,
  html:`<h1>your reset token ${token} </h1>`,
  subject:"Reset Token"
};
await email(options);
      res.json({ success:"token to your registered email has been send" });

    } else {
      res.json({
        user,
        data: "Please enter your email"
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
  // 2.  findOne User
  // 3. DB user => random token

  // 4. Client => email token
};
module.exports.isAuthorized=function(roles){
  
  return function(req,res,next)
  {
    const {role}=req.user;
    if(roles.includes(role)){
next();
    }else{
      res.json("You are not authorized")
    }




  }
}

module.exports.logout = function(req, res) {
  res.cookie("jwt", "jmdsfgjsdvhds", {
    httpOnly: true,
    expires: new Date(Date.now())
  });
  res.redirect("/");
};

module.exports.resetPassword = async function(req, res) {
  //  1. token,password,confirmPassword
  try {
    // console.log(req.body);
    if (req.body.token && req.body.password && req.body.confirmPassword) {
      const { token, password, confirmPassword } = req.body;
      // console.log(token);
      const user = await userModel.findOne({ token });
      // console.log(user);
      user.password = password;
      user.confirmPassword = confirmPassword;
      user.token = undefined;
      await user.save();
      res.json({
        data: "Your password has been reset"
      });
    } else {
      res.json({
        data: "Please enter complete Data"
      });
    }
  } catch (err) {
    console.log(err);
    res.json({ err });
  }
  //  2. find user => token
  // user.password =>
  // await user.save();
  // 3. user => update user => password,updatePassword,token => undefined
};
