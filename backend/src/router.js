const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");
const auth = require("./controllers/authControllers"); // don't forget to import
const subjectControllers = require("./controllers/subjectControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

/* Public Route */
// LOGIN
router.post(
  "/api/login",
  userControllers.verifySyntax,
  userControllers.login,
  auth.verifyPassword
);
// REGISTER
router.post(
  "/api/users",
  userControllers.verifySyntax,
  auth.hashPassword,
  userControllers.add
);

/* Private Route */
router.use(auth.verifyToken); // authentication wall : verifyToken is activated for each route after this line
/* INSERT BELOW ROUTE WHO DON'T NEED AUthorization */

// route subjects :

router.get("/api/subjects", subjectControllers.browse);
router.get("/api/subjects/:id", subjectControllers.read);
router.post(
  "/api/subjects",
  subjectControllers.validateSubject,
  subjectControllers.add
);

// MODIFY INFORMATIONS
router.put(
  "/api/users/:id",
  auth.checkUser,
  userControllers.verifySyntax,
  userControllers.edit
);

// MODIFY PASSWORD
router.put(
  "/api/users/:id/modifyPassword",
  auth.checkUser,
  userControllers.verifySyntax,
  auth.verifyToken,
  auth.controlPassword,
  auth.verifyPassword,
  auth.hashPassword,
  auth.changePassword
);

router.get("/api/users", auth.checkUser, userControllers.browse);
router.get("/api/users/:id", auth.checkUser, userControllers.read); // NON UTILE
router.delete("/api/users/:id", auth.checkUser, userControllers.destroy);

router.put(
  "/api/subjects/:id",
  auth.checkUser,
  subjectControllers.validateSubject,
  subjectControllers.edit
);
router.delete("/api/subjects/:id", auth.checkUser, subjectControllers.destroy);

module.exports = router;
