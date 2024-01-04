const mongoose = require('mongoose');

const mongoURI = 'mongodb+srv://gemfood:8286740729@cluster0.lp6xprl.mongodb.net/gemfood?retryWrites=true&w=majority';

mongoose.connect(mongoURI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

const db = mongoose.connection;

db.on('error', (error) => {
  console.error('MongoDB connection error:', error);
});

db.once('open', async () => {
  try {
    console.log('Connected to MongoDB');

    const foodItemsCollection = db.collection('food_items');
    const data = await foodItemsCollection.find({}).toArray();

    // Use the correct collection name: food_category
    const foodCategoryCollection = db.collection("food_category");
    const foodCategory = await foodCategoryCollection.find({}).toArray();

    global.food_items = data;

    global.food_categories = foodCategory;


  } catch (error) {
    console.error('Error fetching data:', error);
  }
});

// You can also handle disconnection events
db.on('disconnected', () => {
  console.log('MongoDB disconnected');
});

// Close the Mongoose connection if Node process ends
process.on('SIGINT', () => {
  mongoose.connection.close(() => {
    console.log('MongoDB connection closed due to app termination');
    process.exit(0);
  });
});

// Export the Mongoose connection object
module.exports = db;
