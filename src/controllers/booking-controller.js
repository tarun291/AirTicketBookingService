const { StatusCodes } = require('http-status-codes')

const { BookingService } = require('../services/index')

const bookingService = new BookingService();

const create = async (req, res) => {
    try {
        const responce = await bookingService.createBooking(req.body);
        return res.status(StatusCodes.OK).json({
            message: 'Sucessfully completed booking',
            success: true,
            err: {},
            data: responce
        })
    } catch (error){
        res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        })
    }
}


module.exports = {
    create
}