const express = require('express');
const bodyParser = require('body-parser');
const userRoutes = require('./src/routes/user.routes');
const breedRoutes = require('./src/routes/breeds.routes');
const breedDetailsRoutes = require('./src/routes/breed.details.routes');
const breedImagesRoutes = require('./src/routes/breed.images.routes');
const getAllBreedsRoutes = require('./src/routes/get.all.breeds.routes');
const authRoutes = require('./src/routes/auth.routes');
require("./src/auth/authenticate");
const app = express();
const port = 3000;

app.use(bodyParser.json());

app.use('/api', authRoutes)
app.use('/api/user', userRoutes);
app.use('/api/breed', breedRoutes);
app.use('/api/breed', breedDetailsRoutes);
app.use('/api/breed', breedImagesRoutes);
app.use('/api/breeds', getAllBreedsRoutes);

app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
});
