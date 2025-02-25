import express from "express";
import { PORT } from "./config.js";
import  productsRoutes from "./routes/products.routes.js"
import morgan from "morgan";


const app = express();

app.use(morgan('dev'));
app.use(express.json());

app.use(productsRoutes);

app.listen(PORT);
console.log("server on port", PORT)