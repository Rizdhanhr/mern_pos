const { formatDate } = require("../helpers/dateHelper.js");

class ProductResource {
  constructor(data) {
    this.data = data;
  }

  toJSON() {
    return {
      id: this.data.id,
      name: this.data.name,
      brand: this.data.brand,
      category: this.data.category,
      unit: this.data.unit,
      stock: this.data.stock,
      price_sell: this.data.price_sell,
      price_buy: this.data.price_buy,
      images: this.data.images,
      status: this.data.status,
      created_at: formatDate(this.data.created_at),
      updated_at: formatDate(this.data.updated_at)
    };
  }

  static collection(data) {
    return data.map(dt => new ProductResource(dt).toJSON());
  }
}

module.exports = ProductResource;
