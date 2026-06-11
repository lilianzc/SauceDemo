import {test, expect} from '@playwright/test';
import Ajv from 'ajv/dist/2020.js';
import addSchemaFormats from 'ajv-formats';
import tokenValue from '../../../token.json';
import bookingData from '../../../test-data/bookingData.json';//used to create the booking and validate the content of the response
import bookingSchema from '../../../test-data/createBookingSchema.json';//used to validate the schema of the response after creating the booking
import getBookingSchema from '../../../test-data/getBookingSchema.json';//used to validate the schema of the response of a get request to get a booking data
import {generateDates} from '../../../utils/generateDates.js'; //used to generate dates
import updateBooking from '../../../test-data/updateBooking.json';//used to update a booking and validate the content of its reponse
import updateBookingSchema from '../../../test-data/updateBookingSchema.json'; //used to validate the schema of the put request to update a schema


const ajv = new Ajv();
addSchemaFormats(ajv);
let bookingId;

test.beforeAll(async ({request}) => {
    const response = await request.post('/booking', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },

        //Reading request body from a json file
        data: bookingData
    });

    expect (response.status()).toBe(200);

    const responseBody = await response.json(); 
    bookingId = responseBody.bookingid;
});


//tests

test.describe.serial('Booking flow', () => {
test('create a booking', async ({request}) => {
    const response = await request.post('/booking', {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json'
        },
        data: bookingData
    });

    //validate status code
    expect (response.status()).toBe(200);

    const responseBody = await response.json(); 

    //validate bookingid is not null
    expect (responseBody.bookingid).toBeTruthy();

    //validate response content
    expect (responseBody.booking).toMatchObject(bookingData);

    //validate schema
    const validate = ajv.compile(bookingSchema);
    const valid = validate(responseBody);
    expect(valid).toBe(true);



});

test('get Booking by ID', async ({request}) => {
    //console.log(bookingId);
    const response = await request.get(`/booking/${bookingId}`, {
        headers: {
            'Accept': 'application/json'
        }
    });
     //validate status code
    expect (response.status()).toBe(200);

    const responseBody = await response.json();

    //validate response content
    expect (responseBody).toMatchObject(bookingData);

    //validate schema
    const validate = ajv.compile(getBookingSchema);
    const valid = validate(responseBody);
    expect(valid).toBe(true);
});

test('update Booking by ID', async ({request}) => {
    //generate checkin and checkout dates
    const { checkinDate, checkoutDate } = generateDates();

    //update request body with generated dates
    const updatedBooking = {
        ...updateBooking, //get the content of the updateBooking.json file
        bookingdates: { //replace the content of the bookingDates parameter in the api
            checkin: checkinDate, 
            checkout: checkoutDate 
        }

    };
         //console.log(checkinDate, checkoutDate);

    //getting the content of updateBooking.json and adding the checkin and checkout date to assert against the response.
    const expectedResponse = {
     ...updateBooking,
     bookingdates: {
        checkin: checkinDate,
        checkout: checkoutDate
     }

    };     

    const response = await request.put(`/booking/${bookingId}`, {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Cookie': `token=${tokenValue.token}`
        },
        data: updatedBooking
    });

    //validate status code
    expect (response.status()).toBe(200);

    const responseBody = await response.json();

    //validate response content 
   expect (responseBody).toMatchObject(expectedResponse);

   
    //validate schema
    const validate = ajv.compile(updateBookingSchema);
    const valid = validate(responseBody);
    expect(valid).toBe(true);
});

test ('delete booking', async ({request}) => {
    const response = await request.delete(`/booking/${bookingId}`, {
        headers: {
            'Cookie': `token=${tokenValue.token}`
        }
    });

    //validate status code
    expect (response.status()).toBe(201);

    const responseBody = await response.text();

    //validate response content
    expect (responseBody).toBe('Created');
});

test('deleted booking no longer exists', async({request})=> {
    const response = await request.get(`/booking/${bookingId}`, {
        headers: {
            'Cookie': `token=${tokenValue.token}`
        }
    });

    //validate response status code
    expect (response.status()).toBe(404);

    const responseBody = await response.text();

    expect (responseBody).toBe('Not Found');
});

});
