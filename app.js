import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import router from "./router/userRouter.js";

const app = express();

app.use(express.json());
app.use(cors());

app.use("/api", router);

mongoose.connect("mongodb://testuser:Nayanaj7@ac-5aibuq5-shard-00-00.ocikrgz.mongodb.net:27017,ac-5aibuq5-shard-00-01.ocikrgz.mongodb.net:27017,ac-5aibuq5-shard-00-02.ocikrgz.mongodb.net:27017/?ssl=true&replicaSet=atlas-p7ryzf-shard-0&authSource=admin&appName=Cluster0")
  .then(() => {
    console.log("Database Connected....");
  })
  .catch((err) => {
    console.log("Fail to connect DB...");
    console.log(err.message);
  });

app.listen(4000, () => {
  console.log("server run port 4000...");
});