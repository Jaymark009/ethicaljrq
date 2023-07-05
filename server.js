import express from "express";
import dotenv from "dotenv"
import connectDatabase from "./config/MongoDb.js";
import ImportData from "./DataImport.js";
import productRoute from "./Routes/ProductRoutes.js";
import { errorHandler, notFound } from "./Middleware/Errors.js";
import userRouter from "./Routes/UserRoutes.js";
import orderRouter from "./Routes/orderRoutes.js";

dotenv.config();
connectDatabase();
const app = express();
app.use(express.json());

//API
app.use("/api/import", ImportData);
app.use("/api/products", productRoute);
app.use("/api/users", userRouter );
app.use("/api/orders", orderRouter);
app.get("/api/config/paypal", (req,res) =>{
    res.send(process.env.PAYPAL_CLIENT_ID);
})


//error handler
app.use(notFound);
app.use(errorHandler);




if(process.env.NODE_ENV == "production") {
    app.use(express.static("frontend/build"));
}

const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`server run in port ${PORT}`));
