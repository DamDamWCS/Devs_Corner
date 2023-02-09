const express = require("express");

const router = express.Router();

const itemControllers = require("./controllers/itemControllers");
const subjectControllers = require("./controllers/subjectControllers");

router.get("/items", itemControllers.browse);
router.get("/items/:id", itemControllers.read);
router.put("/items/:id", itemControllers.edit);
router.post("/items", itemControllers.add);
router.delete("/items/:id", itemControllers.destroy);

// route subjects :

router.get("/api/subjects", subjectControllers.browse);
router.get("/api/subjects/:id", subjectControllers.read);
router.post(
  "/api/subjects",
  subjectControllers.validateSubject,
  subjectControllers.add
);
router.put(
  "/api/subjects/:id",
  subjectControllers.validateSubject,
  subjectControllers.edit
);

module.exports = router;
