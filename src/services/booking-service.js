const axios = require('axios');

const { BookingRepository } = require('../repository/index');

const {FLIGHT_SERVICE_PATH}=require('../config/serverConfig');
const { ServiceError } = require('../utils/errors');
const { up } = require('../migrations/20230104101537-create-booking');

class BookingService {
    constructor() {
        this.bookingRepository = new BookingRepository();
    }
    async createBooking(data) {
        try {
            const flightId = data.fligthId;
            let getFlightRequestURL=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${flightId}`;
            const flight=await axios.get(getFlightRequestURL);
            const flightData=flight.data.data;
            let priceOfFlight=flightData.price;
            if(data.noOfSeats>flightData.noOfSeats){
                throw new ServiceError('Something went wrong in the booking process','Insufficient seats in flight');
            }
            const totalCost=priceOfFlight*data.noOfSeats;
            const bookingPayload={...data,totalCost};
            const booking=await this.bookingRepository.create(bookingPayload);
            const updateFlightRequestURL=`${FLIGHT_SERVICE_PATH}/api/v1/flights/${booking.fligthId}`;
            console.log(updateFlightRequestURL);
            await axios.patch(updateFlightRequestURL,{totalSeats:flightData.totalSeats-booking.noOfSeats});
            const finalBooking=await this.bookingRepository.update(booking.id,{status:"Booked"});
            return finalBooking;
        } catch (error) {
            // console.log(error);
            if(error.name=='RepositoryError' || error.name=='ValidationError'){
                throw error;
            }
            throw new ServiceError();
        }
    }
}

module.exports = BookingService;