const express = require("express");
const app = express();
const PORT = 3000 || process.env.PORT;
require("./conn");
const todoRoutes = require("./routes/TodoRoutes");
const cors = require('cors');

app.use(cors());


app.use(express.json())
app.use(todoRoutes);

app.listen(PORT ,()=>{
    console.log(`listening on port ${PORT}` );

})