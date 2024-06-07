import express from "express";
import { initMongoDb } from "./daos/mongodb/connection.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import productRouter from "./routes/productsRouter.js";
import cartRouter from "./routes/cartRouter.js";
import userRouter from "./routes/user.router.js";
import "dotenv/config";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", productRouter);
app.use("/api/carts", cartRouter);
app.use("/api/users", userRouter);

app.use(errorHandler);

if (process.env.PERSISTENCE === "MONGO") initMongoDb();

const PORT = 8080;

app.listen(PORT, () => console.log(`SERVER OK in ${PORT}`));
