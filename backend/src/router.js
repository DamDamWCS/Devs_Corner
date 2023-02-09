const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const userControllers = require("./controllers/userControllers");
const auth = require("./auth"); // don't forget to import

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

/* Public Route */
// LOGIN
router.post("/api/login", userControllers.login, auth.verifyPassword);
// REGISTER
router.post(
  "/api/users",
  userControllers.verifySyntaxRegister,
  auth.hashPassword,
  userControllers.add
);

/* Private Route */
// router.use(auth.verifyToken); // authentication wall : verifyToken is activated for each route after this line

// MODIFY INFORMATIONS
router.put(
  "/api/users/:id",
  userControllers.verifySyntaxUpdate,
  userControllers.edit
);

// MODIFY PASSWORD
router.put(
  "/api/users/:id/modifyPassword",
  auth.verifyToken,
  auth.controlPassword,
  auth.verifyPassword,
  auth.hashPassword,
  auth.changePassword
);
//
router.get("/api/users", userControllers.browse);
router.get("/api/users/:id", userControllers.read); // NON UTILE
router.delete("/api/users/:id", userControllers.destroy);

module.exports = router;
