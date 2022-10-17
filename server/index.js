import dotenv from "dotenv";
import mongoose from "mongoose";
import express from "express";
import itemRouter from "./routes/item.routes.js";

dotenv.config();
const app = express();
mongoose
  .connect(process.env.MONGO_URL)
  .then(() =>
    app.listen(process.env.PORT, () =>
      console.log(`Server is running on PORT ${process.env.PORT}`)
    )
  )
  .catch((error) => console.log(error.message));

app.use(express.json());
app.get("/", (req, res) => {
  res.send("Welcome to MarkDown!");
});
app.use("/item", itemRouter);
