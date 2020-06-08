const router = require("express").Router();

const {
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  logout
} = require("../controllers/users.controller");

// Routes

router.get("/", renderSigninForm);//Sign in

router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", singup);

router.post("/", signin);

router.get("/users/logout", logout);

module.exports = router;
