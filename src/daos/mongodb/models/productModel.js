import { Schema, model } from "mongoose";

export const productCollectionName = "products";

const productSchema = new Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  thumbnail: { type: String },
  code: { type: String, required: true },
  stock: { type: Number, required: true },
  category: { type: String, required: true },
  status: { type: Boolean, default: true },
});

export const ProductModel = model(productCollectionName, productSchema);
