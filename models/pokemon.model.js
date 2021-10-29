const { Schema, model } = require('mongoose');

const PokeSchema = Schema({
    name: {
        type: String
    }, 
    url:  {
        type: String
    }
});

PokeSchema.methods.toJSON = function() {
    const { __v, _id, ...pokemons } = this.toObject();
    pokemons.uid = _id;
    return pokemons;
}

module.exports = model('pokemons', PokeSchema);