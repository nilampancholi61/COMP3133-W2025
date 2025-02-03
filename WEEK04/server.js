

const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = process.env.PORT || 3000;


const uri = "mongodb+srv://nilampancholi61:<db_password>@cluster0.hb79a.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"; 

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
})
.then(() => console.log('Connected to MongoDB Atlas'))
.catch(err => console.error('MongoDB connection error:', err));

const restaurantSchema = new mongoose.Schema({
    address: {
        building: String,
        coord: [Number],
        street: String,
        zipcode: String,
    },
    borough: String,
    cuisine: String,
    grades: [{
        date: Date,
        grade: String,
        score: Number,
    }],
    name: String,
    restaurant_id: String,
});

const Restaurant = mongoose.model('Restaurant', restaurantSchema);

app.get('/restaurants', async (req, res) => {
    try {
        const restaurants = await Restaurant.find({});
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/restaurants/cuisine/:cuisine', async (req, res) => {
    try {
        const cuisine = req.params.cuisine;
        const restaurants = await Restaurant.find({ cuisine: cuisine });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});

app.get('/restaurants', async (req, res) => {
    try {
        let sortBy = req.query.sortBy || 'ASC'; 
        sortBy = sortBy.toUpperCase() === 'DESC' ? -1 : 1; 

        const restaurants = await Restaurant.find({}, { _id: 0, cuisines: 1, name: 1, city: 1, restaurant_id: 1 })
            .sort({ restaurant_id: sortBy });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.get('/restaurants/Delicatessen', async (req, res) => {
    try {

        const restaurants = await Restaurant.find({ cuisine: "Delicatessen", borough: { $ne: "Brooklyn" } }, { _id: 0, cuisines: 1, name: 1, borough: 1 }).sort({ name: 1 });
        res.json(restaurants);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
});


app.listen(port, () => {
    console.log(`Server listening on port ${port}`);
});
