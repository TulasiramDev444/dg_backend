const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');

const app = express();

// Connect Database
connectDB();

// Enable CORS
app.use(cors());

// Init Middleware
app.use(express.json());

// Define Routes
app.use('/api/contact', require('./routes/api/contacts'));
app.use('/api/organization', require('./routes/api/organizations'));
app.use('/api/user', require('./routes/api/users'));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
