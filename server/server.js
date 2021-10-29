const express = require('express');
const cors = require('cors');
const { dbConnection } = require('../config/database');

class Server{
    constructor(){
        this.app = express();
        this.port = process.env.PORT;
        this.pokemonPath = '/api/pokemons'

        this.database();

        this.middlewares();

        this.routes();
    }

    middlewares(){
        this.app.use(cors());
    }

    async database(){
        await dbConnection();
    }

    routes(){
        this.app.use(this.pokemonPath, require('../routes/pokemon-routes'))
    }

    listen(){
        this.app.listen(this.port, () => {
            console.log(`Servidor corriendo en puerto ${this.port}`);
        });
    }
}

module.exports = Server;