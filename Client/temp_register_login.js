import axios from 'axios';

const BASE_URL = 'http://localhost:5300/api';

async function registerAndLogin() {
    const email = `testuser_${Date.now()}@example.com`;
    const password = 'password123';
    const name = 'Test User';

    console.log(`Attempting to register user: ${name} with email: ${email} and password: ${password}`);

    try {
        // 1. Register user
        const registerRes = await axios.post(`${BASE_URL}/auth/register`, {
            name,
            email,
            password
        });

        console.log('Register Response Status:', registerRes.status);
        console.log('Register Response Data:', registerRes.data);

        if (registerRes.status === 201 && registerRes.data.token) {
            console.log('Registration successful. Attempting to log in...');

            // 2. Login user
            const loginRes = await axios.post(`${BASE_URL}/auth/login`, {
                email,
                password
            });

            console.log('Login Response Status:', loginRes.status);
            console.log('Login Response Data:', loginRes.data);

            if (loginRes.status === 200 && loginRes.data.token) {
                console.log('Login successful!');
                console.log('Received Token:', loginRes.data.token);
                console.log('Logged in user:', loginRes.data.user);
            } else {
                console.error('Login failed.');
                console.error('Login Error Message:', loginRes.data.message || 'Unknown error');
            }
        } else {
            console.error('Registration failed.');
            console.error('Registration Error Message:', registerRes.data.message || 'Unknown error');
        }

    } catch (error) {
        console.error('An error occurred during register or login:');
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('Error Status:', error.response.status);
            console.error('Error Data:', error.response.data);
            console.error('Error Headers:', error.response.headers);
        } else if (error.request) {
            // The request was made but no response was received
            console.error('No response received:', error.request);
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error Message:', error.message);
        }
    }
}

registerAndLogin();
