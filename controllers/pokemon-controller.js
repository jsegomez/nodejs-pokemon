/* eslint-disable no-unused-vars */
/* eslint-disable no-console */
const { response, request } = require('express');
const axios = require('axios');
const Pokemon = require('../models/pokemon.model')

const getPokemons = async(req = request, res = response) => {
  const { from = 0, limit = 10 } = req.query
    try {
      const [total, pokemons] = await Promise.all([
        Pokemon.countDocuments(),
        Pokemon.find()
          .skip(Number(from))
          .limit(Number(limit))
      ]);

      const quantity = pokemons.length;
      res.status(200).json({
        pokemons, quantity, total
      })
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Hubo un error, contactar al administrador'
        });
    }
}

const getPokemonsByCity = async(req = request, res = response) => {
    try {
        const { name } = req.params;
        const pokemons = await Pokemon.find({name});
        res.status(200).json(pokemons);
    } catch (error) {
        console.log(error)
        res.status(500).json({
            message: 'Hubo un error, contactar al administrador'
        });
    }
}

const createPokemons = async (req = request, res = response) => {
    try {
        const data = await axios.get('https://pokeapi.co/api/v2/location')
        const { results } = data.data
        const pokemons = await Pokemon.insertMany(results);

        res.status(201).json(pokemons);
    } catch (error) {
        res.status(500).json({
            message: 'Hubo un error al guardar'
        });
        console.log(error)
    }
}


module.exports = { getPokemons, createPokemons, getPokemonsByCity }
