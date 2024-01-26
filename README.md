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

2. Tables and indexes to create in your PostgreSQL database:

### Breeds Table
CREATE TABLE breeds
(
    id          uuid         NOT NULL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP             DEFAULT NULL,
    deleted_at  TIMESTAMP             DEFAULT NULL
);

CREATE INDEX idx_breeds_name ON breeds (name);
CREATE TYPE popularity_types AS ENUM ('MOST_POPULAR', 'POPULAR', 'LEAST_POPULAR');

### Breed Details Table
CREATE TABLE breed_details
(
    id          uuid         NOT NULL PRIMARY KEY,
    name        VARCHAR(255) NOT NULL,
    size        NUMERIC(10, 2)        DEFAULT NULL,
    temperament VARCHAR(255)          DEFAULT NULL,
    popularity  popularity_types      DEFAULT ('POPULAR'),
    created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at  TIMESTAMP             DEFAULT NULL,
    deleted_at  TIMESTAMP             DEFAULT NULL,
    breed_id    uuid REFERENCES breeds (id)
);

CREATE INDEX idx_breed_details_name ON breed_details (name);

### Images Table
CREATE TABLE images
(
    id         uuid         NOT NULL PRIMARY KEY,
    url        VARCHAR(255) NOT NULL,
    created_at TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP             DEFAULT NULL,
    deleted_at TIMESTAMP             DEFAULT NULL,
    breed_id   uuid REFERENCES breeds (id)
);

CREATE INDEX idx_images_url ON images (url);

### Users Table
CREATE TYPE user_roles AS ENUM ('ADMIN', 'CLIENT');

CREATE TABLE users
(
    id         uuid         NOT NULL PRIMARY KEY,
    first_name VARCHAR(255) NOT NULL,
    last_name  VARCHAR(255) NOT NULL,
    username   VARCHAR(255) NOT NULL,
    email      VARCHAR(255) NOT NULL,
    password   VARCHAR(255) NOT NULL,
    role       user_roles   NOT NULL DEFAULT 'CLIENT',
    created_at TIMESTAMP    NOT NULL DEFAULT NOW(),
    updated_at TIMESTAMP             DEFAULT NULL,
    deleted_at TIMESTAMP             DEFAULT NULL
);

3. Update the database connection configuration in `config.js` with your database credentials.

### Running the Application

Start the server by running the following command:

```bash
node app.js
```

The application will be accessible at http://localhost:3000. Use the Postman collection provided to test the project.
Have fun!
