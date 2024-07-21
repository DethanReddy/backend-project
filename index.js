const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware to parse the body of POST requests
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files from the public directory
app.use(express.static(path.join(__dirname, 'public')));

// Connect to MongoDB
const mongoURI = 'mongodb+srv://dedhanreddy:dedhan@cluster0.aeqq8pv.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => console.log('MongoDB connected'))
    .catch(err => console.log(err));

// Create a Mongoose schema and model for the order
const orderSchema = new mongoose.Schema({
    name: String,
    phone: String,
    address: String,
    product: String
});
const Order = mongoose.model('Order', orderSchema);

// Route to handle the order form submission
app.post('/submit-order', (req, res) => {
    const { name, phone, address, product } = req.body;
    const newOrder = new Order({ name, phone, address, product });
    newOrder.save()
        .then(() => res.send('Order received! Thank you, ' + name + '.'))
        .catch(err => res.status(500).send('Error saving order: ' + err));
});

// Start the server
app.listen(PORT, () => {
    console.log("Server is running on http://localhost:${PORT}");
});