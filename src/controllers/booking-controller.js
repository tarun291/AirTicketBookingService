const { StatusCodes } = require('http-status-codes');

const { BookingService } = require('../services/index')
const { REMINDER_BINDING_KEY } = require('../config/serverConfig');
const { createChannel,publishMessage } = require('../utils/messageQueue');

const bookingService = new BookingService();

class BookingController {
    constructor() {

    }
    async sendMessageToQueue(req,res){
        const channel=await createChannel();
        const data={
            data:{
                subject:'This is a noti from queue',
                content:'Some queue will subscribe this',
                recepientEmail:'tarunkumar766894@gmail.com',
                notificationTime:new Date()
            },
            service:'CREATE_TICKET'
        };
        publishMessage(channel,REMINDER_BINDING_KEY,JSON.stringify(data));
        return res.status(200).json({
            message:'Successfully published the event'
        })
    }
    async create(req, res) {
        try {
            const responce = await bookingService.createBooking(req.body);
            return res.status(StatusCodes.OK).json({
                message: 'Sucessfully completed booking',
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
    async getBooking(req, res) {
        try {
            const responce = await bookingService.getBooking(req.params.id);
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

    async cancelFlight(req, res) {
        try {
            console.log(req.params.id);
            const responce = await bookingService.cancelFlight(req.params.id);
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
}
module.exports = BookingController;