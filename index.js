const express = require("express");
const mongoose = require("mongoose")
const app = express();
const cors = require("cors");
const userRoute = require("./routes/userRoutes");
const adressRouter = require("./routes/adressRouter");
const productrouter = require("./routes/productRouter");
const orderRouter = require("./routes/orderRoutes");
const contactrouter = require("./routes/contactRouter");
require("dotenv").config();


app.use(cors({
    origin: 'http://localhost:4200',
    credentials: true 
}));

app.use(express.json());

app.use('/user', userRoute);
app.use('/adress', adressRouter);
app.use('/product', productrouter);
app.use('/order', orderRouter);
app.use('/contact', contactrouter);


mongoose.connect(process.env.MONGO_URI)
.then(() => {
    console.log("connected to database");
    app.listen(process.env.PORT,() => console.log("listening to "+ process.env.PORT))
}).catch((err) => {
    console.log(err); 
});
