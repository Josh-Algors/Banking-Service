const db = require("../database/db");

const getAllFilms = async () => {

      const getFilms = await db.Film.findAll({order: [['release_date', "ASC"]]});

      return getFilms;
  
};

const getFilmById = async (id) => {

      const film = await db.Film.findOne({where : {id: id}});

      return film;
  
};

const createFilm = async (id, title, release_date) => {

      const film = await db.Film.create({
        id: id,
        title: title,
        release_date: release_date,
        comment_count: 0
        });

      return film;

};

module.exports = {
  getAllFilms,
  getFilmById,
  createFilm
};