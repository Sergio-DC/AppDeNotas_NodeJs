const router = require("express").Router();

const {
  renderAbout,
  renderSignUpForm,
  singup,
  renderSigninForm,
  signin,
  logout
} = require("../controllers/users.controller");

// Routes
router.get("/about", renderAbout);

router.get("/", renderAbout);

router.get("/users/sigin", renderSigninForm);//Sign in

router.get("/users/signup", renderSignUpForm);

router.post("/users/signup", singup);

router.post("/", signin);

router.get("/users/logout", logout);

module.exports = router;
