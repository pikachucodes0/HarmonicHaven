import express from "express";
import {
  addProduct,
  getProductById,
  listProducts,
  removeProduct,
} from "../controller/storeController.js";
import upload from "../middleware/multerConfig.js";

const storeRouter = express.Router();

storeRouter.post("/add", addProduct);
storeRouter.get("/list", listProducts);
storeRouter.post("/delete", removeProduct);
storeRouter.get("/:id", getProductById);
export default storeRouter;
