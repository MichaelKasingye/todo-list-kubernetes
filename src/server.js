/*
  imports
*/

const express = require('express');
const bodyParser = require('body-parser');

const app = express();
// 3000 - staging, 2000 - production
const PORT = process.env.PORT || 2000;
const knex = require('./db/knex');

/*
  middleware
*/

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

/*
  routes
*/

app.get('/', (req, res) => {
  res.json('pong!');
});

app.get('/health', (req, res) => {
  res.json('This server is healthy - test tags');
});

app.get('/todos', (req, res) => {
  knex('todos')
  .then((data) => { res.json(data); })
  .catch(() => { res.json('Something went wrong.') });
});

app.get('/todos/:id', (req, res) => {
  knex('todos')
  .where({ id:  parseInt(req.params.id) })
  .then((data) => { res.json(data); })
  .catch(() => { res.json('Something went wrong.') });
});

app.post('/todos', (req, res) => {
  knex('todos')
  .insert({
    title: req.body.title,
    completed: false
  })
  .then(() => { res.json('Todo added!'); })
  .catch(() => { res.json('Something went wrong.') });
});

app.put('/todos/:id', (req, res) => {
  knex('todos')
  .where({ id: parseInt(req.params.id) })
  .update({
    title: req.body.title,
    completed: req.body.completed
  })
  .then(() => { res.json('Todo updated!'); })
  .catch(() => { res.json('Something went wrong.') });
});

app.delete('/todos/:id', (req, res) => {
  knex('todos')
  .where({ id: parseInt(req.params.id) })
  .del()
  .then(() => { res.json('Todo deleted!'); })
  .catch(() => { res.json('Something went wrong.') });
});


/*
  run server
*/

app.listen(PORT, () => {
  console.log(`Listening on port: ${PORT}`);
});
