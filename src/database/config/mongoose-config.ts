import mongoose from "mongoose";

const uri = `mongodb+srv://${process.env.MONGO_HOST}:${process.env.MONGO_PASSWORD}@cluster0.dkvjg.mongodb.net/todo?retryWrites=true&w=majority`;
mongoose.connect(uri).catch((err) => {
  console.log(err, "err");
});
