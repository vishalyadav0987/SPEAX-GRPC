const express = require('express');
const grpcController = require('../controller/searchController');


const router = express.Router();


router.get('/find', grpcController.searchQuestionBasedONQuery);



module.exports = router;