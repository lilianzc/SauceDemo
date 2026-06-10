
import { request } from '@playwright/test';
import fs from 'fs';

async function globalSetup() {
    const apiContext = await request.newContext({
        baseURL: 'https://restful-booker.herokuapp.com'
    });

    const response = await apiContext.post('/auth', {
        data: {
            username: 'admin',
            password: 'password123'
        }
    });

    const responseBody = await response.json();

    const token = responseBody.token;


    // Saving token to a file
    fs.writeFileSync('token.json', JSON.stringify({ token }));
}

export default globalSetup;
