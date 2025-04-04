const mongoose = require("mongoose");

const db = mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true, 
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
    serverSelectionTimeoutMS: 5000,
    socketTimeoutMS: 25000,
    poolSize: 10,       
    autoIndex: false,
    retryWrites: true,
});

module.exports = db;