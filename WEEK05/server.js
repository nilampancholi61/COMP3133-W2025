const express = require('express');
const mongoose = require('mongoose');
const User = require('./user'); 
const app = express();
const port = 8081;


mongoose.connect('mongodb+srv://nilampancholi61:<db_password>@cluster0.hb79a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0', { 
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('MongoDB connection error:', err));


app.use(express.json()); 


app.post('/users', async (req, res) => {
    try {
        const newUser = new User(req.body);
        await newUser.save(); 
        res.status(201).json({ message: 'User created successfully', user: newUser }); 
    } catch (error) {
        console.error("Error creating user:", error);

        if (error.name === 'ValidationError') {
          res.status(400).json({ message: 'Validation Error', errors: error.errors }); 
        } else {
          res.status(500).json({ message: 'Server error' }); 
        }
    }
});

app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});