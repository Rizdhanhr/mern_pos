const { formatDate } = require("../helpers/dateHelper.js");

class CategoryResource {
  constructor(data) {
    this.data = data;
  }

  toJSON() {
    return {
      id: this.data.id,
      name: this.data.name,
      created_at: formatDate(this.data.created_at),
      updated_at: formatDate(this.data.updated_at)
    };
  }

  static collection(data) {
    return data.map(dt => new CategoryResource(dt).toJSON());
  }
}

module.exports = CategoryResource;
