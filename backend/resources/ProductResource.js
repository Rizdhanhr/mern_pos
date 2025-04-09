const { formatDate } = require("../helpers/dateHelper.js");

class ProductResource {
  constructor(product) {
    this.product = product;
  }

  toJSON() {
    return {
      id: this.product.id,
      name: this.product.name,
      brand: this.product.brand,
      category: this.product.category,
      price_sell: this.product.price_sell,
      price_buy: this.product.price_buy,
      images: this.product.images,
      status: this.product.status,
      created_at: formatDate(this.product.created_at),
      updated_at: formatDate(this.product.updated_at)
    };
  }

  static collection(product) {
    return product.map(br => new ProductResource(br).toJSON());
  }
}

module.exports = ProductResource;
