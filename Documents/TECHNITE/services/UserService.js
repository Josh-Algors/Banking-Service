const axios = require('axios');
const res = require('express/lib/response');
const userRepository = require("../repositories/UserRepository");

const getFilms = async (user) => {
    
    try
    {
       const checkUser = await userRepository.getUserByEmail(user.email);

       if(checkUser)
       {
           return res.status(400).json("")
       }
    }
    catch(error)
    {
        return error.message;
    }
};

const getFilmsById = async (id) => {

    try
    {
        const film = await filmRepository.getFilmById(id);

        if(!film)
        {
            const responses = await axios.get(`https://swapi.dev/api/films/${id}`);
            const response = responses.data;
           
            if(response.url)
            {
                const resp = await filmRepository.createFilm(parseInt(id), response.title, response.release_date);
                
                return resp;
            }
            else
            {
                return;
            }
        }
        
        return film;
    }
    catch(error)
    {
        return error.message;
    }
};

module.exports = {
    getFilms,
    getFilmsById,
};