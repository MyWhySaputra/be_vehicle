const express = require('express')
const authV1 = require('./v1/auth.route')
const userV1 = require('./v1/user.route')
const brandV1 = require('./v1/brand.route')
const typeV1 = require('./v1/type.route')
const modelV1 = require('./v1/model.route')
const yearV1 = require('./v1/year.route')
const pricelistV1 = require('./v1/pricelist.route')
const morgan = require('morgan')

// version 1 
const v1 = express.Router()
v1.use(morgan('dev'));
v1.use("/", [
  authV1,
  userV1,
  brandV1,
  typeV1,
  modelV1,
  yearV1,
  pricelistV1
]);

const router = express.Router()
router.use('/api/v1', v1)

// default version
router.use('/api', v1)

module.exports = router