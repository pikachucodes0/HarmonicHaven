import express from "express";
import { addStudio, listStudios, deleteStudio } from "../controller/studioController.js";

const studioRouter = express.Router();

// Route to add a studio
studioRouter.post("/add", addStudio);

// Route to list all studios
studioRouter.get("/list", listStudios);

// Route to delete a studio by ID (use DELETE method)
studioRouter.delete("/delete/:id", deleteStudio);

export default studioRouter;