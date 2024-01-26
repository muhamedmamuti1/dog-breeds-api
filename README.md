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

The application will be accessible at http://localhost:3000. Use the Postman collection provided to test the project.
Have fun!
