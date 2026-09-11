import express from "express";
import cors from "cors";
import errorHandler from "./middleware/errorHandler.js";

import authRoutes from "./router/auth.js";
// import userRoutes from "./routes/users.js";

const app = express();


app.use(cors());
app.use(express.json());

app.use("/api/auth", authRoutes);
// app.use("/api/users", userRoutes);

app.get('/test', (req, res) => {
  res.json({
    message: 'PMS Backend API is running'
  });
});
app.use(errorHandler)


export default app;