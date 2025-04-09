const { formatDate } = require("../helpers/dateHelper.js");

class CategoryResource {
  constructor(category) {
    this.category = category;
  }

  toJSON() {
    return {
      id: this.category.id,
      name: this.category.name,
      created_at: formatDate(this.category.created_at),
      updated_at: formatDate(this.category.updated_at)
    };
  }

  static collection(category) {
    return category.map(br => new CategoryResource(br).toJSON());
  }
}

module.exports = CategoryResource;
