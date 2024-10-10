const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/todoApp"

mongoose.connect(url).then(() => {
    console.log('Connected successfully');
}).catch((error) => {
    console.error('Connection error:', error);
});
