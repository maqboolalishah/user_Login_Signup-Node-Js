const express = require('express');

const { login,checkSession, userSignup } = require('../controller/users');




const router = express.Router();


// Routers for Signup

router.post('/signupUser',userSignup);





/// login routes
router.post('/userLogin', login);

router.get("/checkSession", checkSession);




module.exports=router;