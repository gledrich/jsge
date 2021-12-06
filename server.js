const express = require('express');
const path = require('path');

const router = express();

router.use('/', express.static(path.join(__dirname, 'public')));
router.use('/engine', express.static(path.join(__dirname, 'engine')));

router.listen(3000, () => {
  console.log('Server running on port 3000');
});
