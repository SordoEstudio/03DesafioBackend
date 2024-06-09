import { CartModel } from "./models/cartModel.js";

export default class CartDao {
  async getById(id) {
    try {
      const response = await CartModel.findById(id).populate(
        "products.product"
      );
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async create() {
    try {
      const response = await CartModel.create({
        products: [],
      });
      return response;
    } catch (error) {
      throw new Error(error);
    }
  }

  async addProductToCard(cId, pId, quantity) {
    try {
      const cart = await CartModel.findById(cId);
      if (!cart) return null;
      const prodExistIndex = cart.products.findIndex(
        (p) => p.product.toString() === pId
      );
      prodExistIndex !== -1
        ? (cart.products[prodExistIndex].quantity = quantity)
        : cart.products.push({ product: pId, quantity });

      await cart.save();
      return cart;
    } catch (error) {
      throw new Error(error);
    }
  }

  async update(cId, prodObj) {
    try {
      return await CartModel.findByIdAndUpdate(cId, prodObj, { new: true });
    } catch (error) {
      throw new Error(error);
    }
  }

  async updateProductQuantity(cId, pId, quantity) {
    try {
      return await CartModel.findOneAndUpdate(
        { _id: cId, "products.product": pId },
        { $set: { "products.$.quantity": quantity } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }

  async existProdInCart(cId, pId) {
    try {
      return await CartModel.findOne({
        _id: cId,
        products: { $elemMatch: { product: pId } },
      });
    } catch (error) {
      throw new Error(error);
    }
  }

  async removeProductToCart(cId, pId) {
    try {
      return await CartModel.findOneAndUpdate(
        { _id: cId },
        { $pull: { products: { product: pId } } },
        { new: true }
      );
    } catch (error) {
      throw new Error(error);
    }
  }
}
