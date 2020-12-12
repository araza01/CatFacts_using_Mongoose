const express = require(`express`);
const bodyParser = require(`body-parser`);
const db = require(`./db/conn`);
const Cat = require(`./model/schema`);
const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.post(`/api/cat/create_facts`, async function(req, res) {
    try {
        const facts = new Cat(req.body);
        const result = await facts.save();
        res.json({ data: result });
    } catch(err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get(`/api/cat/all_facts`,async function(req, res) {
    try {
        const result = await Cat.find();
        res.json({ data: result });
    } catch(err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get(`/api/cat/facts`, async function(req, res) {
    try {
        const result = await Cat.find({}, {facts: 1, _id: 0});
        res.json({ data: result });
    } catch(err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get(`/api/cat/facts/:id`, async function(req, res) {
    try {
        const result = await Cat.findById(req.params.id);
        res.json({ data: result });
    } catch(err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get(`/api/cat/:no_of_facts`, async function(req, res) {
    try {
        const result = await Cat.find({}, {facts: 1, _id: 0}).limit(parseInt(req.params.no_of_facts));
        res.json({ data: result });
    } catch(err) {
        res.status(500).json({ Error: err.message });
    }
});

app.get(`/api/cat/facts/random_facts`, async function(req, res) {
    try {
        const result = await Cat.find({}, {facts: 1, _id: 0});
        const x = Math.floor((Math.random() * result.length));
        res.json({ data: result[x] });
    } catch(err) {
        res.status(500).json({ Error: err.message });
    }
});

app.put(`/api/cat/update_facts/:id`, async function(req, res) {
    try {
        const result = await Cat.updateOne({_id: req.params.id}, {facts: req.body});
        res.json({ data: result });
    } catch(err) {
        res.status(500).json({ Error: err.message });
    }
});

app.delete(`/api/cat/delete_facts/:id`, async function(req, res) {
    try {
        const result = await Cat.deleteOne({_id: req.params.id});
        res.json({ data: result });
    } catch(err) {
        res.status(500).json({ Error: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is connected to ${port}`);
});