const express = require('express');

const UserServices = require('./../services/user.service');

const router = express.Router();
const service = new UserServices();

router.get('/users', (req, res) => {
  const users = service.find();
  res.json(users);
});

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'created user',
    data: body
  });
});

router.get('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: 1,
    name: 'Juanito',
    status: 'Active',
  },{
    id: 2,
    name: 'Maria',
    status: 'Active',
  },{
    id: 3,
    name: 'Benito',
    status: 'Active',
  },{
    id: 4,
    name: 'Allison',
    status: 'Active',
  }
  )
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  const user = service.update(id, body);
  res.json(user);
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  const rta = service.delete(id);
  res.json(rta);
});

module.exports = router;
