import express from "express";
import {
  createItem,
  deleteItem,
  updateItem,
  getItem,
  getAllItems,
  getDeletedItems,
} from "../controllers/item.controller.js";

const router = express.Router();
router.post("/", createItem);
router.patch("/:id", updateItem);
router.patch("/delete/:id", deleteItem);
router.patch("/deleted", getDeletedItems);
router.get("/:id", getItem);
router.get("/", getAllItems);

export default router;
