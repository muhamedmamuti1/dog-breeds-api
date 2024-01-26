# Dog Breeds API

## Overview

The Dog Breeds API is a Node.js Express application that provides information about various dog breeds. The data is stored in a PostgreSQL database.

## Setup

Follow the steps below to set up and run the application locally:

### Prerequisites

1. Ensure you have Node.js and npm installed on your machine.

2. Make sure you have PostgreSQL installed and running.

### Installation

1. Clone the repository to your local machine:

    ```bash
    git clone https://github.com/muhamedmamuti1/dog-breeds-api.git
    ```

2. Navigate to the project directory:

    ```bash
    cd dog-breeds-api
    ```
3. Switch to 'master':

    ```bash
    git checkout master
    ```

4. Install the project dependencies:

    ```bash
    npm install
    ```

### Database Setup

1. Create a PostgreSQL database for the project.

2. After creating your local PostgreSQL database, run the following command to initialize the database schema and populate sample data:

   ```bash
   node initialize-database.js
   ```

3. Update the database connection configuration in `config.js` with your database credentials.

### Running the Application

Start the server by running the following command:

```bash
node app.js
```

## API Endpoints

### Get All Breeds
Endpoint: GET /api/breeds/list/all

Description: Retrieve a list of all dog breeds.

### Get Random Image for a Breed
Endpoint: GET /api/breed/{name}/images/random

Description: Retrieve a random image for a specific dog breed.

### Search Breeds by prompts (size, temperament, popularity)
Endpoint: GET /api/breed/search?popularity=most_popular

Description: Search dog breeds based on user prompts.

### Paginated List of Breeds
Endpoint: GET /api/breed?page=2&pageSize=4

Description: Retrieve a paginated list of dog breeds.

### Paginated Images for a Breed by ID
Endpoint: GET /api/breed/992611fe-3767-46af-858d-ccea864c77d0/images?page=1&pageSize=2

Description: Retrieve paginated images for a specific dog breed by ID.

### GET/POST/PUT/DELETE For Breeds, Breed Details, Breed Images and Users.

## Request and Response Formats

### Request Formats

Use JSON payload to send data to backend through the API calls.

#### Example:

```json
// Example JSON Request Body for POST/PUT /api/breed/{id}
{
   "name": "some breed"
}

// Example JSON Request Body for POST/PUT /api/breed/{id}/details{detail_id}
{
  "name": "something",
  "size": 30,
  "temperament": "some details",
  "popularity": "LEAST_POPULAR"
}

// Example JSON Request Body for POST/PUT /api/breed/{id}/images{image_id}
{
   "url": "some picture url"
}

// Example JSON Request Body for POST/PUT /api/user/{id}
{
   "first_name": "first name",
   "last_name": "last name",
   "username": "username",
   "email": "email",
   "password": "password",
   "role": "ADMIN/CLIENT"
}
```

### Response Formats

We are using standard response format displaying each field in a JSON payload.

#### Example:

```json

// Example breed image payload
{
        "id": "e418040b-02f8-4953-b419-3b715984045e",
        "url": "https://www.akc.org/wp-content/uploads/2017/11/French-Bulldog-standing-outdoors.jpg",
        "created_at": "2024-01-23T12:48:38.111Z",
        "updated_at": null,
        "deleted_at": null,
        "breed_id": "992611fe-3767-46af-858d-ccea864c77d0"
    }
```

The application will be accessible at http://localhost:3000. Use the Postman collection provided to test the project.
Have fun!
