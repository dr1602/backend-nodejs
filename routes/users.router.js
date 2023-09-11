const express = require('express');

const router = express.Router();

router.get('/users', (req, res) => {
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

router.get('/user/:id', (req, res) => {
  const { id } = req.params;
  res.json({
    id: 1,
    name: 'Juanito'
  },{
    id: 2,
    name: 'Maria'
  },{
    id: 3,
    name: 'Benito'
  },{
    id: 4,
    name: 'Allison'
  }
  )
});

module.exports = router;
