const express = require('express');
const morgan = require('morgan');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const path = require('path');

// dotenv config
dotenv.config();

app.use(express.static(path.join(__dirname, '../frontend/build')));
app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, '../frontend/build/index.html'));
})

// mongodb connection
connectDB();

// rest object
const app = express();

// middlewates
app.use(express.json());
app.use(morgan('dev'));

// routes
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/admin', require('./routes/adminRoutes'));
app.use('/api/doctor', require('./routes/doctorRoutes'));

// port
const PORT = process.env.PORT || 8080

// listen port
app.listen(PORT, () => {
    console.log('server is litening', PORT, process.env.NODE_MODE);
})