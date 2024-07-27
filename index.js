const express = require('express');
const cors = require('cors');
const { connectDb } = require('./utils/connectDb');
const router = require('./routes/route');
require('dotenv').config();


const app = express();


app.use(cors({
    origin: '*',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

app.use(express.json());
app.use('/api/v1', router);

const PORT =process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});

app.get('/', (req, res) => {
    res.send('Hello World');
});

connectDb();