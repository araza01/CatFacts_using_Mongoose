const mongoose = require(`mongoose`);

const catSchema = new mongoose.Schema({
    animal_type: {type: String},
    facts: {type: String}
});

const Cat = mongoose.model(`Cat`, catSchema);

module.exports = Cat;