const { Router } = require('express');

const router = Router();
const {
    createPokemons,
    getPokemons,
    getPokemonsByCity    
} = require('../controllers/pokemon-controller');

router.get('/all', getPokemons)

router.get('/city/:name', getPokemonsByCity);

router.post('/create', createPokemons);

module.exports = router;