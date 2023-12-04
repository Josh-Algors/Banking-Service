const express = require('express');
const router = express.Router();
const FilmController = require("../controllers/FilmController");
const cacheMiddleware = require("../middleware/cacheMiddleware");

router.get('/films', cacheMiddleware, FilmController.getAllFilms);
router.get('/films/:id', cacheMiddleware, FilmController.getFilmsById);

module.exports = router;   