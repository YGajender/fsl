import express from "express";
import "dotenv/config";
import mongoose from "mongoose";
import fileUpload from "express-fileupload"; //the middelware
import router from './routes/route.js'; //Extension is mandatory
import visitorRouter from './routes/visiterRoute.js';
import cors from "cors"

const app = express();
const PORT = 9090;

// const corsOptions = {
//   origin: ['http://localhost:5173/'], // Specify allowed origins here
//   methods: ['GET', 'POST', 'PUT', 'DELETE'], // Specify allowed methods
//   allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
// };

const corsOptions = {
  origin: 'http://localhost:5173',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true,
};

app.use(cors(corsOptions))

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload())

// mongoose.connect(process.env.MONGODB).then(()=>console.log("connection Successfull"));

try {
  await mongoose.connect(
    `mongodb+srv://${process.env.MONGO_USERNAME}:${process.env.MONGO_PASSWORD}@cluster0.wrd9j.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0`
  )
} catch (err) {
  console.log(err)
}


app.use("/", router);
app.use("/visitor", visitorRouter);

app.listen(PORT, () => console.log("Server started at port" + PORT))