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
const getBooking=async (req,res)=>{
    try {
        const responce=await bookingService.getBooking(req.params.id);
        return res.status(StatusCodes.OK).json({
            message: 'Sucessfully fetched booking',
            success: true,
            err: {},
            data: responce
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        })
    }
}

const cancelFlight=async (req,res)=>{
    try {
        console.log(req.params.id);
        const responce=await bookingService.cancelFlight(req.params.id);
        return res.status(StatusCodes.OK).json({
            message: 'Sucessfully canceled booking',
            success: true,
            err: {},
            data: responce
        })
    } catch (error) {
        res.status(500).json({
            message: error.message,
            success: false,
            err: error.explanation,
            data: {}
        })   
    }
}

module.exports = {
    create,
    getBooking,
    cancelFlight
}