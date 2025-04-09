const { formatDate } = require("../helpers/dateHelper.js");

class BrandResource {
  constructor(brand) {
    this.brand = brand;
  }

  toJSON() {
    return {
      id: this.brand.id,
      name: this.brand.name,
      created_at: formatDate(this.brand.created_at),
      updated_at: formatDate(this.brand.updated_at)
    };
  }

  static collection(brand) {
    return brand.map(br => new BrandResource(br).toJSON());
  }
}

module.exports = BrandResource;
