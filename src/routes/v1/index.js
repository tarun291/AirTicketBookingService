const express = require('express');
const { BookingController } = require('../../controllers/index');

const router = express.Router();

router.post('/bookings', BookingController.create);
router.get('/bookings/:id',BookingController.getBooking);
router.delete('/cancel/:id',BookingController.cancelFlight);

module.exports = router;