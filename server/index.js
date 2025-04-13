import cookieParser from "cookie-parser";
import express from "express";
import cors from "cors"
import dotenv from "dotenv";
import connectDb from "./utils/db.js";
import userRoute from "./routes/user.routes.js";
import companyRoute from "./routes/company.routes.js";
import jobRoute from "./routes/job.routes.js";
import applicationRoute from "./routes/application.routes.js";

dotenv.config({})
const app=express();
app.use(express.json());
app.use(express.urlencoded({extended:true}));
app.use(cookieParser());
const corsOptions={
    origin:"https://job-portal-fronend.onrender.com",
    credentials:true,
}
app.use(cors(corsOptions))
//api's

app.use('/api/v1/user',userRoute);
app.use("/api/v1/company",companyRoute);
app.use("/api/v1/job",jobRoute);
app.use("/api/v1/application",applicationRoute);

const PORT=process.env.PORT||3000;
app.listen(PORT,()=>{
    connectDb();
    console.log(`app is running at ${PORT}`)
})

//2:06
