const express = require('express')
// const path = require('path');
const { createActivity, getAllActivities, delActivity, subscribeToActivity, cancelsubcribeActivity } = require('../controllers/activities')
// const { route } = require('./users')
const router = express.Router()

router.post('/createActivity', createActivity)
router.get('/getAllActivities', getAllActivities)
router.delete('/delActivity', delActivity)
router.put('/putActivity', subscribeToActivity)
router.put('/delUserActivity', cancelsubcribeActivity)

module.exports = router