import { Schema, model } from "mongoose";

const itemSchema = new Schema({
  title: { type: String },
  category: { type: String },
  brand: { type: String },
  store: { type: String },
  currentPrice: { type: Number },
  lastUpdated: { type: Date, default: Date.now() },
  lowestPrice: { type: Number },
  highestPrice: { type: Number },
  lastPrice: { type: Number },
  inStock: { type: Boolean },
  deleted: { type: Boolean, default: false },
});

const item = model("item", itemSchema);
export default item;
