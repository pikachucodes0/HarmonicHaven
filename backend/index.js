import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import { Connection } from "./src/database/db.js";
import authRoutes from "./src/routes/authRoute.js";
import studioRouter from "./src/routes/studioRoutes.js";
import storeRouter from "./src/routes/storeRoutes.js";
import router from "./src/routes/adminRoutes.js"; // Import adminRoutes
import { authenticateToken } from "./src/middleware/token-middleware.js";
import { createUploadsFolder } from "./src/security/helper.js";
import userRouter from "./src/routes/userRoutes.js";
dotenv.config();
import fileRouter from "./src/routes/uploadRoutes.js";
const app = express();
const port = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// Use the routers

app.use("/uploads", express.static("uploads"));
createUploadsFolder();

// app.use(authenticateToken); 
app.use("/api/user", userRouter);
app.use("/api/file", fileRouter);
app.use("/api/auth", authRoutes);
app.use("/api/studio", studioRouter);
app.use("/api/store", storeRouter);
app.use("/api/admin", router); // Use adminRoutes

// Call the Connection function to connect to the database
Connection();

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
