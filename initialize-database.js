const knex = require('knex');
const config = require('./config');

const db = knex({
    client: 'pg',
    connection: config.database,
});

const initializeDatabase = async () => {
    try {
        // Create breeds table
        await db.raw(`
      CREATE TABLE breeds (
        id          uuid         NOT NULL PRIMARY KEY,
        name        VARCHAR(255) NOT NULL,
        created_at  TIMESTAMP    NOT NULL DEFAULT NOW(),
        updated_at  TIMESTAMP             DEFAULT NULL,
        deleted_at  TIMESTAMP             DEFAULT NULL
      );
    `);

        // Create breeds index
        await db.raw('CREATE INDEX idx_breeds_name ON breeds (name);');

        // Create popularity_types enum
        await db.raw(`
      CREATE TYPE popularity_types AS ENUM ('MOST_POPULAR', 'POPULAR', 'LEAST_POPULAR');
    `);

        // Create breed_details table
        await db.raw(`
      CREATE TABLE breed_details (
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
    `);

        // Create breed_details index
        await db.raw('CREATE INDEX idx_breed_details_name ON breed_details (name);');

        // Create images table
        await db.raw(`
      CREATE TABLE images (
        id         uuid         NOT NULL PRIMARY KEY,
        url        VARCHAR(255) NOT NULL,
        created_at TIMESTAMP    NOT NULL DEFAULT NOW(),
        updated_at TIMESTAMP             DEFAULT NULL,
        deleted_at TIMESTAMP             DEFAULT NULL,
        breed_id   uuid REFERENCES breeds (id)
      );
    `);

        // Create images index
        await db.raw('CREATE INDEX idx_images_url ON images (url);');

        // Create user_roles enum
        await db.raw(`
      CREATE TYPE user_roles AS ENUM ('ADMIN', 'CLIENT');
    `);

        // Create users table
        await db.raw(`
      CREATE TABLE users (
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
    `);

        // Insert sample data to breeds table
        await db.raw('INSERT INTO breeds (id, name, created_at, updated_at, deleted_at)\n' +
            'VALUES\n' +
            '  (\'0207e405-a877-4a64-b45d-0d2c4077dd78\', \'Husky\', \'2024-01-22 18:10:06.807909\', NULL, NULL),\n' +
            '  (\'236ff3af-cc36-446b-b3e3-70122f4d1e68\', \'Pit Bull\', \'2024-01-22 18:09:46.320277\', \'2024-01-22 18:12:14.441673\', NULL),\n' +
            '  (\'59b3ceb9-f238-4d64-a7ca-24551c8d4874\', \'Pomeranian\', \'2024-01-22 18:10:28.316069\', NULL, \'2024-01-22 18:12:50.073651\'),\n' +
            '  (\'d3492258-3c58-4d30-b6e5-bd892eadbce3\', \'Rottweiler\', \'2024-01-22 17:03:01.038469\', \'2024-01-23 12:05:38.457119\', NULL),\n' +
            '  (\'5ddac88d-b1d7-46a4-8cb1-9d38a31e0118\', \'Sharrpllaninac\', \'2024-01-23 12:26:00.940108\', NULL, NULL),\n' +
            '  (\'ce321793-8c03-44fa-9ffa-d494e81a4c3e\', \'Pomeranian\', \'2024-01-23 14:37:07.288055\', NULL, NULL),\n' +
            '  (\'4a57dc0e-2795-4e64-8010-b4cd577f8b5d\', \'Dalmatian\', \'2024-01-23 17:01:35.069068\', NULL, NULL),\n' +
            '  (\'992611fe-3767-46af-858d-ccea864c77d0\', \'Bulldog\', \'2024-01-23 12:25:43.832472\', \'2024-01-25 14:37:45.790496\', NULL);\n');

        // Insert sample data to breed_details table
        await db.raw('INSERT INTO breed_details (id, name, size, temperament, popularity, created_at, updated_at, deleted_at, breed_id)\n' +
            'VALUES\n' +
            '  (\'a6ee987d-473e-4846-ae5c-5808866c2658\', \'French\', 25.00, \'Active\', \'MOST_POPULAR\', \'2024-01-23 12:55:41.935567\', NULL, NULL, \'992611fe-3767-46af-858d-ccea864c77d0\'),\n' +
            '  (\'e4b5443a-e5fa-48fe-8a9f-c2cbc494f4e0\', \'American\', 35.50, \'Passive\', \'MOST_POPULAR\', \'2024-01-23 12:56:51.487214\', NULL, NULL, \'992611fe-3767-46af-858d-ccea864c77d0\'),\n' +
            '  (\'4a39bb97-9e7e-4dd0-b370-b806dd50a2ed\', \'Olde English\', 35.50, \'Hyperactive\', \'POPULAR\', \'2024-01-23 12:57:23.789851\', NULL, NULL, \'992611fe-3767-46af-858d-ccea864c77d0\'),\n' +
            '  (\'1e49529a-e8e8-4ec7-b589-cabab1a7c6b4\', \'Serrano\', 42.80, \'Emotional\', \'LEAST_POPULAR\', \'2024-01-23 12:59:57.989274\', \'2024-01-23 13:01:18.745875\', \'2024-01-23 13:03:14.407774\', \'992611fe-3767-46af-858d-ccea864c77d0\'),\n' +
            '  (\'2151c2ab-2e41-4bd6-b738-5cec2e236ed5\', \'American Pit Bull Terrier\', 40.00, \'Active\', \'MOST_POPULAR\', \'2024-01-25 16:19:43.068448\', NULL, NULL, \'236ff3af-cc36-446b-b3e3-70122f4d1e68\'),\n' +
            '  (\'e7ca739d-06b5-4336-8ccd-ae227dfdc52d\', \'American Bully\', 25.00, \'Active\', \'POPULAR\', \'2024-01-25 16:20:16.032733\', NULL, NULL, \'236ff3af-cc36-446b-b3e3-70122f4d1e68\'),\n' +
            '  (\'e03a5193-8f90-41fe-8940-ed8493c40efe\', \'American Staffordshire Terrier\', 25.00, \'Lazy\', \'LEAST_POPULAR\', \'2024-01-25 16:20:48.473912\', NULL, NULL, \'236ff3af-cc36-446b-b3e3-70122f4d1e68\');\n');

        // Insert sample data to images table
        await db.raw('INSERT INTO images (id, url, created_at, updated_at, deleted_at, breed_id)\n' +
            'VALUES\n' +
            '  (\'e418040b-02f8-4953-b419-3b715984045e\', \'https://www.akc.org/wp-content/uploads/2017/11/French-Bulldog-standing-outdoors.jpg\', \'2024-01-23 13:48:38.111114\', NULL, NULL, \'992611fe-3767-46af-858d-ccea864c77d0\'),\n' +
            '  (\'40dc65e1-7380-4db7-9bf9-e841c8e94d30\', \'https://www.akc.org/wp-content/uploads/2020/01/American-Bulldog-standing-in-three-quarter-view.jpg\', \'2024-01-23 13:49:32.345768\', NULL, NULL, \'992611fe-3767-46af-858d-ccea864c77d0\'),\n' +
            '  (\'f2075d93-e76a-4e6d-b982-344f72e5760b\', \'https://upload.wikimedia.org/wikipedia/commons/1/17/UKC_Olde_English_Bulldogge_Male.jpg\', \'2024-01-23 13:50:03.101353\', NULL, NULL, \'992611fe-3767-46af-858d-ccea864c77d0\'),\n' +
            '  (\'c21caf66-905c-4b7b-9c08-f091c0daf353\', \'https://a.storyblok.com/f/152976/907x1157/4605b98b19/american-bulldog-hero-image-2.jpg\', \'2024-01-23 13:56:05.883958\', \'2024-01-23 13:56:39.392741\', \'2024-01-23 13:56:54.710666\', \'992611fe-3767-46af-858d-ccea864c77d0\'),\n' +
            '  (\'e03a5193-8f90-41fe-8940-ed8493c40efe\', \'https://cdn.britannica.com/01/198001-050-AC33057E/ancestry-American-Staffordshire-Terrier-bulldogs-Staffie-mastiffs.jpg\', \'2024-01-25 16:21:19.217873\', NULL, NULL, \'236ff3af-cc36-446b-b3e3-70122f4d1e68\'),\n' +
            '  (\'525450c7-1ea9-4acb-a744-71ad17c0a22b\', \'https://image.petmd.com/files/styles/978x550/public/2023-03/pit-bull.jpg\', \'2024-01-25 16:25:55.357973\', NULL, NULL, \'236ff3af-cc36-446b-b3e3-70122f4d1e68\'),\n' +
            '  (\'1be4fa6a-9b14-4951-bf3c-23e526c7643b\', \'https://encrypted-tbn2.gstatic.com/images?q=tbn:ANd9GcQLo6o6yy8RYFIDPqnccDw1Dj9e0Vf1tAIcdbLtXu1l53rNYSYE\', \'2024-01-25 16:26:19.678535\', NULL, NULL, \'236ff3af-cc36-446b-b3e3-70122f4d1e68\');\n');

        // Insert sample data to users table
        await db.raw('INSERT INTO users (id, first_name, last_name, username, email, password, role, created_at, updated_at, deleted_at)\n' +
            'VALUES\n' +
            '  (\'de3bac0f-c720-426b-a5eb-8a9da84b494a\', \'Muhamed\', \'Mamuti\', \'muhamedmamuti\', \'muhamedmamuti1999@gmail.com\', \'password\', \'ADMIN\', \'2024-01-23 14:39:38.536823\', NULL, NULL),\n' +
            '  (\'a7eb9c09-6327-411e-96af-34dbb0263df7\', \'John\', \'Doe\', \'johndoe\', \'johndoe@gmail.com\', \'password\', \'CLIENT\', \'2024-01-23 14:40:26.747270\', NULL, NULL),\n' +
            '  (\'53b64453-3645-4695-b606-55ce3e0c964f\', \'James\', \'Doe\', \'jamesdoe\', \'jamesdoe@gmail.com\', \'password\', \'CLIENT\', \'2024-01-23 14:41:28.482696\', NULL, NULL),\n' +
            '  (\'9010671a-a054-40b9-810f-114dd011044e\', \'Jimmy\', \'Doe\', \'jimmydoe\', \'jimmydoe@gmail.com\', \'password\', \'CLIENT\', \'2024-01-23 20:19:32.891232\', \'2024-01-23 20:20:13.486711\', \'2024-01-23 20:20:26.537152\'),\n' +
            '  (\'e56d58ff-de0d-43d6-ac87-3e64a6d03708\', \'Mamut\', \'Muhamedi\', \'mamutmuhamedi\', \'mamutmuhamedi@gmail.com\', \'password\', \'CLIENT\', \'2024-01-26 00:01:45.326586\', NULL, NULL);\n');

        console.log('Database initialized successfully.');
    } catch (error) {
        console.error('Error initializing database:', error);
    } finally {
        await db.destroy(); // Close the database connection
    }
};

initializeDatabase();
