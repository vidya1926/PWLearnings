import Ajv from 'ajv';  // Import AJV for JSON schema validation
import { test, expect } from '@playwright/test';

// Create an AJV instance
const ajv = new Ajv();

let accessToken: string | undefined;
let baseUrl: string | undefined;

test.describe.serial(`Salesforce API config`, async () => {
    test(`TO generate token for salesforce`, async ({ request }) => {
        const uri = "https://login.salesforce.com/services/oauth2/token"
        const clientId = "3MVG95mg0lk4bathv4oYb772GRC3bVxW1Es_Q3iIRRNR8SK5ApA.LJbPT96HpWJInRGniHTbF.cUq2.uJatoV"
        const clientSecret = "149569A62384820C94E7FCB265BEFEC659DE02AD4E4D4BAEE95A354329BCD654"
        const username = "vidyar@testleaf.com"
        const password = "Sales@123"
        const grantType = "password"
        const response = await request.post(`${uri}`, {
            headers: {
                "Content-Type": "application/x-www-form-urlencoded",
                "Connection": "keep-alive"
            },
            form: {
                "grant_type": grantType,
                "client_id": clientId,
                "client_secret": clientSecret,
                "username": username,
                "password": password
            }
        })
        const res = await response.json();
        accessToken = res.access_token;
        baseUrl = res.instance_url;
        console.log(`The generated access token -  ${accessToken}`)
        console.log(`The generated instance Url -  ${baseUrl}`)
    })


    // Define the expected schema for the request JSON for Lead creation
    const requestSchema = {
        type: 'object',
        properties: {
            Lastname: { type: 'string' },
            Company: { type: 'string' }
        },
        required: ['Lastname', 'Company'],  // Specify required fields
        additionalProperties: false
    };

    test('To Create lead in Salesforce', async ({ request }) => {
     
        // Define the request data
        const requestData = {
            Lastname: 'Radhakrishnan',
            Company: 'Wipro'
        };

        // Validate the request data against the schema
        const validateRequest = ajv.compile(requestSchema);
        const isRequestValid = validateRequest(requestData);

        if (!isRequestValid) {
            console.log('Request validation errors:', validateRequest.errors);
            // Handle the error appropriately
        }else {
            console.log('Validation errors:', validateRequest.toString);
        }

        // Make the API request
        const response = await request.post(`${baseUrl}/services/data/v58.0/sobjects/Lead`, {
            headers: {
                'Authorization': `Bearer ${accessToken}`,
                'Content-Type': 'application/json'
            },
            data: requestData  // Use the validated requestData
        });

        // Log the full response status and body for debugging
        console.log(`Response status: ${response.status()}`);
        const responseData = await response.json();

        // Store the Lead ID for further use
        const LeadId = responseData.id;
        console.log("Created Lead ID:", LeadId);

        // Check if the response is OK
        expect(response.ok()).toBeTruthy();

        // Validate the response body against the schema
        const responseSchema = {
            type: 'object',
            properties: {
                id: { type: 'string' },
                // Include any other expected properties
            },
            required: ['id'],
            additionalProperties: false
        };




        const validateResponse = ajv.compile(responseSchema);
        const isResponseValid = validateResponse(responseData);


        if (!isResponseValid) {
            console.log('Response validation errors:', validateResponse.errors);
        } else {
            console.log('Validation errors:', validateResponse.toString);
        }



    });
});
