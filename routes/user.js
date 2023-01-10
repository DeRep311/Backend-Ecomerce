const users= require('../apiServices/User/Router')
const express= require('express')
const router = express.Router();
router.use(users)
module.exports= router;