const express = require('express');
const path = require('path');

const router = express();

console.log(__dirname);

router.use('/', express.static(path.join(__dirname, '../public')));
router.use('/engine', express.static(path.join(__dirname, '../engine')));
router.use('/Example', express.static(path.join(__dirname, '../Example')));

router.listen(3000, () => {
  console.log('Server running on port 3000');
});
