const express = require("express");
const projects = require("../controllers/projectsController");
const router = express.Router();

router.get("/", projects.list);
router.get("/:id", projects.getById);
router.post("/", projects.create);
router.put("/:id", projects.update);
router.delete("/:id", projects.remove);

module.exports = router;
