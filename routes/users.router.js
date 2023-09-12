const express = require('express');

const router = express.Router();

router.get('/users', (req, res) => {
  const users = [];
  const { limit, offset } = req.query;
  if(limit && offset ) {
    res.json({
      limit,
      offset
    });
  } else {
    res.send('No hay parámetros.');
  }
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

router.post('/', (req, res) => {
  const body = req.body;
  res.json({
    message: 'created user',
    data: body
  });
});

router.patch('/:id', (req, res) => {
  const { id } = req.params;
  const body = req.body;
  res.json({
    message: 'updated user',
    data: body,
    id,
  });
});

router.delete('/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    message: 'delete',
    id,
  })
})

module.exports = router;
