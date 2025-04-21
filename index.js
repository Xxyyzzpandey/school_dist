import express from "express";
import router from "./routes/routes.js";
import dotenv from 'dotenv';
dotenv.config();


const app = express();


app.use(express.json());

app.use('/api', router);

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

