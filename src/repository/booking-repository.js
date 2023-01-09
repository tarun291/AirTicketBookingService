// const e = require('express');
const { StatusCodes } = require('http-status-codes');

const { Booking } = require('../models/index');
const { AppError, ValidationError } = require('../utils/errors/index');

class BookingRepository {
    async create(data) {
        try {
            const booking = await Booking.create(data);
            return booking;
        } catch (error) {
            if (error.name == 'SequelizeValidationError') {
                throw new ValidationError(error);
            }
            throw new AppError(
                'RepositoryError',
                'Cannot create Booking',
                'There was some issue creating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    async update(bookingId, data) {
        try {
            // console.log(data.status);
            const booking = await Booking.findByPk(bookingId);
            if (data.status) {
                booking.status = data.status;
            }
            await booking.save();
            return booking;
        } catch (error) {
            console.log(error);
            throw new AppError(
                'RepositoryError',
                'Cannot update Booking',
                'There was some issue updating the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    async getBooking(bookingId) {
        try {
            const booking = await Booking.findByPk(bookingId);
            return booking;
        } catch (error) {
            console.log(error);
            throw new AppError(
                'RepositoryError',
                'Cannot fetched Booking',
                'There was some issue in fetching the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
    async delete(bookingId) {
        try {
            console.log(bookingId);
            await Booking.destroy({
                where: {
                    id: bookingId
                }
            });
            return true;
        } catch (error) {
            console.log(error);
            throw new AppError(
                'RepositoryError',
                'Cannot fetched Booking',
                'There was some issue in fetching the booking, please try again later',
                StatusCodes.INTERNAL_SERVER_ERROR
            );
        }
    }
}

module.exports = BookingRepository;